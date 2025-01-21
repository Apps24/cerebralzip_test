import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../ui/button.js";
import { Separator } from "../ui/separator.js";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../ui/sidebar.js";
import { TooltipProvider } from "../ui/tooltip.js";
import { AppSidebar } from "./AppSidebar.js";
import ThemeChange from "./ThemeChange.js";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    const storedAuth = localStorage.getItem("isLoggedIn");
    return !!storedAuth;
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const logout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center justify-between pr-4 gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <h1>Dashboard</h1>
              </div>
              <div className="flex items-center gap-2">
              <Button onClick={logout}>Logout</Button>
              <ThemeChange />
              </div>
            </header>
            <div className="flex flex-col sm:flex-row  flex-1 gap-4 p-4 pt-0">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </>
  );
}

export default ProtectedRoute;
