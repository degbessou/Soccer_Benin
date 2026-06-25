import React from "react";
import { Outlet } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { Analytics } from '@vercel/analytics/react';
import Home from "./Pages/Home";
import Mercato from "./Pages/Mercato";
import Page404 from "./Pages/Page404";
import Championship from "./Pages/Championship";
import NationalTeam from "./Pages/NationalTeam";
import WomenNationalTeam from "./Pages/WomenNationalTeam";
import JuniorNationalTeam from "./Pages/JuniorNationalTeam";
import LeagueOne from "./Pages/LeagueOne";
import LeagueTwo from "./Pages/LeagueTwo";
import LeagueThree from "./Pages/LeagueThree";
import Careers from "./Pages/Careers";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Credits from "./Pages/Credits";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import DivisionOne from "./Pages/DivisionOne";
import DivisionTwo from "./Pages/DivisionTwo";
import BeninCupMen from "./Pages/BeninCupMen";
import Live from "./Pages/Live";
import WatchPage from "./Pages/WatchPage";

function Layout() {
    return (
        <>
            {/* Default title/description for every route. Pages that render their
                own <Head> override these (react-helmet "last wins"). */}
            <Head>
                <html lang="fr" />
                <title>BencoFoot – Le média du football béninois</title>
                <meta
                    name="description"
                    content="Toute l’actualité du football béninois sur BencoFoot : matchs, résultats, classements, analyses et compétitions locales. Le football du Bénin à portée de clic."
                />
            </Head>
            <Outlet />
            <Analytics />
        </>
    );
}

// Route records consumed by vite-react-ssg (static prerendering) and the
// client router. Each non-dynamic path below is rendered to static HTML at
// build time; dynamic routes hydrate on the client.
export const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, Component: Home },
            { path: "Mercato", Component: Mercato },
            { path: "Championship", Component: Championship },
            { path: "NationalTeam", Component: NationalTeam },
            { path: "WomenNationalTeam", Component: WomenNationalTeam },
            { path: "JuniorNationalTeam", Component: JuniorNationalTeam },
            { path: "LeagueOne", Component: LeagueOne },
            { path: "LeagueTwo", Component: LeagueTwo },
            { path: "LeagueThree", Component: LeagueThree },
            { path: "DivisionOne", Component: DivisionOne },
            { path: "DivisionTwo", Component: DivisionTwo },
            { path: "BeninCupMen", Component: BeninCupMen },
            { path: "Live", Component: Live },
            { path: "Careers", Component: Careers },
            { path: "About", Component: About },
            { path: "Contact", Component: Contact },
            { path: "Credits", Component: Credits },
            { path: "PrivacyPolicy", Component: PrivacyPolicy },
            // Dynamic route: not prerendered (no params known at build), client-only.
            { path: "live/:slug", Component: WatchPage, getStaticPaths: () => [] },
            { path: "Page404", Component: Page404 },
            { path: "*", Component: Page404 },
        ],
    },
];

export default routes;
