import { cookies } from "next/headers";
import * as jose from "jose";
import { env } from "@/env.mjs";

const hankoApiUrl = env.HANKO_API_URL;

export async function getUserID() {
  const token = cookies().get("hanko")?.value;

  const JWKS = jose.createRemoteJWKSet(
    new URL(`${hankoApiUrl}/.well-known/jwks.json`),
  );

  if (!token) return null;

  try {
    const verifiedJWT = await jose.jwtVerify(token, JWKS);
    return verifiedJWT.payload.sub;
  } catch (error) {
    console.log("Invalid JWT", error);
    return null; // You might want to return a more meaningful error value here.
  }
}
