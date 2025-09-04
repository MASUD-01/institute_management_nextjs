import { Button } from "antd";
// import { auth } from "../auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Home() {
  // const session = await auth();

  // console.log(session);
  // if (!session?.user) redirect("/serverLogin");
  return (
    <div>
      <Button type="primary">Hello</Button>

      {/* <Image
        src={session?.user?.image}
        alt={session?.user?.name}
        width={100}
        height={100}
      /> */}
    </div>
  );
}
