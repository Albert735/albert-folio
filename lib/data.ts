// Everything you'd want to edit lives in this file.

export const me = {
  name: "Albert Quaye",
  fullName: "Quaye Andrews Albert Awuley",
  handle: "Jaytee",
  role: "Frontend & mobile engineer",
  // Martin Luther King Jr., "The Future of Integration", Oberlin College, 22 October 1964
  tagline: "The time is always right to do what is right.",
  taglineCredit: "Martin Luther King Jr.",
  intro:
    "I design and build web and mobile products for people in Accra and everywhere else: campus maps, jersey stores, medical staffing, music discovery. Interfaces with rhythm, engineered to ship.",
  location: "Accra, Ghana",
  email: "03jayteee@gmail.com",
  phone: "+233 55 125 8689",
  phoneHref: "tel:+233551258689",
  resume: "https://drive.google.com/file/d/19j-NF3ghVJ7MIUMJxCj163GvNxjh2MKY/view?usp=share_link",
  socials: [
    { label: "GitHub", href: "https://github.com/Albert735" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/albert-quaye-3a39682b0/" },
    { label: "X", href: "https://x.com/_Jaytee03" },
  ],
};

export type Device = "phone" | "browser";

export type Project = {
  slug: string;
  name: string;
  summary: string;
  detail: string;
  stack: string[];
  status: "Live" | "Shipping" | "In development";
  device: Device;
  live?: string;
  repo?: string;
  /** Colours for the illustrated mockup inside the device frame */
  theme: { bg: string; fg: string; accent: string; soft: string };
  highlight?: { value: string; label: string };
};

export const projects: Project[] = [
  {
    slug: "raute",
    name: "Raute",
    summary: "Turn-by-turn navigation for the University of Ghana campus.",
    detail:
      "My final-year project. Real routing with live GPS step advancement, 3D building extrusion, offline maps, building details and class reminders, all wrapped in a floating glass tab bar.",
    stack: ["React Native", "Expo Router", "TypeScript", "Mapbox", "Firebase", "NativeWind"],
    status: "In development",
    device: "phone",
    repo: "https://github.com/Albert735/athas-v1",
    theme: { bg: "#143642", fg: "#DAD2D8", accent: "#EC9A29", soft: "#0F8B8D" },
    highlight: { value: "96%", label: "of 208 students surveyed had gotten lost on campus" },
  },
  {
    slug: "crestline",
    name: "Crestline Kits",
    summary: "A real football jersey store, taking real payments.",
    detail:
      "Full-stack e-commerce with mobile money and card checkout through Paystack, location-aware pricing for buyers outside Ghana and Nigeria, and a stock model that mixes in-hand and made-to-order kits.",
    stack: ["Next.js", "TypeScript", "Paystack", "Mobile Money", "Tailwind"],
    status: "Live",
    device: "browser",
    live: "https://crestline-kits.vercel.app",
    repo: "https://github.com/Cave-org/crestline-kits",
    theme: { bg: "#0E1116", fg: "#F4F4F0", accent: "#E8FF47", soft: "#1F2633" },
  },
  {
    slug: "shiftmed",
    name: "ShiftMed",
    summary: "Connecting hospitals with locum doctors, shift by shift.",
    detail:
      "A staffing platform where hospitals post open shifts and qualified healthcare professionals browse and apply in minutes, with role listings, sign-up flows for both sides and real-time updates.",
    stack: ["Next.js", "React", "Tailwind"],
    status: "Live",
    device: "browser",
    live: "https://shiftmed.netlify.app",
    repo: "https://github.com/omarbagna/shiftmed",
    theme: { bg: "#F5F8FF", fg: "#0D1B3E", accent: "#2563EB", soft: "#DCE6FF" },
  },
  {
    slug: "geng",
    name: "Geng Bistros",
    summary: "Order burgers from an Accra kitchen without the phone tag.",
    detail:
      "An ordering experience for a burger kitchen in Accra: browse the menu, build your order and check out, designed to be fast on a mobile connection.",
    stack: ["React", "TypeScript", "Tailwind"],
    status: "In development",
    device: "phone",
    repo: "https://github.com/Mersharch/Geng-Bistros",
    theme: { bg: "#1B0F0A", fg: "#FFF3E2", accent: "#FF6A1A", soft: "#3A1E12" },
  },
  {
    slug: "moodquest",
    name: "MoodQuest",
    summary: "Tell it how you feel. It finds the music.",
    detail:
      "Mood-based music discovery on top of the Spotify API. Pick a feeling and get tracks and artists that match it, with server-side auth and dynamic routes in Next.js 15.",
    stack: ["Next.js 15", "Spotify API", "Tailwind"],
    status: "Live",
    device: "browser",
    repo: "https://github.com/Albert735/mood-quest",
    theme: { bg: "#0B0A12", fg: "#F1EEFF", accent: "#1ED760", soft: "#1C1A2B" },
  },
  {
    slug: "beats",
    name: "Beats",
    summary: "A product store for over-ear headphones, priced in cedis.",
    detail:
      "One of my first projects: a full landing page and storefront concept for the Beats Studio Pro. Spec breakdown, colourway picker with live prices, add-to-bag, delivery and returns info, plus a light and dark mode, all built from scratch in React.",
    stack: ["React", "Tailwind CSS", "JavaScript"],
    status: "Live",
    device: "browser",
    live: "https://beats-roan.vercel.app",
    theme: { bg: "#0E0E0E", fg: "#FFFFFF", accent: "#DF1D3C", soft: "#1A1A1A" },
  },
];

export const experience = [
  {
    org: "Rx Health Info Systems",
    role: "Junior Developer",
    period: "2024 – 2025",
    place: "Accra",
    note:
      "Came back three times. Three internship stints building and shipping features on health information products alongside the core engineering team.",
    stints: 3,
  },
  {
    org: "University of Ghana, Legon",
    role: "BSc Information Technology",
    period: "Graduated",
    place: "Legon",
    note:
      "Final-year project: Raute, a campus navigation app shaped by a 208-person student survey.",
    stints: 0,
  },
];

export const stack = {
  "Build for the web": ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"],
  "Build for your pocket": ["React Native", "Expo", "Expo Router", "NativeWind", "Reanimated", "Mapbox"],
  "Make it work": ["Node.js", "Express", "MongoDB", "Firebase", "Paystack", "REST APIs"],
  "Make it beautiful": ["Figma", "Design systems", "Prototyping", "Motion design"],
  "Keep it moving": ["Zustand", "React Query", "React Hook Form", "Git", "Vercel", "Netlify"],
};

/** Songs for the now-playing card: official YouTube uploads, played in this order */
export const tracks = [
  { id: "nbr3ck1FjlU", title: "Vuli Ndlela", artist: "Brenda Fassie", year: "1997" },
  { id: "FoSUuakRCok", title: "Woyaya", artist: "Osibisa", year: "1971" },
  { id: "vnoVahV0Gpc", title: "Umqombothi", artist: "Yvonne Chaka Chaka", year: "1988" },
  { id: "HNBCVM4KbUM", title: "Three Little Birds", artist: "Bob Marley & The Wailers", year: "1977" },
  { id: "1ti2YCFgCoI", title: "Could You Be Loved", artist: "Bob Marley & The Wailers", year: "1980" },
  { id: "yv5xonFSC4c", title: "Redemption Song", artist: "Bob Marley & The Wailers", year: "1980" },
  { id: "IN0KkGeEURw", title: "One Love", artist: "Bob Marley & The Wailers", year: "1977" },
  { id: "IT8XvzIfi4U", title: "No Woman, No Cry", artist: "Bob Marley & The Wailers", year: "1975" },
];

export const proverb = {
  twi: "Se wo were fi na wosankofa a yenkyi.",
  en: "It is not wrong to go back for what you forgot.",
  symbol: "Sankofa",
};
