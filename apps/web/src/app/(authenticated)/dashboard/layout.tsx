import Link from "next/link";
import { OrganizationSwitcher, UserButton } from "@protoxyz/components";

import { DashboardSidebar } from "@/components/dashboard/sidebar";
import Images from "@/components/images";
import { urls } from "@/lib/urls";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full min-h-screen bg-slate-50">
      <div className="fixed flex h-16 w-full items-center justify-between bg-white px-4 lg:px-8">
        <div className="flex items-center gap-5">
          <Link href={urls.dashboard.root()}>
            <Images.logo className=" text-xl text-black" />
          </Link>
          <OrganizationSwitcher />
        </div>

        <UserButton />
      </div>
      <div className="h-full py-8 pt-16">
        <div className="fixed lg:w-[300px]">
          <DashboardSidebar />
        </div>
        <div className=" lg:ml-[300px]">{children}</div>
      </div>
    </div>
  );
}
