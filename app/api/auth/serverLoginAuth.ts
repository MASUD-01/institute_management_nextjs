"use server";

import { deleteSession, setSession } from "@/lib/serverLoginSession";
import { redirect } from "next/navigation";

export const ServerLoginAuth = async (formData: any) => {
  //this formData used to call in api to get user data
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users: { id: number; username: string; email: string }[] =
      await response.json(); // wait for the JSON\
    const singeUser = users[0];

    if (!singeUser) {
      throw new Error("User not found");
    }

    await setSession({
      id: singeUser.id,
      username: singeUser.username,
      email: singeUser.email,
    });
    console.log(users[0], "--------------------"); // now you’ll see actual data
  } catch (err) {
    console.error("Login error:", err);
  }

  redirect("/");
};

export const logoutAction = async () => {
  await deleteSession();
  redirect("/serverLogin");
};
