import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

type IApiResponse<T> = {
  success: true;
  data: T;
  total: number;
  message: string;
};
export const fetchClient = async <T>(
  url: string,
  options?: any
): Promise<IApiResponse<T>> => {
  let session = await auth();

  console.log(session);
  let res = await fetch(`${process.env.API_SERVER_BASE_URL}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      ...(session && { Authorization: `Bearer ${session.accessToken}` }),
    },
  });

  // If token expired, try refresh
  if (!res.ok) {
    if (res.status === 403 || res.status === 401) {
      console.log("token expirary");
      signOut();
      redirect("/login");
    }
  }

  return await res.json();
};
