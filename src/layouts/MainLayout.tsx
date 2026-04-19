import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/theme/theme-provider";
import { Outlet } from "react-router";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";

export function MainLayout() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4">
              <Outlet />
            </main>
          </SidebarInset>
          <Toaster position="top-center" richColors />
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
