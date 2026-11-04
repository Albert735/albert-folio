// Case studies for each project, shown at /work/<slug>.
// Anything left out (role, decisions) is simply not shown, so fill these in as you go.

export type CaseStudy = {
  /** Your part in it. Leave out if not yet written. */
  role?: string;
  /** Why the project exists */
  problem: string;
  /** What was built, as short items */
  built: string[];
  /** The choices worth explaining; each title is the decision */
  decisions: { title: string; body: string }[];
  /** Where it stands today */
  status: string;
};

export const caseStudies: Record<string, CaseStudy> = {
  raute: {
    role: "Design and development. My final-year project at the University of Ghana.",
    problem:
      "Legon's campus is big, and its halls, departments and offices are spread out and hard to find. Before writing any code I surveyed 208 students: 96% had gotten lost on campus at some point, and offline navigation was the feature they wanted most.",
    built: [
      "Turn-by-turn walking directions, with steps that advance on their own as you move",
      "A campus map with 3D buildings",
      "Explore, for browsing and searching buildings and places",
      "Building pages with photos, open or closed status and directions",
      "Class reminders and notifications",
      "A floating glass tab bar and a design system with light and dark themes",
    ],
    decisions: [
      {
        title: "Mapbox instead of Google Maps",
        body: "Offline use was what students asked for most. Mapbox supports offline maps and gives more control over campus-specific routing, so it fit better than the more familiar option.",
      },
      {
        title: "A custom tab bar instead of the native one",
        body: "The native tabs couldn't produce the floating, glass-style bar the design called for without layout problems, so I built my own, including swiping between tabs.",
      },
      {
        title: "One source of truth for places",
        body: "Every building and point of interest lives in a single data file, so the map, search, explore and building screens always agree about a place.",
      },
      {
        title: "Design system before screens",
        body: "Colours, type, spacing and components were set up in Figma as tokens with light and dark modes first, so new screens came together faster and stayed consistent.",
      },
    ],
    status:
      "Routing, navigation, explore, reminders and notifications work. Next: remembering data between sessions, separate experiences for guests and students, push notifications, Android testing, and testing with students on campus.",
  },

  crestline: {
    role: "Full-stack development.",
    problem:
      "Crestline Kits sells fan jerseys, mostly to buyers in Ghana who pay with mobile money, and some from abroad. The store had to take real payments and handle a stock model where some kits are on hand and others are ordered from a supplier only after a customer buys.",
    built: [
      "A catalogue of club, national team and retro kits",
      "Checkout with mobile money and cards through Paystack",
      "Prices in cedis for Ghana and Nigeria, and in US dollars elsewhere",
      "Free delivery within Greater Accra above a set order value",
    ],
    decisions: [
      {
        title: "Mobile money first",
        body: "Most customers pay with MoMo, so that shipped first. Card payments followed through Paystack, which handles both in one checkout.",
      },
      {
        title: "Prices that follow the buyer",
        body: "Buyers outside Ghana and Nigeria see a separate US dollar price, set per jersey. The site picks the right one from the visitor's location automatically, with no currency switch to get wrong.",
      },
      {
        title: "Two kinds of stock",
        body: "The store has to support kits that are on hand and ship right away, and kits ordered from a supplier only after a customer pays.",
      },
      {
        title: "Upfront about replicas",
        body: "The jerseys are fan versions, not official merchandise, and the site says so clearly.",
      },
    ],
    status: "Live, taking real payments through Paystack, and promoted on TikTok.",
  },

  shiftmed: {
    problem:
      "Hospitals often need cover for shifts at short notice, and filling them can take days of calls and paperwork. ShiftMed puts hospitals and healthcare professionals on one platform.",
    built: [
      "A searchable list of open roles",
      "Separate sign-up for hospitals and for healthcare professionals",
      "Hospitals posting open shifts, and professionals browsing and applying",
      "Answers to common questions about documents, approvals and selection",
    ],
    decisions: [],
    status: "Live.",
  },

  geng: {
    problem: "Geng Bistros is a burger kitchen in Accra. This is its ordering site.",
    built: ["Browsing the menu", "Building an order and checking out"],
    decisions: [],
    status: "In development.",
  },

  moodquest: {
    role: "Design and development.",
    problem:
      "Music apps are organised by genre and artist, but people often know how they feel before they know what they want to hear. MoodQuest starts from the mood.",
    built: [
      "Pick a mood and get matching tracks and artists",
      "Search across Spotify's catalogue",
      "Spotify sign-in handled on the server",
    ],
    decisions: [
      {
        title: "Keeping Spotify's secret on the server",
        body: "MoodQuest uses Spotify's client credentials, so the token request runs on the server in Next.js and the secret never reaches the browser.",
      },
      {
        title: "Adapting when Spotify changed its API",
        body: "Spotify deprecated the browse endpoints the first version relied on, so the app had to find another way to fetch tracks for each mood.",
      },
    ],
    status: "Built with Next.js 15 and the Spotify Web API.",
  },

  beats: {
    role: "Design and development. One of my first projects.",
    problem:
      "A full product page and storefront concept for the Beats Studio Pro, priced in cedis.",
    built: [
      "A product hero with price and an add-to-bag button",
      "A spec breakdown: connectivity, battery life, charging and microphone",
      "A colour picker with a price for each colourway",
      "Light and dark modes",
      "Delivery, pickup and returns information",
    ],
    decisions: [],
    status: "Live.",
  },
};
