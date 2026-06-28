import React from "react";
import { Outlet } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { Analytics } from '@vercel/analytics/react';

const SITE_URL = "https://www.bencofoot.com";
const SITE_NAME = "BencoFoot";
const DEFAULT_TITLE = "BencoFoot – Le média du football béninois";
const DEFAULT_DESCRIPTION =
    "Toute l’actualité du football béninois sur BencoFoot : matchs, résultats, classements, analyses et compétitions locales. Le football du Bénin à portée de clic.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

// Sitewide structured data. Emitted on every prerendered page.
const ORG_JSONLD = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo.png`,
    description: DEFAULT_DESCRIPTION,
});
const WEBSITE_JSONLD = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: "fr",
});

function Layout() {
    return (
        <>
            {/* Sitewide defaults. Pages that render their own <Head> override
                the title/description/canonical (react-helmet "last wins"); the
                Open Graph/Twitter defaults and JSON-LD below apply everywhere. */}
            <Head>
                <html lang="fr" />
                <title>{DEFAULT_TITLE}</title>
                <meta name="description" content={DEFAULT_DESCRIPTION} />

                {/* Open Graph (social previews) */}
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content={SITE_NAME} />
                <meta property="og:locale" content="fr_FR" />
                <meta property="og:title" content={DEFAULT_TITLE} />
                <meta property="og:description" content={DEFAULT_DESCRIPTION} />
                <meta property="og:url" content={`${SITE_URL}/`} />
                <meta property="og:image" content={DEFAULT_OG_IMAGE} />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={DEFAULT_TITLE} />
                <meta name="twitter:description" content={DEFAULT_DESCRIPTION} />
                <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

                {/* Structured data */}
                <script type="application/ld+json">{ORG_JSONLD}</script>
                <script type="application/ld+json">{WEBSITE_JSONLD}</script>
            </Head>
            <Outlet />
            <Analytics />
        </>
    );
}

// Each page is loaded with `lazy` so it ships as its own chunk (code-splitting):
// visiting one route no longer downloads every other page. vite-react-ssg awaits
// these during the build to prerender each route to static HTML; the client
// loads each chunk on demand. Pages export a default component, mapped to the
// `Component` shape React Router's `lazy` expects.
const page = (loader) => () => loader().then((m) => ({ Component: m.default }));

// Route records consumed by vite-react-ssg (static prerendering) and the
// client router. Each non-dynamic path below is rendered to static HTML at
// build time; dynamic routes hydrate on the client.
export const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, lazy: page(() => import("./Pages/Home")) },
            { path: "Mercato", lazy: page(() => import("./Pages/Mercato")) },
            { path: "Championship", lazy: page(() => import("./Pages/Championship")) },
            { path: "NationalTeam", lazy: page(() => import("./Pages/NationalTeam")) },
            { path: "WomenNationalTeam", lazy: page(() => import("./Pages/WomenNationalTeam")) },
            { path: "JuniorNationalTeam", lazy: page(() => import("./Pages/JuniorNationalTeam")) },
            { path: "LeagueOne", lazy: page(() => import("./Pages/LeagueOne")) },
            { path: "LeagueTwo", lazy: page(() => import("./Pages/LeagueTwo")) },
            { path: "LeagueThree", lazy: page(() => import("./Pages/LeagueThree")) },
            { path: "DivisionOne", lazy: page(() => import("./Pages/DivisionOne")) },
            { path: "DivisionTwo", lazy: page(() => import("./Pages/DivisionTwo")) },
            { path: "BeninCupMen", lazy: page(() => import("./Pages/BeninCupMen")) },
            { path: "Live", lazy: page(() => import("./Pages/Live")) },
            { path: "Careers", lazy: page(() => import("./Pages/Careers")) },
            { path: "About", lazy: page(() => import("./Pages/About")) },
            { path: "Contact", lazy: page(() => import("./Pages/Contact")) },
            { path: "Credits", lazy: page(() => import("./Pages/Credits")) },
            { path: "PrivacyPolicy", lazy: page(() => import("./Pages/PrivacyPolicy")) },
            // Dynamic route: not prerendered (no params known at build), client-only.
            { path: "live/:slug", lazy: page(() => import("./Pages/WatchPage")), getStaticPaths: () => [] },
            { path: "Page404", lazy: page(() => import("./Pages/Page404")) },
            { path: "*", lazy: page(() => import("./Pages/Page404")) },
        ],
    },
];

export default routes;
