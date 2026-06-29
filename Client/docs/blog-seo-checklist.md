# Blog launch — SEO checklist

A practical checklist for when BencoFoot adds real blog posts (substantial articles,
not the brief homepage news summaries). It reuses the SEO setup already in place
(vite-react-ssg prerendering, lowercase slugs, react-helmet via `<Head>`, JSON-LD).

> **Why this is separate from the news feed:** the homepage news items are 1–3 sentence
> summaries. They intentionally have **no individual URLs** — turning 400+ blurbs into
> indexable pages would be thin content / index bloat. Blog posts are the opposite:
> standalone, substantial, meant to be indexed, shared, and cited.

---

## 1. URLs & routing

- [ ] Use clean lowercase slugs: `/blog/{slug}` (or `/actualites/{slug}`), e.g. `/blog/can-2027-analyse-groupe-benin`.
- [ ] Add a **blog index** route (`/blog`) listing posts (paginated), prerendered.
- [ ] Add the dynamic post route in `src/App.jsx` with **`getStaticPaths`** returning all post slugs (from Supabase) so each post is **prerendered to static HTML** at build time:
  ```js
  {
    path: "blog/:slug",
    lazy: page(() => import("./Pages/BlogPost")),
    getStaticPaths: async () => {
      const { data } = await supabase.from("posts").select("slug")
      return (data ?? []).map(p => `blog/${p.slug}`)
    },
  }
  ```
  > Unlike the news feed (client-rendered), blog post **content must be in the initial HTML**.
  > Load the post body during render (server-safe data) so prerendering captures it.
- [ ] Keep `cleanUrls` behavior — no trailing slashes, no `.html`.
- [ ] Add the blog index + each post URL to `public/sitemap.xml` (or generate the sitemap from the post list at build time — recommended once volume grows).

## 2. Per-post metadata (`<Head>`)

Each post sets its own, like the existing pages:

- [ ] Unique `<title>` (≈50–60 chars, include the primary keyword + `| BencoFoot`).
- [ ] Unique `<meta name="description">` (≈140–160 chars).
- [ ] Self-referencing `<link rel="canonical" href="https://www.bencofoot.com/blog/{slug}">`.
- [ ] Per-post **Open Graph + Twitter** overrides (title, description, **and a real per-post `og:image`** — 1200×630). This is where shareable cards matter, unlike the sitewide default.

## 3. Structured data (per post)

- [ ] `BlogPosting` (or `NewsArticle` for timely news) JSON-LD via `<Head>`:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "…",
    "description": "…",
    "image": "https://www.bencofoot.com/…1200x630.jpg",
    "datePublished": "2026-07-01T09:00:00+01:00",
    "dateModified": "2026-07-02T10:00:00+01:00",
    "author": { "@type": "Person", "name": "Nom de l'auteur" },
    "publisher": {
      "@type": "Organization",
      "name": "BencoFoot",
      "logo": { "@type": "ImageObject", "url": "https://www.bencofoot.com/logo.png" }
    },
    "mainEntityOfPage": "https://www.bencofoot.com/blog/{slug}"
  }
  ```
- [ ] Add `BreadcrumbList` JSON-LD (Accueil › Blog › Titre) on posts.
- [ ] On the blog index, an `ItemList` of posts (this time **with `url` per item**, since posts have real URLs).

## 4. E-E-A-T (this is where authorship finally pays off)

- [ ] **Real author bylines** on every post (name + ideally a short bio/credentials).
- [ ] Author pages (`/blog/auteur/{slug}`) or at least a visible author block, with `author` wired into the schema.
- [ ] Visible **publish + updated dates** (machine-readable in schema).
- [ ] Link posts to/from the relevant evergreen pages (e.g. a Ligue 1 recap links to `/ligue-1`) — internal linking.

## 5. Content & on-page

- [ ] One clear `<h1>` per post = the title; logical `<h2>/<h3>` structure.
- [ ] Descriptive `alt` text on every image; `loading="lazy"` on below-the-fold images; compress to ≤~200 KB (the existing image pipeline conventions).
- [ ] Fact-dense lead paragraph (good for featured snippets **and** AI citations).
- [ ] Internal links to related posts and to the league/team pages.

## 6. Crawl, index & AI

- [ ] Confirm posts return **200** and are in the sitemap; submit the updated sitemap in Search Console.
- [ ] Add the blog index + a few cornerstone posts to **`public/llms.txt`** so AI crawlers find them.
- [ ] After publishing a cornerstone post, use **URL Inspection → Request indexing** in Search Console (sparingly).
- [ ] Make sure draft/unpublished posts are **not** routed/prerendered (no thin or empty pages shipped).

## 7. Guardrails (avoid the thin-content trap)

- [ ] Don't auto-generate post pages from short blurbs — keep the news feed as a feed.
- [ ] Minimum substance bar per post (e.g. 300+ words of original analysis) before it gets its own URL.
- [ ] Avoid tag/category pages that list one item each (index bloat); only create archive pages that hold real volume.

---

### Quick verification after launch (mirror the existing checks)

```bash
# content is in the HTML (not just a JS shell):
curl -s https://www.bencofoot.com/blog/<slug> | grep -c "<h1"

# canonical + schema present:
curl -s https://www.bencofoot.com/blog/<slug> | grep -E 'rel="canonical"|BlogPosting'

# post is reachable (200) and listed in sitemap:
curl -sI https://www.bencofoot.com/blog/<slug> | head -1
curl -s  https://www.bencofoot.com/sitemap.xml | grep -c "/blog/<slug>"
```
