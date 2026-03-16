import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileUser,
  Newspaper,
  Mail,
  Settings,
  LogOut,
  ShieldAlert,
  Globe,
  Menu,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useMobile } from '@/hooks/useMobile';
import DashboardLayoutSkeleton from './DashboardLayoutSkeleton';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Briefcase, label: 'Portfolio', path: '/admin/portfolio' },
  { icon: FileUser, label: 'Positions', path: '/admin/positions' },
  { icon: Users, label: 'Applications', path: '/admin/applications' },
  { icon: Newspaper, label: 'News', path: '/admin/news' },
  { icon: Mail, label: 'Contact', path: '/admin/contact' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

const SIDEBAR_WIDTH_KEY = 'admin-sidebar-width';
const DEFAULT_WIDTH = 260;
const MIN_WIDTH = 200;
const MAX_WIDTH = 400;

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

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const stored = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return stored ? parseInt(stored, 10) : DEFAULT_WIDTH;
  });
  const { loading, user, logout } = useAuth();

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString());
  }, [sidebarWidth]);

  if (loading) {
    return <DashboardLayoutSkeleton />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full bg-white rounded-2xl shadow-lg">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-[#3B82F6] rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-center text-[#0F172A]">
              Admin Access Required
            </h1>
            <p className="text-sm text-[#64748B] text-center max-w-sm">
              Sign in with your administrator account to access the Kensyd Companies dashboard.
            </p>
          </div>
          <Button
            onClick={() => { window.location.href = getLoginUrl('/admin'); }}
            size="lg"
            className="w-full bg-[#3B82F6] hover:bg-[#2563EB] shadow-lg hover:shadow-xl transition-all"
          >
            Sign in
          </Button>
          <Link href="/" className="text-sm text-[#64748B] hover:text-[#3B82F6] transition-colors">
            ← Back to website
          </Link>
        </div>
      </div>
    );
  }

  if ((user as { role?: string }).role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full bg-white rounded-2xl shadow-lg">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center">
              <ShieldAlert className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-center text-[#0F172A]">
              Access Denied
            </h1>
            <p className="text-sm text-[#64748B] text-center max-w-sm">
              You don't have administrator privileges. Please contact the site owner if you believe this is an error.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Button
              onClick={async () => { await logout(); window.location.href = getLoginUrl('/admin'); }}
              size="lg"
              className="w-full bg-[#3B82F6] hover:bg-[#2563EB] shadow-lg hover:shadow-xl transition-all"
            >
              Sign Out and Retry
            </Button>
            <Link href="/" className="w-full">
              <Button size="lg" variant="outline" className="w-full">
                Return to Website
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider style={{ '--sidebar-width': `${sidebarWidth}px` } as React.CSSProperties}>
      <AdminSidebarContent setSidebarWidth={setSidebarWidth}>
        {children}
      </AdminSidebarContent>
    </SidebarProvider>
  );
}

interface AdminSidebarContentProps {
  children: React.ReactNode;
  setSidebarWidth: (width: number) => void;
}

function AdminSidebarContent({ children, setSidebarWidth }: AdminSidebarContentProps) {
  const { user, logout } = useAuth();
  const [location, navigate] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const [isDragging, setIsDragging] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  const activeItem =
    NAV_ITEMS.find(
      (item) =>
        location.startsWith(item.path) &&
        (item.path === '/admin' ? location === '/admin' : true)
    ) ?? NAV_ITEMS.find((item) => item.path === '/admin');

  useEffect(() => {
    if (isCollapsed) setIsDragging(false);
  }, [isCollapsed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const left = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const newWidth = e.clientX - left;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth);
      }
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, setSidebarWidth]);

  const adminUser = user as { name?: string; email?: string } | null;

  return (
    <>
      <div className="relative" ref={sidebarRef}>
        <Sidebar
          collapsible="icon"
          className="border-r-0 bg-[#0F172A]"
        >
          <SidebarHeader className="h-16 justify-center border-b border-white/10">
            <div className="flex items-center gap-3 px-2 transition-all w-full">
              <button
                onClick={toggleSidebar}
                className="h-8 w-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors focus:outline-none shrink-0"
                aria-label="Toggle navigation"
              >
                <Menu className="h-4 w-4 text-white/70" />
              </button>
              {!isCollapsed && (
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-bold tracking-tight truncate text-white">
                    Kensyd Admin
                  </span>
                </div>
              )}
            </div>
          </SidebarHeader>

          <SidebarContent className="gap-0 bg-[#0F172A]">
            <SidebarGroup className="px-2 py-3">
              <SidebarGroupContent>
                {NAV_ITEMS.map((item) => {
                  const isActive =
                    location.startsWith(item.path) &&
                    (item.path === '/admin' ? location === '/admin' : true);
                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        isActive={isActive}
                        onClick={() => navigate(item.path)}
                        tooltip={item.label}
                        className={`h-10 transition-all font-normal text-white/70 hover:text-white hover:bg-white/10 ${
                          isActive ? 'bg-[#3B82F6] text-white hover:bg-[#3B82F6]' : ''
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-auto px-2 pb-2">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => { window.location.href = '/'; }}
                      tooltip="Back to Website"
                      className="h-10 text-white/50 hover:text-white hover:bg-white/10"
                    >
                      <Globe className="h-4 w-4" />
                      <span>Back to Website</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarGroupContent>
              </SidebarGroup>
            </div>
          </SidebarContent>

          <SidebarFooter className="p-3 bg-[#0F172A] border-t border-white/10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-1 py-1 hover:bg-white/10 transition-colors w-full text-left group-data-[collapsible=icon]:justify-center focus:outline-none">
                  <Avatar className="h-9 w-9 border border-white/20 shrink-0">
                    <AvatarFallback className="text-xs font-medium bg-[#3B82F6] text-white">
                      {adminUser?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                    <p className="text-sm font-medium truncate leading-none text-white">
                      {adminUser?.name || '-'}
                    </p>
                    <p className="text-xs text-white/50 truncate mt-1.5">
                      {adminUser?.email || '-'}
                    </p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <div
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#3B82F6]/50 transition-colors ${
            isCollapsed ? 'hidden' : ''
          }`}
          onMouseDown={() => { if (!isCollapsed) setIsDragging(true); }}
          style={{ zIndex: 50 }}
        />
      </div>

      <div className="flex flex-col flex-1 bg-[#F8FAFC]">
        {isMobile && (
          <div className="flex border-b h-14 items-center justify-between bg-white px-2 sticky top-0 z-40">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="h-9 w-9 rounded-lg" />
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#0F172A]">
                  {activeItem?.label ?? 'Admin'}
                </span>
              </div>
            </div>
          </div>
        )}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </>
  );
}
