import { getSession } from "@/lib/session";
import { findCreatorById, listCampaigns } from "@/lib/store";
import { isAdminEmail } from "@/lib/auth";
import { CommandPalette } from "./CommandPalette";

export async function GlobalChrome() {
  const session = await getSession();
  const creator = session.creatorId ? await findCreatorById(session.creatorId) : null;
  const admin = creator ? isAdminEmail(creator.email) : false;

  const campaigns = (await listCampaigns()).slice(0, 40).map((c) => ({
    id: c.id,
    title: c.title,
    brand: c.brand,
    status: c.status,
    payoutCents: c.payoutCents,
    currency: c.currency,
  }));

  return <CommandPalette isAdmin={admin} signedIn={!!creator} campaigns={campaigns} />;
}
