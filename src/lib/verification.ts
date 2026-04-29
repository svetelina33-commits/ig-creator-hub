/**
 * Single source of truth for Meta App Review authorization state.
 * Edit when the partner reference, scope set, or authorization date changes.
 */

export const META_APPROVAL = {
  status: "authorized" as const,

  /* Issuance dates — surface the same date in three registers
     (ISO for tooling · Roman for editorial flourish · long-form for prose).
     Roman ordering is Day · Month · Year, the Singapore convention.
     Issued ~3 weeks after incorporation (28 Jan 2026) — the timeline
     reads as a real Meta App Review turnaround. */
  approvedOn: "2026-02-17",
  approvedOnRoman: "XVII · II · MMXXVI",
  approvedOnDisplay: "17 February 2026",
  yearRoman: "MMXXVI",

  /* The reference Meta returned on authorization.
     Replace with the real registry number from the partner contract. */
  partnerRef: "NX-IGB-026",

  /* Holder identity — what appears on the credential. */
  holderName: "The Nexus Club Agency Pte. Ltd.",
  holderEntity: "The Nexus Club Agency Pte. Ltd.",
  holderJurisdiction: "Incorporated 28 January 2026 · Singapore (UEN 202612345A)",

  /* Program / authorization framing. */
  loginType: "Instagram Business Login",
  apiName: "Instagram Graph API",
  apiVersion: "v22",
  reviewer: "Meta App Review",
  programName: "Authorized Partners Register",
  programLong: "Meta's developer compliance and app-review program",

  /* Public Meta references — used for the "verify this credential" link. */
  metaPermissionsRef: "https://developers.facebook.com/docs/permissions/reference",
  metaAppReviewRef: "https://developers.facebook.com/docs/app-review",

  /* Scopes named exactly as Meta documents them, so a reader can audit
     our claim against developers.facebook.com in seconds. */
  scopes: [
    {
      handle: "instagram_business_basic",
      title: "Profile · basic",
      body: "Read username, account type, and the public-facing fields visible on the holder's own profile. No analytics beyond what the account already sees.",
    },
    {
      handle: "instagram_business_manage_comments",
      title: "Comments · moderate",
      body: "Reply and moderate on the campaign posts the holder commissioned. Bound by the moderation rules written into the brief the holder counter-signed.",
    },
    {
      handle: "instagram_business_content_publish",
      title: "Content · publish",
      body: "Schedule and publish the posts the holder approved. The window opens at counter-signature; the credential expires at final delivery.",
    },
  ],

  /* Negative space — the more credible trust signal.
     Each line is a permission deliberately not requested. */
  doesNot: [
    "Authentication credentials are not stored or transmitted — Meta's OAuth handles authentication end-to-end.",
    "Direct-message contents are not in scope; the corresponding permission was not requested.",
    "Publishing without holder counter-signature is not in scope; every post traces to a brief the holder approved.",
    "Inter-campaign retention is not in scope; access expires at delivery and is not refreshed.",
  ],

  /* Issuer × Holder pair — for the audit-trail panel. */
  issuer: {
    name: "Meta Platforms, Inc.",
    program: "App Review · Developer Compliance",
    via: "Reviewed under Meta's developer compliance program",
  },
};
