
import DashboardSidebar from "@/components/modules/sidebar/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
    return (
        <>
            <SidebarProvider>
                <DashboardSidebar />
                <main className="w-full  bg-purple-100">
                    <SidebarTrigger className="lg:hidden" />
                    {children}
                </main>
            </SidebarProvider>
        </>
    );
};

export default DashboardLayout;