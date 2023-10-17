import { UsersTable } from "@/components/admin/users/table";
import { Container } from "@/components/container";
import { Heading } from "@/components/typography";

export default async function AdminUsersPage() {
  // const users = await getUsers({ cursor: undefined, perPage: 20 });
  return (
    <Container className="py-8">
      <Heading>Users</Heading>
      <UsersTable />

      {/* <DataTable
        meta={{
          cursor: null,
          pageCount: users?.meta.numPages,
          pageSize: users?.meta.perPage,
          pageIndex: 1,
          next: users?.meta.next,
          prev: users?.meta.prev,
        }}
        columns={columns}
        data={users?.data}
        // data={dataQuery.data?.all ?? []}
        // take={take}
        // setTake={onSetTake}
        // setCursor={onSetCursor}
      /> */}
    </Container>
  );
}
