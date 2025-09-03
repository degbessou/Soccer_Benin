import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Components/App.jsx'
import './Components/Navbar.jsx'
import Navbar from './Components/Navbar.jsx'
import Hero from './Components/Hero.jsx'
import Footer from './Components/Footer.jsx'
import Cards from './Components/Cards.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<App />*/}
    <Navbar />
    <Hero />
    <Cards />
    <Footer />
  </StrictMode>
)
