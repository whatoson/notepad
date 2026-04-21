import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/theme/theme-provider";
import { Outlet } from "react-router";
import { AppSidebar } from "./AppSidebar";
import { Dialogs } from "./Dialogs";
import { Header } from "./Header";

export function MainLayout() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <SidebarProvider className="h-svh overflow-hidden">
          <AppSidebar variant="inset" />
          <SidebarInset>
            <Header />
            <div className="p-4 flex flex-1 min-h-0">
              <Outlet />
              <Dialogs />
            </div>
          </SidebarInset>
          <Toaster position="top-center" richColors />
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
