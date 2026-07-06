import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { FavoritesProvider } from './context/FavoritesContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Listings } from './pages/Listings';
import { PropertyDetail } from './pages/PropertyDetail';
import { About } from './pages/About';
import { Agents } from './pages/Agents';
import { AgentProfile } from './pages/AgentProfile';
import { Neighborhoods } from './pages/Neighborhoods';
import { NeighborhoodDetail } from './pages/NeighborhoodDetail';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Contact } from './pages/Contact';
import { Favorites } from './pages/Favorites';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<PropertyDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/agents/:id" element={<AgentProfile />} />
        <Route path="/neighborhoods" element={<Neighborhoods />} />
        <Route path="/neighborhoods/:slug" element={<NeighborhoodDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <ScrollToTop />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;
