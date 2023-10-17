import { ProjectsTable } from "@/components/admin/projects/table";
import { Container } from "@/components/container";
import { Heading } from "@/components/typography";

export default function AdminProjectsPage() {
  return (
    <Container className="py-8">
      <Heading>Projects</Heading>
      <ProjectsTable />
    </Container>
  );
}
