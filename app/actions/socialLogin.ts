"use server";

import { signIn } from "@/auth";

// import { signIn } from "@/auth";

// import { signIn } from "../../auth";

export async function socialLogin(formData: FormData) {
  console.log(formData.get("socialAction"), "-0-------------------------");
  const action = formData.get("socialAction");
  await signIn();
}
