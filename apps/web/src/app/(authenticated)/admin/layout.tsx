import { UserButton } from "@protoxyz/components";

import Images from "@/components/images";
import { Badge } from "@/components/ui/badge";
import { AdminNav } from "./nav";
import { TRPCReactProvider } from "./providers";

export const metadata = {
  title: "Admin",
};

export default function Layout({ children }: any) {
  return (
    <TRPCReactProvider>
      <div className="relative h-full min-h-screen">
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-60 lg:overflow-y-auto lg:bg-gray-900 lg:pb-4">
          <div className="p-5">
            <Images.logo className="h-10 text-xl text-white" />
            <Badge>ADMIN PANEL</Badge>
          </div>

          <AdminNav />

          <div className="border-muted-foreground/20 mt-5 flex flex-1 flex-col items-center   border-t py-5">
            <UserButton />
          </div>
        </div>

        <div className="bg-gray-50 lg:pl-60">
          <main className="h-full min-h-screen ">{children}</main>
        </div>
      </div>
    </TRPCReactProvider>
  );
}
