import { fetchClient } from "@/lib/fetch-client";

type IDepartment = { department_id: number; name: string }[];

const UserPage = async () => {
  const res = await fetchClient<IDepartment>(`/institute/department`, {
    headers: { "Content-Type": "application/json" },
  });

  const users = res?.data;

  return <div>UserPage {users[0]?.name}</div>;
};

export default UserPage;
