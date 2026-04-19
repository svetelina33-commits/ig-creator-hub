import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import SignupForm from "./SignupForm";

export default async function Home() {
  const session = await getSession();
  if (session.creatorId) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400 text-white text-xl font-bold mb-4">
            ig
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Creator Hub
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Sign up to join brand campaigns and connect your Instagram.
          </p>
        </div>
        <SignupForm />
        <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-500">
          By continuing you agree to our terms. Instagram access is granted via
          Meta's official OAuth consent — you can revoke it at any time from
          your Instagram settings.
        </p>
      </div>
    </main>
  );
}
