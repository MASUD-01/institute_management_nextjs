import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("i amge", request.url);
  // return NextResponse.rewrite(new URL("/", request.url));
  return NextResponse.next();
  //return NextResponse.json({ name: "middleware" });
}

// See "Matching Paths" below to learn more

///which path u cant match and redirect
// export const config = {
//   matcher: "/login",
// };

// NextResponse.rewrite(new URL('/login', request.url))  hole /login path ta thakbe dashboard e
