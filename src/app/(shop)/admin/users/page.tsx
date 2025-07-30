export const revalidate = 0;

import { Pagination, Title } from "@/components";
import { getPaginatedUsers } from "@/actions";
import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function UsersAdminPage({ searchParams }: Props) {
  const { page: pageTemp } = await searchParams;
  const page = pageTemp ? parseInt(pageTemp) : 1;

  const { ok, users = [], totalPages } = await getPaginatedUsers({ page });

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Todos los usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
