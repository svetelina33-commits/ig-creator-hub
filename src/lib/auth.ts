import { redirect } from "next/navigation";
import { adminEmails } from "./env";
import { getSession } from "./session";
import { findCreatorById, type CreatorRecord } from "./store";

export async function requireCreator(): Promise<CreatorRecord> {
  const session = await getSession();
  if (!session.creatorId) redirect("/");
  const creator = await findCreatorById(session.creatorId);
  if (!creator) redirect("/");
  return creator;
}

export function isAdminEmail(email: string): boolean {
  return adminEmails().includes(email.toLowerCase());
}

export async function requireAdmin(): Promise<CreatorRecord> {
  const creator = await requireCreator();
  if (!isAdminEmail(creator.email)) {
    redirect("/dashboard?nc_error=admin_only");
  }
  return creator;
}

export async function isAdmin(): Promise<boolean> {
  const session = await getSession();
  if (!session.creatorId) return false;
  const creator = await findCreatorById(session.creatorId);
  if (!creator) return false;
  return isAdminEmail(creator.email);
}
