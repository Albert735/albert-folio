# Albert Quaye — portfolio

Afro-futurist portfolio: a 3D gold Adinkrahene hero, illustrated device mockups for each project, a ⌘K command palette and a hidden terminal.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to /out
```

Deploy: push to GitHub and import the repo on Vercel (no settings needed). It's a static export, so Netlify or any static host works too.

## Edit your content

Everything is in **`lib/data.ts`**: name, tagline, bio, contact links, projects, experience and stack.

- **Swap in real screenshots:** each project's screen is illustrated in `components/Screens.tsx`. Drop a PNG in `public/shots/` and replace that project's screen with `<img src="/shots/raute.png" className="h-full w-full object-cover" alt="" />`. Phone frames are 9:19, browser frames are 16:10.
- **Add a project:** add an entry to `projects` in `lib/data.ts` and a screen in `Screens.tsx` (or reuse one).
- **Colours and fonts:** tokens are at the top of `app/globals.css`.

## Hidden stuff

- `⌘K` / `Ctrl+K`: command palette (jump to projects, copy email, résumé, socials)
- `` ` `` (backtick): terminal. Try `help`, `projects`, `open raute`, `sankofa`, `sudo hire albert`
- Hover your name in the hero to re-scramble it

## Stack

Next.js 15, React 19, Tailwind CSS 4, Framer Motion, React Three Fiber + drei, Lenis. Fonts: Unbounded, Bricolage Grotesque, JetBrains Mono (self-hosted via Fontsource).

Respects `prefers-reduced-motion`: the 3D scene holds still, smooth scroll and grain switch off.
