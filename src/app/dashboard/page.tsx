import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import DashboardClient from "./DashboardClient";

type SearchParams = Promise<{ ig?: string; ig_error?: string }>;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getSession();
  if (!session.creatorId) redirect("/");
  const creator = await findCreatorById(session.creatorId);
  if (!creator) redirect("/");

  const params = await searchParams;

  return (
    <DashboardClient
      email={creator.email}
      connection={
        creator.instagram
          ? {
              username: creator.instagram.username,
              accountType: creator.instagram.accountType,
              connectedAt: creator.instagram.connectedAt,
              tokenExpiresAt: creator.instagram.tokenExpiresAt,
            }
          : null
      }
      notice={params.ig === "connected" ? "Instagram connected successfully." : null}
      error={params.ig_error ?? null}
    />
  );
}
