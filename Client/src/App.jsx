import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home";
import Mercato from "./Pages/Mercato";
import Page404 from "./Pages/Page404";
import Championship from "./Pages/Championship";
import NationalTeam from "./Pages/NationalTeam";
import WomenNationalTeam from "./Pages/WomenNationalTeam";
import JuniorNationalTeam from "./Pages/JuniorNationalTeam";
import LeagueOne from "./Pages/LeagueOne";
import LeagueTwo from "./Pages/LeagueTwo";
import Careers from "./Pages/Careers";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Credits from "./Pages/Credits";




function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" Component={Home} />
                <Route exact path="/Mercato" Component={Mercato} />
                <Route exact path="/Page404" Component={Page404} />
                <Route exact path="/Championship" Component={Championship} />
                <Route exact path="/NationalTeam" Component={NationalTeam} />
                <Route exact path="/WomenNationalTeam" Component={WomenNationalTeam} />
                <Route exact path="/JuniorNationalTeam" Component={JuniorNationalTeam} />
                <Route exact path="/LeagueOne" Component={LeagueOne} />
                <Route exact path="/LeagueTwo" Component={LeagueTwo} />
                <Route exact path="/Careers" Component={Careers} />
                <Route exact path="/About" Component={About} />
                <Route exact path="/Contact" Component={Contact} />
                <Route exact path="/Credits" Component={Credits} />
            </Routes>
        </Router>
    );
}

export default App;