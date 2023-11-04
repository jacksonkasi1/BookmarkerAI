"use client";

import { useEffect, useState, useCallback } from "react";

// ** import Hanko
import { Hanko, type HankoError } from "@teamhanko/hanko-elements";

// ** import env
import { env } from "@/env.mjs";

// ** import types
import { type User } from "@/types";

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
