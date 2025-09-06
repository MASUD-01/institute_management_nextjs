"use server";

import { signIn } from "@/auth";
import { ILogin } from "../login/page";

export async function socialLogin(formData: FormData) {
  const action = formData.get("socialAction");

  if (!action || typeof action !== "string") {
    throw new Error("Invalid social action");
  }

  return await signIn(action, {
    redirectTo: "/",
  });
}

export async function doCredentialLogin(payload: ILogin) {
  console.log("Login payload:", payload);

  const response = await signIn("credentials", {
    email: payload.email,
    password: payload.password,
    redirect: true, // we handle response manually
    redirectTo: "/",
  });

  console.log("signIn response:", response);

  // if (!response?.ok) {
  //   console.error("Credentials sign-in failed:", response?.error);
  //   return null;
  // }

  return response;
}
