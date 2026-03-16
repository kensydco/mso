import { useCallback, useMemo, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { TRPCClientError } from '@trpc/client';

function getLoginUrl(returnTo?: string): string {
  const appOrigin = 'https://manus.im';
  const appId = '3ApEuEoaVzteFBmZanGjEk';
  let redirectUri = `${window.location.origin}/api/oauth/callback`;
  if (returnTo) {
    redirectUri += `?returnTo=${encodeURIComponent(returnTo)}`;
  }
  const state = btoa(redirectUri);
  const url = new URL(`${appOrigin}/app-auth`);
  url.searchParams.set('appId', appId);
  url.searchParams.set('redirectUri', redirectUri);
  url.searchParams.set('state', state);
  url.searchParams.set('type', 'signIn');
  return url.toString();
}

interface UseAuthOptions {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
}

export function useAuth(options: UseAuthOptions = {}) {
  const { redirectOnUnauthenticated = false, redirectPath = getLoginUrl() } = options;
  const utils = trpc.useUtils();

  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.me.setData(undefined, null);
    },
  });

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (err) {
      if (err instanceof TRPCClientError && err.data?.code === 'UNAUTHORIZED') {
        return;
      }
      throw err;
    } finally {
      utils.auth.me.setData(undefined, null);
      await utils.auth.me.invalidate();
    }
  }, [logoutMutation, utils]);

  const auth = useMemo(() => {
    localStorage.setItem('manus-runtime-user-info', JSON.stringify(meQuery.data));
    return {
      user: meQuery.data ?? null,
      loading: meQuery.isLoading || logoutMutation.isPending,
      error: meQuery.error ?? logoutMutation.error ?? null,
      isAuthenticated: !!meQuery.data,
    };
  }, [meQuery.data, meQuery.error, meQuery.isLoading, logoutMutation.error, logoutMutation.isPending]);

  useEffect(() => {
    if (redirectOnUnauthenticated) {
      if (
        !auth.loading &&
        !logoutMutation.isPending &&
        !auth.user &&
        typeof window !== 'undefined' &&
        window.location.pathname !== redirectPath
      ) {
        window.location.href = redirectPath;
      }
    }
  }, [redirectOnUnauthenticated, redirectPath, logoutMutation.isPending, auth.loading, auth.user]);

  return {
    ...auth,
    refresh: () => meQuery.refetch(),
    logout,
  };
}
