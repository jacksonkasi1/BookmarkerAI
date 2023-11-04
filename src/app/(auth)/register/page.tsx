import dynamic from "next/dynamic";

const HankoAuth = dynamic(() => import("@/components/auth/HankoAuth"), {
  ssr: false,
});

export default function RegisterPage() {
  return (
    <>
      <div className="flex flex-col gap-20">
        <main className="w-full">
          <div className="container items-center text-center">
            <div className="text-center">
              <p>Register title</p>
            </div>
            <HankoAuth />
          </div>
        </main>
      </div>
    </>
  );
}
