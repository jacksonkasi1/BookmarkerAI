import { appRouter } from "@/server/api/root";
import { nextHandler } from "trpc-playground/handlers/next";
import { type NextApiRequest, type NextApiResponse } from "next";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const playgroundHandler = await nextHandler({
    router: appRouter,
    trpcApiEndpoint: "/api/trpc",
    playgroundEndpoint: "/api/trpc-playground",
    request: {
      superjson: true,
    },
  });
  return playgroundHandler(req, res)
};

export { handler as GET, handler as POST }