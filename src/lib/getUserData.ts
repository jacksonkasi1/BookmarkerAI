"use client";

import { useEffect, useState, useCallback } from "react";
import { Hanko, type HankoError } from "@teamhanko/hanko-elements";
import { env } from "@/env.mjs";

// Define the type for your user data
type User = {
  id: string;
  email: string;
  webauthn_credentials: null;
  updated_at: string;
  created_at: string;
};

const hankoApi = env.NEXT_PUBLIC_HANKO_API_URL;
const hanko = new Hanko(hankoApi);

function useHankoUser() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<HankoError | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const userData = await hanko.user.getCurrent();
      setUser(userData as unknown as User);
    } catch (error) {
      setError(error as HankoError);
    }
  }, []);

  useEffect(() => {
    fetchUser().catch((error) => {
      console.error("Error fetching user:", error);
    });
  }, [fetchUser]);

  return { user, error };
}

export default useHankoUser;
