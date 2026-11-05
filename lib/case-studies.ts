// Case studies for each project, shown at /work/<slug>.
// Written from the people's side: who it's for, what was hard for them,
// how the design responds, the value it brings, and what has been measured.
// Optional fields (role, evidence) are simply hidden when left out.

export type CaseStudy = {
  /** Your part in it */
  role?: string;
  /** Who the product is for */
  people: string;
  /** What was hard for them before */
  struggle: string[];
  /** Design choices, each tied to a human need */
  design: { title: string; body: string }[];
  /** What changes for people */
  value: string[];
  /** What has actually been measured so far, and what to measure next */
  evidence: { measured?: string; next: string };
};

export const caseStudies: Record<string, CaseStudy> = {
  raute: {
    role: "Research, design and development. My final-year project at the University of Ghana.",
    people:
      "Students at the University of Ghana, Legon, especially first-years and anyone heading to a part of campus they haven't been to before.",
    struggle: [
      "Halls, departments and offices are spread across a large campus, and many buildings look alike or go by several names.",
      "Signage is limited, so people rely on asking strangers, which is slow and can be awkward.",
      "Mobile data is expensive and coverage is patchy, so a map that needs a connection fails exactly when it's needed.",
    ],
    design: [
      {
        title: "Research before screens",
        body: "I surveyed 208 students before designing anything. 96% had gotten lost on campus, and offline navigation was the most-wanted feature. That shaped every decision that followed, starting with the choice of Mapbox for offline maps.",
      },
      {
        title: "Directions that keep up with you",
        body: "Turn-by-turn steps advance on their own as you walk, so you don't have to keep tapping the screen while moving. Your attention can stay on the path, not the phone.",
      },
      {
        title: "Landmarks people recognise",
        body: "3D buildings and building photos let students match what they see on screen to what's in front of them, which is how people actually orient themselves.",
      },
      {
        title: "Names the way students say them",
        body: "Search and Explore cover buildings, departments and places, with open or closed status, so a student can find a place by the name they've heard rather than its official one.",
      },
      {
        title: "Easy to reach, easy to read",
        body: "A floating tab bar within thumb reach, large tap targets, and light and dark themes from one design system keep the app usable one-handed and in bright sun or at night.",
      },
    ],
    value: [
      "Less time lost and less stress finding a lecture hall, office or exam venue.",
      "Independence: no need to ask around or rely on a friend who knows the way.",
      "Works on a tight data budget, so it helps the students who can least afford to be lost.",
      "Class reminders help students get to the right place at the right time, not just find it.",
    ],
    evidence: {
      measured: "A survey of 208 students: 96% had gotten lost on campus, and offline navigation was the top-rated feature.",
      next: "Usability testing with students on campus: time to find an unfamiliar building with and without Raute, wrong turns along the way, and a short satisfaction questionnaire such as the System Usability Scale.",
    },
  },

  crestline: {
    role: "Built the store for its owner, from design to payments.",
    people:
      "Football fans in Ghana buying jerseys online, a smaller group of buyers abroad, and the store owner who runs it.",
    struggle: [
      "Many people in Ghana don't use cards; mobile money is how they pay. A checkout that only takes cards turns them away at the last step.",
      "Buyers abroad shouldn't have to work out cedi conversions or guess what they'll be charged.",
      "Buying clothing online takes trust: people need to know exactly what they're getting before they pay.",
    ],
    design: [
      {
        title: "Pay the way you already pay",
        body: "Mobile money came first, then cards, in one Paystack checkout. Matching the payment method people use every day removes the biggest reason to abandon an order.",
      },
      {
        title: "One price, in your currency",
        body: "Buyers in Ghana and Nigeria see cedis; everyone else sees a US dollar price set per jersey, picked automatically from their location. No currency switch to get wrong, no mental arithmetic.",
      },
      {
        title: "Honest about what you're buying",
        body: "The jerseys are fan versions, not official merchandise, and the site says so plainly. Clear expectations build the trust that brings people back.",
      },
      {
        title: "No surprises at checkout",
        body: "Free delivery within Greater Accra above a set order value is stated up front, so the total doesn't change unexpectedly at the end.",
      },
    ],
    value: [
      "Fans can buy with the money they actually use, in a few taps.",
      "Buyers abroad see a fair price in a currency they understand.",
      "The owner gets a real store that takes payment directly, open around the clock.",
    ],
    evidence: {
      measured: "Live and taking real payments through Paystack, both mobile money and cards.",
      next: "Checkout completion rate by payment method, where in the flow people drop off, and how many buyers come back for a second order.",
    },
  },

  shiftmed: {
    people:
      "Hospitals that need to cover shifts, and doctors, nurses and other healthcare professionals looking for work.",
    struggle: [
      "When a shift opens at short notice, filling it often means rounds of phone calls and paperwork.",
      "Professionals looking for shifts have no single place to see what's open, and are unsure what documents or approvals they'll need.",
    ],
    design: [
      {
        title: "Two audiences, two clear paths",
        body: "Hospitals and professionals need different things, so each has its own sign-up and its own route through the site, without either wading through the other's options.",
      },
      {
        title: "Search first",
        body: "A role search sits at the centre of the home page, because finding the right shift is what professionals came to do.",
      },
      {
        title: "Answers before questions",
        body: "Common worries about documents, approvals and how people are selected are answered up front, which lowers the uncertainty that stops people applying.",
      },
    ],
    value: [
      "Hospitals can reach qualified people faster than working through a phone list.",
      "Professionals see open shifts in one place and know what's expected before they apply.",
    ],
    evidence: {
      next: "Time from a shift being posted to being filled, and how many professionals who start an application finish it.",
    },
  },

  geng: {
    people: "Hungry customers in Accra, and the Geng Bistros kitchen taking their orders.",
    struggle: [
      "Ordering by phone means busy lines, misheard orders and no clear view of the menu or prices.",
    ],
    design: [
      {
        title: "Built for phones on mobile data",
        body: "Most orders come from a phone, often on a mobile connection, so the site is designed for small screens and to load quickly.",
      },
      {
        title: "See it, build it, check out",
        body: "The menu, the order and checkout follow one simple path, so customers always know what's in their order and what it costs.",
      },
    ],
    value: [
      "Customers order at their own pace and get exactly what they chose.",
      "The kitchen receives clear, written orders instead of rushed phone calls.",
    ],
    evidence: {
      next: "Time to place an order, mistakes in orders, and how many orders come through the site versus the phone.",
    },
  },

  moodquest: {
    role: "Design and development.",
    people: "Anyone who knows how they feel but not what they want to listen to.",
    struggle: [
      "Music apps are organised by genre, artist and playlist, which assumes you already know what you want.",
      "Endless choice makes picking something harder, not easier.",
    ],
    design: [
      {
        title: "Start from the feeling",
        body: "Choosing a mood matches how people actually think about music in the moment. One tap replaces a search.",
      },
      {
        title: "Fewer, better choices",
        body: "A short set of mood options and a focused list of matching tracks reduce the effort of deciding.",
      },
      {
        title: "No sign-in to get started",
        body: "Spotify access is handled on the server, so people can explore straight away without creating an account or handing over their login.",
      },
    ],
    value: ["Less time scrolling, more time listening.", "A way to find music that fits the moment, not just the habit."],
    evidence: {
      next: "Time from opening the app to playing a track, and how often people keep a suggested song.",
    },
  },

  beats: {
    role: "Design and development. One of my first projects.",
    people: "Shoppers comparing headphones before they buy.",
    struggle: [
      "Product pages often bury the details people need, like battery life, charging and the price of each colour, under marketing.",
    ],
    design: [
      {
        title: "Specs you can scan",
        body: "Connectivity, battery, charging and microphone are laid out side by side, so the comparison takes seconds.",
      },
      {
        title: "Price with every option",
        body: "Each colourway shows its own price, so there's no surprise when you choose a different colour.",
      },
      {
        title: "Comfortable in any light",
        body: "Light and dark modes, plus delivery, pickup and returns information on the page, answer the last questions before buying.",
      },
    ],
    value: ["A clear, honest product page that helps people decide.", "Where I first practised designing for how people shop."],
    evidence: {
      next: "As a concept, the next step would be watching a few people use it to choose a colour and complete a purchase.",
    },
  },
};
