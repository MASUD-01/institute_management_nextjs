import { cookies } from "next/headers";

export const setSession = async (user: any) => {
  (await cookies()).set("session", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7 * 24, // 24 days
    path: "/",
  });
};

//get session
export const getSession = async (): Promise<any | null> => {
  const session = (await cookies()).get("session")?.value;

  if (!session) return null;
  const user = JSON.parse(session);
  return user;
};

//delete session
export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("session");
};
