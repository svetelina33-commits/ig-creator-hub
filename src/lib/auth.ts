import { redirect } from "next/navigation";
import { env } from "./env";
import { getSession } from "./session";
import { findCreatorById, type CreatorRecord } from "./store";

export async function requireCreator(): Promise<CreatorRecord> {
  const session = await getSession();
  if (!session.creatorId) redirect("/");
  const creator = await findCreatorById(session.creatorId);
  if (!creator) redirect("/");
  return creator;
}

export async function requireAdmin(): Promise<CreatorRecord> {
  const creator = await requireCreator();
  if (creator.email.toLowerCase() !== env().ADMIN_EMAIL.toLowerCase()) {
    redirect("/dashboard?nc_error=admin_only");
  }
  return creator;
}

export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  if (!session.creatorId) return false;
  const creator = await findCreatorById(session.creatorId);
  if (!creator) return false;
  return creator.email.toLowerCase() === env().ADMIN_EMAIL.toLowerCase();
}
