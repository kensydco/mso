import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";

export default function AccessDenied() {
  const [, setLocation] = useLocation();

  const handleReturnToWebsite = () => {
    setLocation("/");
  };

  const handleLogin = () => {
    window.location.href = getLoginUrl();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <Card className="w-full max-w-lg mx-4 shadow-lg border-0 bg-white rounded-3xl">
        <CardContent className="pt-12 pb-8 text-center px-8">
          {/* Red Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-500 rounded-2xl flex items-center justify-center shadow-md">
              <LogOut className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Access Denied
          </h1>

          {/* Description */}
          <p className="text-slate-600 mb-8 leading-relaxed text-base">
            You don't have administrator privileges. Please contact
            the site owner if you believe this is an error.
          </p>

          {/* Return Button */}
          <div className="flex flex-col gap-4 justify-center">
            <Button
              onClick={handleReturnToWebsite}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            >
              Return to Website
            </Button>

            {/* Admin Login Link */}
            <div className="text-sm text-slate-600">
              Administrator?{" "}
              <button
                onClick={handleLogin}
                className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-2 transition-colors"
              >
                Log in here
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
