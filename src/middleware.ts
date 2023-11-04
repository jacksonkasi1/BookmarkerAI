import { type NextRequest, NextResponse } from "next/server";

// ** import utils
import { getUserID } from "@/lib/utils";

export const config = {
  matcher: ["/profile", "/"],
};

export default async function middleware(req: NextRequest) {
  try {
    // Use the validateJwtAndFetchUserId function to check the JWT token
    const userID = await getUserID();

    if (!userID) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (error) {
    console.log("Next.js Middleware Error:", error);

    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Continue processing the request
  return NextResponse.next();
}
