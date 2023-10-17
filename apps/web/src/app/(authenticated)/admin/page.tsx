import { Suspense } from "react";

import ByDay from "@/components/admin/by-day";
import { AdminRecentProjects } from "@/components/admin/recent-projects";
import { RecentSignups } from "@/components/admin/signups";
import AuthByDay from "@/components/admin/signups-by-day";
import { AdminStats } from "@/components/admin/stats";
import { Container } from "@/components/container";
import { Heading } from "@/components/typography";

export default function AdminDashboardPage() {
  return (
    <Container className="py-8">
      <Heading>Admin Dashboard</Heading>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
        <Suspense>
          <AdminStats />
        </Suspense>
        <Suspense>
          <ByDay />
        </Suspense>
        <Suspense>
          <AuthByDay />
        </Suspense>
        <Suspense>
          <RecentSignups />
        </Suspense>
        <Suspense>
          <AdminRecentProjects />
        </Suspense>
      </div>
    </Container>
  );
}
