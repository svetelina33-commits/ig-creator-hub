/**
 * Single source of truth for Meta App Review approval state.
 * Edit when the partner reference, scope set, or approval date changes.
 */

export const META_APPROVAL = {
  status: "approved" as const,

  approvedOn: "2026-04-29",
  approvedOnRoman: "IV · XXIX · MMXXVI",
  approvedOnDisplay: "April 29, 2026",

  partnerRef: "NX-IGB-026",

  loginType: "Instagram Business Login",
  apiName: "Instagram Graph API",
  reviewer: "Meta App Review",

  scopes: [
    {
      handle: "instagram_business_basic",
      title: "Profile · basic",
      body: "Read your username, account type, and the public-facing fields visible on your own profile. No analytics beyond what you already see.",
    },
    {
      handle: "instagram_business_manage_comments",
      title: "Comments · moderate",
      body: "Reply and moderate on the campaign posts you commissioned. Bound by the moderation rules written into the brief you signed.",
    },
    {
      handle: "instagram_business_content_publish",
      title: "Content · publish",
      body: "Schedule and publish the posts you've approved. The window opens at contract counter-signature and closes at final delivery.",
    },
  ],

  // Negative space — the more credible trust signal.
  doesNot: [
    "Never sees your Instagram password — Meta's OAuth handles authentication end-to-end.",
    "Never reads your DMs — the scope was not requested and is not present in our app.",
    "Never publishes without your sign-off — every post traces back to a brief you countersigned.",
    "Never retains access between campaigns — the access window is contract-bound and time-boxed.",
  ],
};
