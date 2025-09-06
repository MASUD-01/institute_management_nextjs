// DepartmentList.tsx
import { fetchClient } from "@/lib/fetch-client";
import DepartmentPage from "./_component/DepartmentPage";
import { Suspense } from "react";

export type ISearchParam = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export type IDepartment = {
  department_id: number;
  name: string;
  status: number;
}[];

//**suspense works section label
//**loading.tsx works  route label

async function DepartmentListWrapper({ searchParams }: any) {
  return (
    <Suspense fallback={<div>Loading departments...</div>}>
      <DepartmentList searchParams={searchParams} />
    </Suspense>
  );
}

// Server Component
async function DepartmentList({ searchParams }: ISearchParam) {
  const status = (await searchParams)?.status;
  const name = (await searchParams)?.name;
  const { data } = await fetchClient<IDepartment[]>(`/institute/department`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    searchParams: { status, name },
  });
  return <DepartmentPage initialData={data ?? []} />;
}

export default DepartmentListWrapper;
