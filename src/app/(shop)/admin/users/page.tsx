export const revalidate = 0;

import { Pagination, Title } from "@/components";
import { getPaginatedUsers } from "@/actions";
import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

interface Props {
  searchParams: Promise<{ page?: string | string[] | undefined }>;
}

export default async function UsersAdminPage({ searchParams }: Props) {
  const sp = await searchParams;
  const rawPage = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const page = rawPage ? parseInt(rawPage, 10) : 1;

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
