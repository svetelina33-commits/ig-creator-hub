/**
 * Nexus Club Help Center — single source of truth.
 *
 * Each article carries plain-English content addressing one creator question.
 * Add or edit articles here; the help center routes pick them up automatically.
 *
 * Voice: clear, warm, plain. The marketing pages can be editorial; help
 * articles need to be readable. Short paragraphs, concrete answers,
 * bullet lists where they help. No flourish.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; tone?: "gold" | "ink" | "vermillion"; text: string }
  | { type: "code"; text: string }
  | { type: "quote"; text: string; cite?: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  body: Block[];
  category: CategorySlug;
  tier: 1 | 2 | 3;
  related?: string[];
  popular?: boolean;
  updatedOn?: string;
};

export type CategorySlug =
  | "joining"
  | "account"
  | "profile"
  | "instagram"
  | "gmail"
  | "campaigns"
  | "publishing"
  | "earnings"
  | "trust"
  | "disputes"
  | "privacy"
  | "technical";

export type Category = {
  slug: CategorySlug;
  number: string;
  name: string;
  kicker: string;
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "joining",
    number: "I",
    name: "Joining & membership",
    kicker: "Apply · accept · onboard",
    description:
      "What membership is, who it's for, how to apply, and what to expect from the editor's reply.",
  },
  {
    slug: "account",
    number: "II",
    name: "Your account",
    kicker: "Sign-in · password · deletion",
    description:
      "Email, password, devices, deletion, and the basics of keeping your Nexus Club account in order.",
  },
  {
    slug: "profile",
    number: "III",
    name: "Your profile",
    kicker: "Bio · handles · niches",
    description:
      "Building a profile brands actually click on, and what's public versus what we keep behind glass.",
  },
  {
    slug: "instagram",
    number: "IV",
    name: "Connecting Instagram",
    kicker: "Meta consent · scopes · revocation",
    description:
      "How and why we connect to your Instagram, what each permission means, and how to take access back at any moment.",
  },
  {
    slug: "gmail",
    number: "V",
    name: "Connecting Gmail",
    kicker: "Google consent · scopes",
    description:
      "Why we ask for Gmail, the unverified-app warning Google shows, and what we do (and don't) read.",
  },
  {
    slug: "campaigns",
    number: "VI",
    name: "Campaigns & applications",
    kicker: "Briefs · petitions · pitches",
    description:
      "Reading a brief, applying with a note that gets read, and what happens after the editor decides.",
  },
  {
    slug: "publishing",
    number: "VII",
    name: "Active campaigns & publishing",
    kicker: "Concierge · windows · logs",
    description:
      "Once you're approved: what the publishing concierge does, what gets logged, and how to step in.",
  },
  {
    slug: "earnings",
    number: "VIII",
    name: "Earnings & payouts",
    kicker: "Withdrawals · identity · taxes",
    description:
      "When you get paid, how identity verification works, and what to do when a withdrawal stalls.",
  },
  {
    slug: "trust",
    number: "IX",
    name: "Trust, verification & security",
    kicker: "Meta authorization · encryption",
    description:
      "Our Meta App Review authorization, how your data is protected, and what to do if anything looks off.",
  },
  {
    slug: "disputes",
    number: "X",
    name: "Brand & dispute issues",
    kicker: "Brief drift · payment · removal",
    description:
      "When a brand goes outside the brief, doesn't pay, or asks for something you didn't agree to.",
  },
  {
    slug: "privacy",
    number: "XI",
    name: "Privacy & data rights",
    kicker: "Collection · retention · deletion",
    description:
      "What we collect, why, who sees it, and how to download or delete your data on request.",
  },
  {
    slug: "technical",
    number: "XII",
    name: "Technical issues",
    kicker: "Site · dashboard · bugs",
    description:
      "Page doesn't load, dashboard looks wrong, the mobile overlay won't dismiss — start here.",
  },
];

export const ARTICLES: Article[] = [
  /* ═════════════════════════ I · Joining ═════════════════════════ */
  {
    slug: "how-to-apply",
    title: "How to apply for membership",
    excerpt:
      "Membership is by application — read every word personally, replied to within two business days. Here's what we ask for, and what we look for.",
    category: "joining",
    tier: 1,
    popular: true,
    related: ["after-you-apply", "membership-is-free"],
    updatedOn: "2026-04-29",
    body: [
      {
        type: "p",
        text: "Nexus Club is a small, curated network. Membership is by application — an editor reads every one personally and writes back within two business days.",
      },
      { type: "h", text: "What we ask for" },
      {
        type: "ul",
        items: [
          "Email and a password — the basics for your account",
          "A short note about the work you make (two or three sentences is plenty)",
          "The Instagram handle you'd campaign under",
        ],
      },
      {
        type: "p",
        text: "You don't need a fixed follower count, a media kit, or a pitch deck. We care about your point of view, not your numbers.",
      },
      { type: "h", text: "What we look for" },
      {
        type: "p",
        text: "A distinct voice. Editorial coherence — the sense that you'd recognize your own work in a stack of others'. Comfort posting on a Business or Creator account. (If you don't have one yet, we'll point you at how to switch.)",
      },
      { type: "h", text: "What happens next" },
      {
        type: "p",
        text: "An editor reads your application and looks at your public profile. We say yes more often than you'd think — and when we say no, we say it kindly. Either way, you'll have a reply within two business days.",
      },
      {
        type: "callout",
        tone: "gold",
        text: "If you don't hear back within three business days, write to support@thenexusclub.org with the subject \"membership status\" and we'll dig out your application.",
      },
    ],
  },
  {
    slug: "after-you-apply",
    title: "What happens after you apply",
    excerpt:
      "Two business days. One editor. A reply either way. Here's the timeline and the criteria, in plain English.",
    category: "joining",
    tier: 1,
    popular: true,
    related: ["how-to-apply", "havent-heard-back"],
    body: [
      {
        type: "p",
        text: "Your application lands on the desk and an editor reads it the same day or the next morning. They open your Instagram, read recent posts, and write back inside two business days.",
      },
      { type: "h", text: "What \"reading your application\" means" },
      {
        type: "ul",
        items: [
          "Your application note is read in full — not skimmed",
          "Your Instagram profile is opened and scrolled — not just the bio",
          "If you've linked a portfolio, we click it",
        ],
      },
      { type: "h", text: "What gets a yes" },
      {
        type: "p",
        text: "A clear point of view, a body of work that has internal consistency, and an Instagram setup that's compatible with our publishing flow (Business or Creator account).",
      },
      { type: "h", text: "What gets a polite no" },
      {
        type: "p",
        text: "Profiles that read as primarily promotional reposts; accounts that don't post; or styles that don't fit the kind of campaigns currently on the desk. \"No\" is rarely permanent — we'll often suggest reapplying after you've shipped a few more pieces.",
      },
    ],
  },
  {
    slug: "havent-heard-back",
    title: "I haven't heard back — what's going on?",
    excerpt:
      "Two business days is the rule, three is the threshold to write us. Here's how to nudge without losing your spot.",
    category: "joining",
    tier: 2,
    related: ["after-you-apply"],
    body: [
      {
        type: "p",
        text: "Two business days is our standard reply window. If it's been three or more, your application probably bounced into a folder it shouldn't have. Write to us — you don't lose your place.",
      },
      { type: "h", text: "How to nudge" },
      {
        type: "p",
        text: "Email support@thenexusclub.org with the subject \"membership status\" and the email you applied with. We'll find it and reply by end of day.",
      },
      {
        type: "callout",
        tone: "ink",
        text: "Nudging doesn't put you behind anyone. It just helps us notice we missed a reply.",
      },
    ],
  },
  {
    slug: "reapplying-after-decline",
    title: "Reapplying after a decline",
    excerpt:
      "A no isn't usually permanent. Here's when reapplying makes sense and what to do differently.",
    category: "joining",
    tier: 3,
    body: [
      {
        type: "p",
        text: "Most declines come down to fit, not quality. A reapplication after three to six months — once you've shipped new work — is welcomed and read fresh.",
      },
      {
        type: "p",
        text: "If your decline note included a specific reason (\"we'd love to see more long-form work,\" \"come back when you've added a project\"), follow it. The desk remembers.",
      },
    ],
  },
  {
    slug: "membership-is-free",
    title: "Membership is free — what's the catch?",
    excerpt:
      "There isn't one. We make money when brands pay creators, taking a flat percentage of campaign payouts. You don't pay to be a member.",
    category: "joining",
    tier: 2,
    body: [
      {
        type: "p",
        text: "Membership in Nexus Club is free. There's no monthly fee, no \"premium tier,\" no upsell.",
      },
      { type: "h", text: "How we actually make money" },
      {
        type: "p",
        text: "Brands pay a flat fee to commission a campaign through us. A percentage of that fee covers our operations. Members keep the campaign payout stated in the brief — no clawbacks, no metric-based deductions.",
      },
      {
        type: "p",
        text: "We never sell member data, run ads against your profile, or charge you to access campaigns.",
      },
    ],
  },

  /* ═════════════════════════ II · Account ═════════════════════════ */
  {
    slug: "forgot-password",
    title: "I forgot my password",
    excerpt:
      "Reset link via email. Lands in 30 seconds. If it doesn't, here's how to get unstuck.",
    category: "account",
    tier: 1,
    popular: true,
    body: [
      { type: "h", text: "Reset by email" },
      {
        type: "ol",
        items: [
          "Go to /forgot-password",
          "Enter the email you signed up with",
          "Check your inbox — the link arrives within thirty seconds",
          "Click the link and choose a new password",
        ],
      },
      { type: "h", text: "If the email doesn't arrive" },
      {
        type: "ul",
        items: [
          "Check spam — \"Nexus Club\" is the sender",
          "Confirm you typed the exact email you signed up with",
          "Wait two minutes; transactional email occasionally trickles",
          "Still nothing? Email support@thenexusclub.org from any address with the subject \"reset stuck\"",
        ],
      },
    ],
  },
  {
    slug: "change-email",
    title: "Change your email or display name",
    excerpt: "Both live in your profile settings. Here's where, and what changes downstream.",
    category: "account",
    tier: 2,
    body: [
      { type: "p", text: "Open Settings → Account. You can update either field there." },
      { type: "h", text: "Email change" },
      {
        type: "p",
        text: "Your account login changes immediately. Active campaign threads continue at the new address. If your payout email was the same as your login, update Settings → Payouts as well — payouts ship to the email registered there, not your login email.",
      },
    ],
  },
  {
    slug: "delete-account",
    title: "Delete your account",
    excerpt:
      "From your dashboard. Active campaigns finish first. Here's what happens to your data.",
    category: "account",
    tier: 2,
    related: ["data-after-deletion"],
    body: [
      {
        type: "p",
        text: "Settings → Danger zone → Delete account. We finish any active campaign you've signed for, then close your account.",
      },
      { type: "h", text: "What happens immediately" },
      {
        type: "ul",
        items: [
          "You're signed out of every device",
          "Your public profile (if any) is removed from the directory",
          "New applications under your name are no longer accepted",
        ],
      },
      { type: "h", text: "What happens within 30 days" },
      {
        type: "ul",
        items: [
          "Active campaigns are closed and final payouts are issued",
          "Personal data is purged from the live database",
          "Tax records and audit logs are retained as legally required, then deleted on schedule",
        ],
      },
    ],
  },
  {
    slug: "account-restricted",
    title: "Why is my account on hold or restricted?",
    excerpt: "Three usual reasons. Each has a path to lift the hold.",
    category: "account",
    tier: 3,
    body: [
      {
        type: "p",
        text: "Holds are rare. They land for one of three reasons: a payout-method dispute we're investigating, a campaign delivery that wasn't completed, or a brand-side concern flagged for review.",
      },
      {
        type: "p",
        text: "If you see a banner in your dashboard, it'll name the reason. Replying to the banner notification opens a thread directly with the editor handling the case.",
      },
    ],
  },

  /* ═════════════════════════ III · Profile ═════════════════════════ */
  {
    slug: "build-a-good-profile",
    title: "Build a profile brands actually click on",
    excerpt:
      "Three fields do most of the work. Here's how to fill them so the right campaigns find you.",
    category: "profile",
    tier: 2,
    body: [
      { type: "h", text: "Bio — two or three sentences" },
      {
        type: "p",
        text: "What you make, who you make it for, and what makes your work yours. Skip the title-soup; lean into one specific angle.",
      },
      { type: "h", text: "Niches — pick three" },
      {
        type: "p",
        text: "These are the lanes the editor uses to surface campaigns to you. Three is better than seven — the right campaigns are more important than more campaigns.",
      },
      { type: "h", text: "Portfolio links" },
      {
        type: "p",
        text: "Add three to five external pieces (a press feature, your strongest project, a personal site). Quality over quantity — these get read.",
      },
    ],
  },
  {
    slug: "public-vs-private",
    title: "Public vs. private — what brands and members see",
    excerpt:
      "By default your profile sits behind glass. You can flip it public when you're ready.",
    category: "profile",
    tier: 2,
    body: [
      {
        type: "p",
        text: "Profiles are private by default. Brands you're matched with see a redacted card — display name, niches, generative avatar — until you accept a campaign and the matchmaker reveals the real handle.",
      },
      {
        type: "p",
        text: "Switching your profile public from Settings → Profile listing puts a card in the public /creators directory. Public profiles get inbound campaign inquiries and are still subject to the same campaign matching as private ones.",
      },
    ],
  },
  {
    slug: "redacted-handle",
    title: "Why is my handle redacted on the public directory?",
    excerpt: "Discovery without exposure. The reveal happens at the brand's commit step.",
    category: "profile",
    tier: 3,
    body: [
      {
        type: "p",
        text: "Brands browsing the directory see what you make and what you're known for — without your @ being open-season for cold DMs and scraping. The matchmaker reveals your handle once a brand commits to a brief; before that, your account stays unburdened.",
      },
    ],
  },
  {
    slug: "generative-avatars",
    title: "The generative avatars — and why we don't use your photo",
    excerpt:
      "Privacy by default. You can opt into a real photo from Settings whenever you'd like.",
    category: "profile",
    tier: 3,
    body: [
      {
        type: "p",
        text: "Public directory cards use a generative avatar derived from your handle, not your real Instagram photo. This is privacy-by-default — brands evaluating you see your work first, not your face.",
      },
      {
        type: "p",
        text: "From Settings → Profile listing, you can swap in a real photo when you're ready.",
      },
    ],
  },

  /* ═════════════════════════ IV · Instagram (the big one) ═════════════════════════ */
  {
    slug: "why-we-ask-instagram",
    title: "Why we ask for Instagram access",
    excerpt:
      "So we can publish the campaigns you commit to — through Meta's official API, never by logging into your account. Here's the architecture, plainly.",
    category: "instagram",
    tier: 1,
    popular: true,
    related: [
      "consent-screen-explained",
      "what-we-never-see",
      "removing-access",
      "business-or-creator",
    ],
    body: [
      {
        type: "p",
        text: "When you accept a campaign, we publish the post through Meta's official Instagram Graph API — under the authorization you grant on Meta's own consent screen. We never log in to your Instagram. We don't have your password. The whole architecture is designed so that sentence is a fact, not a promise.",
      },
      { type: "h", text: "What \"granting access\" actually means" },
      {
        type: "ol",
        items: [
          "You tap \"Connect Instagram\" on your Nexus Club dashboard",
          "Meta's own screen appears — Meta's surface, Meta's wording, Meta's checkbox",
          "You approve the named permissions (we list them in another article)",
          "Meta returns a long-lived access token to our app",
          "We encrypt that token and store it",
          "When a campaign you signed runs, we use the token to call Meta's API on your behalf — the same way Meta's official partners do",
        ],
      },
      { type: "h", text: "What this isn't" },
      {
        type: "p",
        text: "It is not a password share. It is not a session login. It is not us \"acting as you\" in your Instagram app. The token is scoped to publishing campaign posts, moderating comments on those posts, and reading your basic profile info — and nothing else.",
      },
      {
        type: "callout",
        tone: "gold",
        text: "If a process ever asks you to share your Instagram password, reset it multiple times to \"verify access,\" or download a tool to your phone — that's not us. Stop and write to support@thenexusclub.org.",
      },
    ],
  },
  {
    slug: "business-or-creator",
    title: "Business or Creator account — and how to switch",
    excerpt:
      "Meta's Graph API only publishes from Business or Creator accounts. Switching takes about thirty seconds and is reversible.",
    category: "instagram",
    tier: 1,
    popular: true,
    related: ["facebook-page-link", "why-we-ask-instagram"],
    body: [
      {
        type: "p",
        text: "The Graph API publishing scope only works on Instagram Business or Creator accounts — not Personal. This is a Meta requirement, not ours. The good news: switching takes about thirty seconds, and you can switch back at any time.",
      },
      { type: "h", text: "How to switch (iPhone / Android)" },
      {
        type: "ol",
        items: [
          "Open the Instagram app",
          "Tap your profile icon → the three-line menu",
          "Settings and privacy → Account type and tools",
          "Tap \"Switch to professional account\"",
          "Choose \"Creator\" (recommended for individuals) or \"Business\"",
          "Pick the category that fits — you can change it later",
        ],
      },
      { type: "h", text: "Creator vs. Business" },
      {
        type: "ul",
        items: [
          "Creator — designed for individuals (writers, photographers, musicians, artists). Cleaner profile, no contact buttons by default.",
          "Business — designed for brands and shops. Adds a category label and contact buttons (call, email, directions).",
        ],
      },
      {
        type: "p",
        text: "Either works for Nexus campaigns. Most members go with Creator.",
      },
      { type: "h", text: "What changes (and what doesn't)" },
      {
        type: "ul",
        items: [
          "Your follower count, posts, captions, and DMs all stay the same",
          "Your profile becomes public (a Meta requirement for the professional types)",
          "You gain access to Insights — your own analytics dashboard",
          "You can switch back to Personal at any time from the same menu",
        ],
      },
      {
        type: "callout",
        tone: "ink",
        text: "If your account is currently private and you'd like to keep audience-side privacy after the switch, consider opening to public only for the campaign window. We can advise.",
      },
    ],
  },
  {
    slug: "facebook-page-link",
    title: "Linking your Instagram to a Facebook page",
    excerpt:
      "The step that trips up most members. Here's the simplest path and what to do if you don't have a Facebook page yet.",
    category: "instagram",
    tier: 1,
    popular: true,
    related: ["business-or-creator", "why-we-ask-instagram"],
    body: [
      {
        type: "p",
        text: "Meta's Graph API requires that your Business or Creator Instagram account be linked to a Facebook page. This is the step most members get stuck on. It's painless once you know where to click.",
      },
      { type: "h", text: "If you already have a Facebook page" },
      {
        type: "ol",
        items: [
          "Open Instagram → your profile → Edit profile",
          "Scroll to \"Page\" → tap it",
          "Choose your existing Facebook page from the list, or create a new one",
          "Confirm — done",
        ],
      },
      { type: "h", text: "If you don't have a Facebook page" },
      {
        type: "p",
        text: "Create a placeholder page during the link step. It does not need to be active or have followers. You will not need to post on it. Its only job is to satisfy the Graph API requirement.",
      },
      {
        type: "ol",
        items: [
          "In the same \"Page\" step above, tap \"Create new page\"",
          "Name it the same as your Instagram (or your professional name)",
          "Pick any reasonable category (\"Personal blog\" works)",
          "Skip every optional field — submit",
        ],
      },
      {
        type: "callout",
        tone: "gold",
        text: "The Facebook page is a Meta plumbing requirement, not something you have to maintain. Most members create one, link it, and never touch it again.",
      },
    ],
  },
  {
    slug: "consent-screen-explained",
    title: "The Meta consent screen — what each permission means",
    excerpt:
      "Three permissions. Here's exactly what each one grants in plain English, with the official Meta scope name.",
    category: "instagram",
    tier: 1,
    popular: true,
    related: ["why-we-ask-instagram", "what-we-never-see"],
    body: [
      {
        type: "p",
        text: "When you tap \"Connect Instagram,\" Meta's own consent screen appears with three permissions listed. None of them are unusual; all three are standard for partner agencies on the Authorized Partners Register.",
      },
      { type: "h", text: "Profile · basic" },
      {
        type: "code",
        text: "instagram_business_basic",
      },
      {
        type: "p",
        text: "Reads your username, account type, and the public-facing fields visible on your own profile. No analytics beyond what you already see in Instagram's own Insights.",
      },
      { type: "h", text: "Comments · moderate" },
      {
        type: "code",
        text: "instagram_business_manage_comments",
      },
      {
        type: "p",
        text: "Lets the editor desk reply to and moderate comments on the campaign posts you commission — within the rules written into your campaign brief. We don't touch comments on non-campaign posts.",
      },
      { type: "h", text: "Content · publish" },
      {
        type: "code",
        text: "instagram_business_content_publish",
      },
      {
        type: "p",
        text: "Lets us schedule and publish the posts you've approved. The window opens at counter-signature on a campaign and closes at final delivery.",
      },
      {
        type: "callout",
        tone: "ink",
        text: "You can read Meta's own definitions of these scopes at developers.facebook.com/docs/permissions/reference. We always use the exact scope names so you can audit our claim against Meta's reference in seconds.",
      },
    ],
  },
  {
    slug: "what-we-never-see",
    title: "Will Nexus Club ever see my DMs or password?",
    excerpt: "No, and no. Here's why that's an architectural fact, not a marketing line.",
    category: "instagram",
    tier: 1,
    popular: true,
    related: ["why-we-ask-instagram", "consent-screen-explained", "removing-access"],
    body: [
      { type: "h", text: "Your password — never" },
      {
        type: "p",
        text: "Authentication runs entirely on Meta's surface. We don't have a password field, a \"login as you\" flow, or a session import. Your password leaves your fingers and stays with Meta. We literally cannot store something we never receive.",
      },
      { type: "h", text: "Your DMs — never" },
      {
        type: "p",
        text: "The permission required to read DMs (instagram_business_manage_messages) was deliberately not requested under our authorization. It is not in our app. Even if a desk editor wanted to read a member's messages, the technical capability isn't present.",
      },
      { type: "h", text: "Your password to a third party — never" },
      {
        type: "p",
        text: "If anyone — claiming to be from Nexus Club or otherwise — asks you to share your Instagram password, reset it multiple times for verification, or install a tool to give us access, that's not us. The legitimate path is exactly the one above: tap \"Connect Instagram\" on your dashboard, approve on Meta's screen, done.",
      },
      {
        type: "callout",
        tone: "vermillion",
        text: "Anyone asking you to reset your password to \"whitelist\" an editor is running a phishing script. Stop, screenshot the conversation, and email support@thenexusclub.org.",
      },
    ],
  },
  {
    slug: "removing-access",
    title: "Removing access — and what happens when you do",
    excerpt:
      "Two paths, both immediate. Here's exactly what severs and what stays — including what happens to a campaign mid-flight.",
    category: "instagram",
    tier: 1,
    popular: true,
    related: ["why-we-ask-instagram", "what-we-never-see"],
    body: [
      {
        type: "p",
        text: "You can revoke our access whenever you want, and we want you to feel that's true. Two paths:",
      },
      { type: "h", text: "Path A — from your Nexus Club dashboard" },
      {
        type: "ol",
        items: [
          "Sign in → Dashboard",
          "Open the publishing concierge card",
          "Tap \"Remove handle\"",
        ],
      },
      { type: "h", text: "Path B — directly from Instagram" },
      {
        type: "ol",
        items: [
          "Instagram app → Settings & privacy",
          "Apps and websites",
          "Find \"Nexus Club\" → Remove",
        ],
      },
      { type: "h", text: "What happens immediately" },
      {
        type: "ul",
        items: [
          "Our access token is invalidated by Meta within seconds",
          "Any scheduled campaign post that hadn't yet been published cannot be published",
          "Your dashboard shows the connection as disconnected",
        ],
      },
      { type: "h", text: "What happens to a campaign in flight" },
      {
        type: "p",
        text: "If a campaign window was open, it closes. The brand is notified that the campaign was paused or terminated by the creator. Payouts on any work already delivered are honored; partial-delivery cases are handled case-by-case (in your favor by default).",
      },
      {
        type: "callout",
        tone: "gold",
        text: "Path B does not require us. Meta's own settings sever the connection without our involvement — which is the right architecture for trust.",
      },
    ],
  },
  {
    slug: "revoked-by-accident",
    title: "I revoked access by accident — how do I reconnect?",
    excerpt: "Tap Connect again, approve on Meta's screen, you're back. Two minutes.",
    category: "instagram",
    tier: 2,
    related: ["removing-access"],
    body: [
      {
        type: "p",
        text: "Easy fix. Go to your dashboard, tap \"Connect Instagram\" again, approve on Meta's consent screen, and you're back. The whole loop takes about two minutes.",
      },
      {
        type: "p",
        text: "If a campaign was in flight when you revoked, write to the editor handling the campaign so they can resume the publishing schedule on the right cadence.",
      },
    ],
  },
  {
    slug: "token-expired",
    title: "My access token expired — what does that mean?",
    excerpt: "Routine. Reconnect on your dashboard and you're back. Here's why it expires.",
    category: "instagram",
    tier: 3,
    body: [
      {
        type: "p",
        text: "Meta issues partner access tokens with a sixty-day lifetime. We try to refresh quietly before expiration, but occasionally a token still expires (e.g., if Meta's models flagged a refresh attempt). If yours has, your dashboard will show a banner asking you to reconnect — one tap, you're back.",
      },
    ],
  },
  {
    slug: "connect-button-not-working",
    title: "The \"Connect Instagram\" button isn't working",
    excerpt: "Three usual culprits. Walk through them in order.",
    category: "instagram",
    tier: 2,
    body: [
      { type: "ol", items: [
        "Confirm your Instagram account is set to Business or Creator (Personal accounts can't connect — see the related article on switching)",
        "Confirm your account is linked to a Facebook page (see the related article)",
        "Try in a regular browser window — content blockers and aggressive privacy extensions sometimes interfere with Meta's consent screen redirect",
      ] },
      { type: "p", text: "Still stuck? Send us a screenshot of where the flow breaks and we'll trace it from the desk." },
    ],
  },

  /* ═════════════════════════ V · Gmail ═════════════════════════ */
  {
    slug: "why-gmail",
    title: "Why we ask for Gmail",
    excerpt:
      "So you can withdraw earnings to a verified payout email. The scope is narrow; here's exactly what's read and sent.",
    category: "gmail",
    tier: 1,
    popular: true,
    related: ["google-unverified-warning", "what-gmail-scopes-do"],
    body: [
      {
        type: "p",
        text: "Two reasons. First, identity verification — connecting Gmail proves the email on your campaigns is one you actually control. Second, optional campaign-thread sending — when a brand wants to email you about a brief, we can route the message through your Gmail so the conversation lives in your own inbox.",
      },
      {
        type: "p",
        text: "Both uses are scoped narrowly. We don't read your personal email; we don't archive your inbox; we don't analyze your contacts.",
      },
    ],
  },
  {
    slug: "google-unverified-warning",
    title: "The \"Google hasn't verified this app\" warning",
    excerpt:
      "Why you see it, why it's expected, and why our Meta authorization doesn't make it disappear.",
    category: "gmail",
    tier: 1,
    popular: true,
    related: ["why-gmail"],
    body: [
      {
        type: "p",
        text: "When you tap \"Connect Gmail,\" Google shows a warning — \"Google hasn't verified this app.\" This surprises members who've already seen our verified Meta authorization. The two are unrelated.",
      },
      { type: "h", text: "Why the warning shows" },
      {
        type: "p",
        text: "Google's app-verification process is its own program, separate from Meta's. Google reviews apps that request access to user Gmail data; the review process is comprehensive and takes several months. We've submitted; verification is pending.",
      },
      { type: "h", text: "Why it's still safe to proceed" },
      {
        type: "ul",
        items: [
          "The OAuth flow is Google's official one — we never see your password",
          "The scopes we request are documented and minimal (gmail.send, gmail.readonly)",
          "You can revoke access at any time from your Google account",
          "Our Meta authorization is unrelated; Google verification is independent",
        ],
      },
      { type: "h", text: "How to proceed past the warning" },
      {
        type: "ol",
        items: [
          "On the warning screen, tap \"Advanced\"",
          "Tap \"Go to thenexusclub.org (unsafe)\" — Google's wording, not ours",
          "Approve the named scopes on the next screen",
          "Done — you're back on your dashboard",
        ],
      },
      {
        type: "callout",
        tone: "ink",
        text: "Google verification is on the roadmap. When it lands, this warning disappears for all members. Until then, the proceed-past-warning path is normal.",
      },
    ],
  },
  {
    slug: "what-gmail-scopes-do",
    title: "What we do (and don't) with Gmail access",
    excerpt: "Two scopes. Here's exactly what each one allows and what's outside their reach.",
    category: "gmail",
    tier: 2,
    body: [
      { type: "h", text: "gmail.send" },
      {
        type: "p",
        text: "Send email from your Gmail address — used only when a brand replies to a campaign thread and we route the response. Each message is logged to your campaign action log.",
      },
      { type: "h", text: "gmail.readonly" },
      {
        type: "p",
        text: "Read campaign-relevant message threads only — those tagged with our system label. We do not index your inbox, read personal mail, or scan attachments outside campaign threads.",
      },
      {
        type: "p",
        text: "You can revoke access at myaccount.google.com → Security → Third-party apps → Nexus Club. Revocation is immediate.",
      },
    ],
  },

  /* ═════════════════════════ VI · Campaigns ═════════════════════════ */
  {
    slug: "applying-to-a-campaign",
    title: "Writing an application that gets read",
    excerpt: "Three sentences beats three paragraphs. Here's the shape that works.",
    category: "campaigns",
    tier: 1,
    popular: true,
    body: [
      { type: "p", text: "Editors read every application. Three sentences beats three paragraphs. The shape that works:" },
      { type: "ol", items: [
        "One sentence on why this brief specifically — not a generic pitch",
        "One sentence with concrete past work that's relevant",
        "One sentence with a small, specific idea you'd bring to it",
      ] },
      { type: "p", text: "Polish hurts here. Specificity helps. Editors are looking for the application that reads like it was written for this brief, not pasted from a template." },
    ],
  },
  {
    slug: "petition-statuses",
    title: "What \"petition pending / approved / declined\" means",
    excerpt: "Plain glossary, with the typical timeline for each.",
    category: "campaigns",
    tier: 2,
    body: [
      { type: "h", text: "Pending" },
      { type: "p", text: "Your application is in queue. The editor sees applications in the order they arrive. Most decisions land within forty-eight hours of the brief closing." },
      { type: "h", text: "Approved" },
      { type: "p", text: "You've been selected for the campaign. A contract draft is sent to your email; the publishing window opens once you counter-sign." },
      { type: "h", text: "Declined" },
      { type: "p", text: "Not selected this round. Most decline notes include a specific reason — read it; it's how the desk says \"come back for one with this fit instead.\"" },
    ],
  },
  {
    slug: "withdrawing-application",
    title: "Withdrawing an application",
    excerpt: "From the campaign page. No penalty.",
    category: "campaigns",
    tier: 3,
    body: [
      { type: "p", text: "Open the campaign on /campaigns/[id], scroll to your application, tap \"Withdraw.\" No penalty, no record. The editor only sees withdrawn applications when reviewing whom to approve." },
    ],
  },
  {
    slug: "pitching-your-own",
    title: "Pitching your own campaign",
    excerpt: "When you have a brand in mind — here's how a creator-led pitch works at Nexus.",
    category: "campaigns",
    tier: 2,
    body: [
      { type: "p", text: "If you have a brand in mind that fits the register — write the brief yourself. Payout, deliverables, timing. We review; if it fits, we make it live for the network and you keep first refusal." },
      { type: "p", text: "Submit at /campaigns/pitch. The editor reviews within five business days." },
    ],
  },

  /* ═════════════════════════ VII · Publishing ═════════════════════════ */
  {
    slug: "concierge-explained",
    title: "The Publishing Concierge, explained",
    excerpt:
      "What the desk does on your behalf, what it never does, and how the action log surfaces every move.",
    category: "publishing",
    tier: 1,
    popular: true,
    related: ["window-timing", "what-we-never-see"],
    body: [
      {
        type: "p",
        text: "Once a campaign opens, an editor on our desk handles publishing — scheduling, caption polish, and reply moderation — under the brief you signed.",
      },
      { type: "h", text: "What the editor does" },
      {
        type: "ul",
        items: [
          "Drafts and finalizes captions to your tone",
          "Schedules the post on the cadence the brief calls for",
          "Replies to campaign-post comments under the moderation rules in your brief",
          "Logs every action in your dashboard's action log",
        ],
      },
      { type: "h", text: "What the editor never does" },
      {
        type: "ul",
        items: [
          "Logs into your Instagram (we publish via Meta's Graph API, not by signing in)",
          "Reads or sends from your DMs",
          "Touches non-campaign posts",
          "Acts outside the campaign window",
        ],
      },
      { type: "h", text: "What you can do at any time" },
      {
        type: "ul",
        items: [
          "Read the live action log on your dashboard",
          "Approve or revise the next post before it goes live",
          "Pause the publishing schedule (the brand is notified; we pick back up when you say)",
          "Revoke access entirely — see the related article",
        ],
      },
    ],
  },
  {
    slug: "window-timing",
    title: "The campaign window — when it opens and closes",
    excerpt: "Counter-signature opens it; final delivery closes it. No automatic renewal.",
    category: "publishing",
    tier: 2,
    body: [
      { type: "p", text: "The publishing window opens the moment you counter-sign your campaign contract. It closes at the moment of final delivery — defined in the brief as the last scheduled post going live and the brand confirming receipt." },
      { type: "p", text: "The window is not extended automatically. If a campaign needs an extension (e.g., a brand asks for an extra story), the editor sends a contract addendum for your sign-off. No extra time without your signature." },
    ],
  },
  {
    slug: "see-post-before-live",
    title: "Will I see the post before it goes live?",
    excerpt: "Yes — every draft is sent for your approval before publishing.",
    category: "publishing",
    tier: 2,
    body: [
      { type: "p", text: "Every campaign post lands in your dashboard as a draft before publishing. You can approve, revise, or reject. We don't publish a post you haven't seen." },
    ],
  },
  {
    slug: "harassment-on-campaign-post",
    title: "Someone is harassing me on a campaign post",
    excerpt: "Tag the editor in your dashboard; we hide and report under your moderation rules.",
    category: "publishing",
    tier: 2,
    body: [
      { type: "p", text: "Open the campaign on your dashboard → Action log → tag the editor on the comment thread. The editor hides or removes per your moderation rules and reports the account to Instagram if appropriate." },
    ],
  },

  /* ═════════════════════════ VIII · Earnings ═════════════════════════ */
  {
    slug: "when-you-get-paid",
    title: "When you get paid",
    excerpt:
      "Net-15 from campaign close. Flat amount, stated upfront, no metric clawbacks. Here's the timeline.",
    category: "earnings",
    tier: 1,
    popular: true,
    related: ["identity-verification-payouts", "withdrawal-pending"],
    body: [
      { type: "h", text: "The timeline" },
      {
        type: "ol",
        items: [
          "Campaign closes on final delivery",
          "Brand pays the campaign invoice within ten business days",
          "Your share lands in your Nexus Club balance the day the brand's payment clears",
          "You request a withdrawal; payout to your verified method within five business days",
        ],
      },
      { type: "h", text: "What's flat, what's variable" },
      {
        type: "p",
        text: "The payout amount is flat — exactly what the brief stated. There are no engagement-based clawbacks, no metric thresholds, no \"performance bonuses\" that hide downward adjustments. Reach is the brand's risk; your payout is yours.",
      },
      { type: "h", text: "Fees" },
      {
        type: "p",
        text: "Your withdrawal pays the network fee for your chosen method (PayPal, bank, or supported alternatives). The fee is shown before you confirm the withdrawal — no surprises.",
      },
    ],
  },
  {
    slug: "identity-verification-payouts",
    title: "Identity verification — why your payout email must match",
    excerpt:
      "We pay the same person who signed the campaign — verified through a Gmail-account match. Here's how it works.",
    category: "earnings",
    tier: 1,
    popular: true,
    related: ["when-you-get-paid", "withdrawal-rejected"],
    body: [
      {
        type: "p",
        text: "Before your first withdrawal, we verify that the person being paid is the person who signed the campaign. The mechanism is simple: connect a Gmail account that matches the email on your campaign sign-off, and we use Google's OAuth to confirm you control it.",
      },
      { type: "h", text: "Why this matters" },
      {
        type: "ul",
        items: [
          "Account-takeover prevention — a stolen Nexus password can't redirect your earnings to an attacker's PayPal",
          "Tax compliance — paying the actual creator, not someone using their name",
          "Brand confidence — brands know their campaign payouts go to the creator they commissioned",
        ],
      },
      { type: "h", text: "What happens if you can't match" },
      {
        type: "p",
        text: "If your campaign email and your withdrawal email aren't the same Gmail, write to support — we'll do a manual verification (typically a video confirmation with the editor) and unlock the withdrawal once it clears.",
      },
    ],
  },
  {
    slug: "withdrawal-pending",
    title: "Why is my withdrawal \"pending\"?",
    excerpt: "Three usual reasons. Each clears within hours, not days.",
    category: "earnings",
    tier: 2,
    related: ["when-you-get-paid", "withdrawal-rejected"],
    body: [
      { type: "ul", items: [
        "Identity verification not yet completed — connect Gmail or write us for manual verification",
        "Brand-side payment hasn't cleared — happens occasionally; the editor reaches out to the brand on day five",
        "Anti-fraud check on a first withdrawal over a threshold — we cross-check identity once, then it's fast forever after",
      ] },
    ],
  },
  {
    slug: "withdrawal-rejected",
    title: "Withdrawal rejected — what to do",
    excerpt: "Read the rejection reason on your dashboard. Most fix in one step.",
    category: "earnings",
    tier: 2,
    body: [
      { type: "p", text: "Open Earnings → Withdrawals. The rejected withdrawal carries a reason. The most common ones:" },
      { type: "ul", items: [
        "Payout method invalid — re-add the method in Settings → Payouts",
        "Identity verification failed — connect Gmail or write for manual verification",
        "Suspicious activity flagged — write to support and we'll unflag once we've spoken",
      ] },
    ],
  },
  {
    slug: "lost-payout-email",
    title: "I lost access to my payout email",
    excerpt: "Don't worry — you don't lose your earnings. Here's how to recover.",
    category: "earnings",
    tier: 3,
    body: [
      { type: "p", text: "Earnings stay in your Nexus Club balance. Email support@thenexusclub.org from any address you can prove you control. We re-verify identity (typically a video confirmation), update the payout email on file, and resume normal withdrawals." },
    ],
  },
  {
    slug: "tax-and-international",
    title: "Tax forms, 1099s, and international creators",
    excerpt: "Annual statements available. International payments supported in major currencies.",
    category: "earnings",
    tier: 3,
    body: [
      { type: "p", text: "U.S. members earning over the IRS threshold receive a 1099-NEC each January. International members receive an annual earnings statement they can use with their local tax authority. Settings → Earnings → Tax documents." },
      { type: "p", text: "Payouts are supported in USD, EUR, and GBP today. Members in other regions are paid in the closest supported currency; bank conversion fees vary by region." },
    ],
  },

  /* ═════════════════════════ IX · Trust ═════════════════════════ */
  {
    slug: "verified-by-meta",
    title: "Is Nexus Club verified by Meta?",
    excerpt:
      "Yes — Nexus Club Agency is on Meta's Authorized Partners Register. Here's the letter, and what \"authorized\" actually means.",
    category: "trust",
    tier: 1,
    popular: true,
    related: ["why-we-ask-instagram", "what-we-never-see"],
    body: [
      {
        type: "p",
        text: "Nexus Club Agency is on Meta's Authorized Partners Register for the Instagram Graph API program. The full Letter of Authorization is published at /verification — including the partner reference number, the scopes granted, and the issuance date.",
      },
      { type: "h", text: "What this gives you" },
      {
        type: "ul",
        items: [
          "Publishing happens through Meta's official API, not through password sharing",
          "Each scope we use is named publicly — you can audit it against Meta's permissions reference",
          "Authorization is revocable from your Instagram settings, without needing us",
        ],
      },
      { type: "h", text: "What this is not" },
      {
        type: "ul",
        items: [
          "Not a Meta Verified blue check (that's a paid Instagram subscription, unrelated)",
          "Not a license to access anything outside the named scopes",
          "Not a bypass for any Meta or Instagram terms of service",
        ],
      },
      {
        type: "callout",
        tone: "gold",
        text: "If anyone claiming to be from Nexus Club asks you to do something the Letter of Authorization doesn't cover — particularly anything involving your password — that's not us. The authorization defines the boundary.",
      },
    ],
  },
  {
    slug: "data-encryption",
    title: "How your data is encrypted",
    excerpt:
      "AES-256-GCM at rest, TLS 1.3 in flight. The technical details and what they actually protect.",
    category: "trust",
    tier: 2,
    body: [
      { type: "h", text: "At rest" },
      { type: "p", text: "Meta and Google access tokens are encrypted with AES-256-GCM before being written to the database. The encryption key is held in environment configuration, separate from the database itself, so a database compromise alone doesn't yield usable tokens." },
      { type: "h", text: "In flight" },
      { type: "p", text: "Every request to and from thenexusclub.org runs over TLS 1.3 with modern cipher suites. The platform is hosted on Vercel; database connections use TLS to Neon's serverless Postgres." },
    ],
  },
  {
    slug: "report-impersonation",
    title: "Reporting an impersonation or phishing email",
    excerpt: "Forward to support — and the warning signs to know it isn't us.",
    category: "trust",
    tier: 2,
    body: [
      { type: "p", text: "If you receive an email, DM, or call claiming to be from Nexus Club asking for your password, a verification code, payment outside our system, or to install something — it isn't us. Forward it to support@thenexusclub.org." },
      { type: "h", text: "How to know it's us" },
      { type: "ul", items: [
        "We email from @thenexusclub.org addresses only",
        "We never ask for passwords (yours, anyone's)",
        "We never ask for one-time codes or 2FA codes",
        "Payouts are always in-platform via your verified payout method — never PayPal/Venmo links sent over email",
        "All campaign sign-offs flow through your dashboard at thenexusclub.org",
      ] },
      { type: "callout", tone: "vermillion", text: "If you're in the middle of a flow that doesn't match what's on this list — pause, screenshot, and email support before doing anything else. We'll confirm in minutes whether it's us." },
    ],
  },

  /* ═════════════════════════ X · Disputes ═════════════════════════ */
  {
    slug: "brand-not-paying",
    title: "The brand isn't paying — what we do",
    excerpt: "We chase the brand on day five. You don't lose payment regardless. Here's the protocol.",
    category: "disputes",
    tier: 2,
    body: [
      { type: "ol", items: [
        "Day 0: campaign closes on final delivery",
        "Days 1–10: brand has standard net-10 to pay",
        "Day 5: editor reaches out to brand if no movement",
        "Day 10: editor escalates; legal templates engage if needed",
        "Day 15: agency-fronted payout — you're paid from agency funds while we recover from the brand",
      ] },
      { type: "p", text: "You don't carry brand-side risk. Your payout is owed by the agency once the campaign delivers; chasing the brand is our problem, not yours." },
    ],
  },
  {
    slug: "brief-drift",
    title: "The brand is asking for something outside the brief",
    excerpt: "Politely point at the brief; loop in the editor; we say no on your behalf.",
    category: "disputes",
    tier: 2,
    body: [
      { type: "p", text: "Politely reply that the request isn't in the signed brief and CC the editor on your campaign thread. The editor handles the brand-facing conversation. Scope expansion requires a contract addendum and additional payout — we don't accept ad-hoc add-ons." },
    ],
  },
  {
    slug: "post-removal",
    title: "Asking for a campaign post to be removed",
    excerpt: "Within seventy-two hours, no questions asked. After that, case-by-case with the brand.",
    category: "disputes",
    tier: 3,
    body: [
      { type: "p", text: "If something feels wrong after a post goes live, write to the editor on your campaign thread within seventy-two hours. We pull it down on your behalf, no questions asked." },
      { type: "p", text: "Past seventy-two hours, removal requires the brand's sign-off because the post has typically already been used in their reporting. We mediate; brands almost always agree if the reason is given." },
    ],
  },
  {
    slug: "ftc-disclosure",
    title: "FTC / #ad disclosure — what we require",
    excerpt: "Every campaign post carries clear disclosure. Non-negotiable, even when brands push.",
    category: "disputes",
    tier: 2,
    body: [
      { type: "p", text: "Every Nexus campaign post carries clear disclosure — \"#ad\" or \"Paid partnership with [brand]\" via Instagram's Branded Content tool, depending on the campaign. The disclosure is non-negotiable; brands that push back are declined campaigns." },
    ],
  },
  {
    slug: "refusing-mid-flight",
    title: "Can I refuse a campaign mid-flight?",
    excerpt: "Yes — write to the editor and we pause publishing immediately.",
    category: "disputes",
    tier: 3,
    body: [
      { type: "p", text: "Yes. Write to the editor on your campaign thread or use the dashboard's \"Pause campaign\" button. Publishing stops the moment we read the message. Delivered work is paid; remaining deliverables are released back to the brand or rescheduled by mutual agreement." },
    ],
  },

  /* ═════════════════════════ XI · Privacy ═════════════════════════ */
  {
    slug: "what-data-we-collect",
    title: "What data we collect, and why",
    excerpt: "A short list. Each item has a reason. Read /privacy for the full version.",
    category: "privacy",
    tier: 2,
    body: [
      { type: "ul", items: [
        "Email + password hash — for sign-in",
        "Profile fields you fill in — bio, niches, portfolio links",
        "Encrypted Meta and Google access tokens — to publish campaign posts",
        "Campaign history — to pay you and show your dashboard",
        "Action logs — to show you what the editor did on your behalf",
      ] },
      { type: "p", text: "Full list and retention policies at /privacy." },
    ],
  },
  {
    slug: "data-after-deletion",
    title: "What happens to my data after I delete my account",
    excerpt: "Personal data purged within 30 days; tax + audit records retained per law.",
    category: "privacy",
    tier: 3,
    body: [
      { type: "p", text: "Personal data — your profile, niches, application history — is purged from the live database within 30 days of deletion. Tax-related records and the audit log of campaign payouts are retained for the period required by law (typically 7 years in the U.S.) and then deleted on schedule." },
    ],
  },
  {
    slug: "what-brands-see",
    title: "What brands see about you (and what they don't)",
    excerpt:
      "Before they commit, a redacted card. After: name, handle, and what you negotiated to share.",
    category: "privacy",
    tier: 2,
    body: [
      { type: "h", text: "Before they commit to a brief with you" },
      { type: "p", text: "A redacted card: display name, niches, generative avatar, headline. Your real handle is not visible." },
      { type: "h", text: "After they commit" },
      { type: "p", text: "Your handle, your contracted email (typically the campaign-specific one), and the deliverables in the brief. They do not see your withdrawal history, other campaigns, or anything outside the current brief." },
    ],
  },

  /* ═════════════════════════ XII · Technical ═════════════════════════ */
  {
    slug: "site-wont-load",
    title: "The site won't load",
    excerpt: "Three quick checks. Most issues are CDN-cache or content-blocker.",
    category: "technical",
    tier: 3,
    body: [
      { type: "ol", items: [
        "Hard refresh — Cmd-Shift-R (Mac) or Ctrl-Shift-R (Windows)",
        "Try an incognito/private window — rules out a cached extension state",
        "Try a different network — confirms whether it's your connection",
      ] },
      { type: "p", text: "Still down for you? Email support with the timestamp and the URL — most outages we know about within minutes, but a member report is the fastest signal." },
    ],
  },
  {
    slug: "dashboard-wrong-info",
    title: "The dashboard is showing wrong info",
    excerpt: "Usually a stale cache. Sign out and back in clears it.",
    category: "technical",
    tier: 3,
    body: [
      { type: "p", text: "Sign out from the masthead and sign back in. This refreshes your session and re-fetches the latest dashboard state. If the wrong data persists past a fresh sign-in, that's a bug — please send a screenshot." },
    ],
  },
  {
    slug: "wider-screen-overlay",
    title: "\"Open on a wider screen\" overlay — why",
    excerpt: "We gate a few editorial pages to desktop for now. Member dashboards are mobile-friendly.",
    category: "technical",
    tier: 3,
    body: [
      { type: "p", text: "A few of the editorial pages on the public marketing site are designed for desktop and show a wider-screen overlay on mobile. All member-facing pages — dashboard, campaigns, earnings, settings — work on mobile and don't show the overlay. If you see it on a member page, that's a bug; please report it." },
    ],
  },
  {
    slug: "report-a-bug",
    title: "Reporting a bug",
    excerpt: "Send us a screenshot, the URL, and what you were doing. We close most reports within 48 hours.",
    category: "technical",
    tier: 3,
    body: [
      { type: "p", text: "Email support@thenexusclub.org with the subject \"bug\" and include:" },
      { type: "ul", items: [
        "A screenshot or screen recording of the issue",
        "The URL of the page",
        "What you were trying to do when it happened",
        "Browser + device (e.g., \"Safari iOS 17, iPhone 15\")",
      ] },
      { type: "p", text: "Most reports close within 48 hours. Critical bugs (anything affecting payouts or sign-in) close same-day." },
    ],
  },
];

/* ─────────── helpers ─────────── */

export function articlesByCategory(slug: CategorySlug): Article[] {
  return ARTICLES.filter((a) => a.category === slug);
}

export function findArticle(category: string, slug: string): Article | null {
  return (
    ARTICLES.find((a) => a.category === category && a.slug === slug) ?? null
  );
}

export function findCategory(slug: string): Category | null {
  return CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export function popularArticles(limit = 6): Article[] {
  return ARTICLES.filter((a) => a.popular).slice(0, limit);
}

export function relatedArticles(article: Article): Article[] {
  if (!article.related?.length) return [];
  return article.related
    .map((slug) => ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is Article => Boolean(a));
}

export function searchableArticles() {
  return ARTICLES.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    href: `/help/${a.category}/${a.slug}`,
    haystack: [
      a.title.toLowerCase(),
      a.excerpt.toLowerCase(),
      a.body
        .map((b) => {
          if (b.type === "p" || b.type === "h" || b.type === "callout") return b.text;
          if (b.type === "ul" || b.type === "ol") return b.items.join(" ");
          if (b.type === "code") return b.text;
          return "";
        })
        .join(" ")
        .toLowerCase(),
    ].join(" "),
  }));
}
