"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Hanko, register } from "@teamhanko/hanko-elements";
import { env } from "@/env.mjs";

const hankoApiUrl: string = env.NEXT_PUBLIC_HANKO_API_URL;

export default function HankoAuth() {
  const router = useRouter();

  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => {
    import("@teamhanko/hanko-elements")
      .then(({ Hanko }) => setHanko(new Hanko(hankoApiUrl)))
      .catch((error) =>
        console.error("Failed to import @teamhanko/hanko-elements.", error),
      );
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await hanko!.user.getCurrent();
        console.log({user});
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser().catch(error => {
      console.error('Error fetching user:', error);
    });
  }, [hanko]);


  useEffect(
    () =>
      hanko?.onAuthFlowCompleted(async () => {
        const user = await hanko.user.getCurrent();

        const fetchData = async () => {
          if (!user) {
            console.error("No user data");
            return;
          }
          try {
            const response = await fetch("/api/create-user", {
              method: "POST",
              body: JSON.stringify(user),
            });

            if (!response.ok)
              throw new Error(`HTTP error! status: ${response.status}`);
          } catch (error) {
            console.error("Fetch Error: ", error);
          }
        };
        await fetchData();
        router.replace("/");
      }),
    [hanko, router],
  );

  useEffect(() => {
    register(hankoApiUrl, { injectStyles: true }).catch((error) =>
      console.error("Failed to register translations.", error),
    );
  }, [hankoApiUrl]);

  return <hanko-auth class={"hanko"} />;
}
