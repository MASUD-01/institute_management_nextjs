"use server";
import { signIn } from "@/auth";

export async function login(formData: any) {
  try {
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return res;
  } catch (error: any) {
    throw new Error(error);
  }
}
