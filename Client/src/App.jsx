import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home";
import Mercato from "./Pages/Mercato";
import Page404 from "./Pages/Page404";




function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" Component={Home} />
                <Route exact path="/Mercato" Component={Mercato} />
                <Route exact path="/Page404" Component={Page404} />
            </Routes>
        </Router>
    );
}

export default App;