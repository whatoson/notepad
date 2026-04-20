import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/theme/theme-provider";
import { Outlet } from "react-router";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";
import type { NoteMeta } from "@/types/note";

export interface MainLayoutLoaderData {
  notes: NoteMeta[];
}

export function MainLayout() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <SidebarProvider className="h-svh overflow-hidden">
          <AppSidebar variant="inset" />
          <SidebarInset>
            <Header />
            <Outlet />
          </SidebarInset>
          <Toaster position="top-center" richColors />
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
