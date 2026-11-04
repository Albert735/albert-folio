// Blog posts. Each post's text lives in content/blog/<slug>.md (plain Markdown).
// To add a post: add an entry here and a matching .md file.

export type Post = {
  slug: string;
  title: string;
  /** The year the story turns on. The blog index is laid out as a timeline by this year. */
  year: string;
  /** One line under the year on cards */
  kicker: string;
  excerpt: string;
  /** ISO date the post was published on this site */
  date: string;
  sources: { label: string; href: string }[];
};

export const posts: Post[] = [
  {
    slug: "emancipation-day",
    title: "Why Ghana remembers the first of August",
    year: "1834",
    kicker: "Emancipation",
    excerpt:
      "Slavery in the British Caribbean ended on paper on 1 August 1834. Ghana, home to the forts the trade ran through, has marked the day since 1998.",
    date: "2026-11-04",
    sources: [
      { label: "Emancipation Day, Ghana Tourism Authority", href: "https://visitghana.com/?p=5308" },
      { label: "How two ancestors from the US and Jamaica started the emancipation journey to Ghana, Face2Face Africa", href: "https://face2faceafrica.com/article/how-two-slave-ancestors-from-the-u-s-and-jamaica-started-the-emancipation-journey-to-ghana-in-1998/amp" },
    ],
  },
  {
    slug: "kwame-nkrumah",
    title: "Kwame Nkrumah and the night of 6 March",
    year: "1957",
    kicker: "Kwame Nkrumah",
    excerpt:
      "He led the Gold Coast out of British rule and tried to pull a whole continent along with it. The story is bigger, and messier, than the statue.",
    date: "2026-11-04",
    sources: [
      { label: "Kwame Nkrumah, Encyclopaedia Britannica", href: "https://www.britannica.com/biography/Kwame-Nkrumah" },
      { label: "Biography of Osagyefo Dr Kwame Nkrumah, Kwame Nkrumah Memorial Park", href: "https://knmp.gov.gh/new/biography-of-osagyefo-dr-kwame-nkrumah/" },
    ],
  },
  {
    slug: "martin-luther-king-jr",
    title: "Martin Luther King Jr. at 26, 34 and 39",
    year: "1963",
    kicker: "Martin Luther King Jr.",
    excerpt:
      "Three ages, three turning points, and a trip to Accra most people forget he made.",
    date: "2026-11-04",
    sources: [
      { label: "Dr. Martin Luther King, Jr. at Oberlin, Oberlin College", href: "https://isis2.cc.oberlin.edu/external/EOG/BlackHistoryMonth/MLK/MLKmainpage.html" },
      { label: "The Nobel Peace Prize 1964, NobelPrize.org", href: "https://www.nobelprize.org/prizes/peace/1964/king/facts/" },
    ],
  },
  {
    slug: "nelson-mandela",
    title: "Nelson Mandela: 27 years, then five",
    year: "1990",
    kicker: "Nelson Mandela",
    excerpt:
      "He spent 27 years in prison and then just five as president, and chose to leave. Both numbers matter.",
    date: "2026-11-04",
    sources: [
      { label: "Nelson Mandela, NobelPrize.org", href: "https://www.nobelprize.org/prizes/peace/1993/mandela/speedread/" },
    ],
  },
  {
    slug: "barack-obama",
    title: "What Barack Obama told Ghana's Parliament",
    year: "2009",
    kicker: "Barack Obama",
    excerpt:
      "His first stop in sub-Saharan Africa as president was Accra. The speech he gave there is still quoted on this side of the Atlantic.",
    date: "2026-11-04",
    sources: [
      { label: "Remarks to the Ghanaian Parliament in Accra, The American Presidency Project", href: "https://www.presidency.ucsb.edu/documents/remarks-the-ghanaian-parliament-accra" },
      { label: "President Obama tells Africans, NPR", href: "https://www.npr.org/sections/thetwo-way/2009/07/president_obama_tells_africans.html" },
      { label: "Obama ends Ghana visit with trip to former slave center, History News Network", href: "https://www.historynewsnetwork.org/article/100055" },
    ],
  },
  {
    slug: "black-lives-matter",
    title: "Black Lives Matter: a hashtag, a movement, an argument",
    year: "2013",
    kicker: "Black Lives Matter",
    excerpt:
      "Three words written after a verdict in Florida became one of the largest protest movements in modern history, and a fierce debate.",
    date: "2026-11-04",
    sources: [
      { label: "Black Lives Matter Global Network Foundation, Wikipedia", href: "https://en.wikipedia.org/wiki/Black_Lives_Matter_Global_Network_Foundation" },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
