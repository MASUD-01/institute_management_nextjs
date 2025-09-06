import { ISearchParam } from "@/app/(modules)/department/list/page";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

type IApiResponse<T> = {
  success: boolean;
  data: T | null;
  total: number;
  message: string;
  err: boolean;
};

export const fetchClient = async <T>(
  url: string,
  options?:
    | RequestInit & {
        searchParams?: { [key: string]: any };
      }
): Promise<IApiResponse<T>> => {
  const session = await auth();

  let customUrl: string;
  if (options?.searchParams) {
    const queryString = `?${new URLSearchParams(
      Object.fromEntries(
        Object.entries(options?.searchParams)
          .filter(([_, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)])
      )
    ).toString()}`;
    customUrl = url += queryString;
  } else {
    customUrl = url;
  }

  try {
    const res = await fetch(`${process.env.API_SERVER_BASE_URL}${customUrl}`, {
      ...options,
      headers: {
        ...options?.headers,
        ...(session && { Authorization: `Bearer ${session.accessToken}` }),
      },
    });

    console.log(options?.searchParams, "2222222222222222222222");
    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        console.log("Token expired");
        await signOut();
        redirect("/login");
      }

      // other errors (404, 500, etc.) 😒
      return {
        success: false,
        data: null,
        total: 0,
        message: `Server Error: ${res.status}`,
        err: true,
      };
    }

    const data = await res.json();
    // make it like IApiResponse-- because it return
    return {
      success: true,
      data: data?.data,
      total: data?.total ?? 0,
      message: data?.message ?? "Success",
      err: false,
    };
  } catch (err) {
    console.error("Fetch failed:", err);

    //when server is off or down that time ui cant break 😊
    return {
      success: false,
      data: null,
      total: 0,
      message: "Server unreachable. Try again later.",
      err: true,
    };
  }
};
