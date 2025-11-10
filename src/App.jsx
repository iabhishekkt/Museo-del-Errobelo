import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Collection from './components/Collection';
import LifeAtMuseum from './components/LifeAtMuseum';
import Display from './components/Display';
import FAQ from './components/FAQ';
import Ticketing from './components/Ticketing';
import Palace from './components/Palace';
import Membership from './components/Membership';
import ComingSoon from './components/ComingSoon';
import Boutique from './components/Boutique';
import FeaturedArtifacts from './components/FeaturedArtifacts';

import ThreeDGallery from './components/ThreeDGallery';

// In your <Routes> section:



// In your Routes:





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/life-at-museum" element={<LifeAtMuseum />} />
        <Route path="/display" element={<Display />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/ticketing" element={<Ticketing />} />
        <Route path="/palace" element={<Palace />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/featured" element={<FeaturedArtifacts />} />
        
        {/* Coming Soon pages */}
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/support" element={<ComingSoon />} />
        <Route path="/store" element={<ComingSoon />} />
        <Route path="/signin" element={<ComingSoon />} />
        <Route path="/language" element={<ComingSoon />} />
        <Route path="/search" element={<ComingSoon />} />
        <Route path="/about" element={<ComingSoon />} />
        <Route path="/rules" element={<ComingSoon />} />
        <Route path="/loans" element={<ComingSoon />} />
        <Route path="/corpus" element={<ThreeDGallery />} />
        <Route path="/donate" element={<ComingSoon />} />
        <Route path="/press" element={<ComingSoon />} />
        <Route path="/contact" element={<ComingSoon />} />
        <Route path="/feedback" element={<ComingSoon />} />
        <Route path="/jobs" element={<ComingSoon />} />
        <Route path="/events-shoots" element={<ComingSoon />} />
        <Route path="/legal" element={<ComingSoon />} />
        <Route path="/privacy" element={<ComingSoon />} />
        <Route path="/cookies" element={<ComingSoon />} />
        <Route path="/credits" element={<ComingSoon />} />
        <Route path="/copyrights" element={<FeaturedArtifacts />} />
        <Route path="/database" element={<ComingSoon />} />
        <Route path="/journey" element={<ComingSoon />} />
        <Route path="/explore" element={<Collection />} />
        <Route path="/errobelo-plus" element={<ComingSoon />} />
<Route path="/boutique" element={<Boutique />} />
        <Route path="/3d-gallery" element={<ThreeDGallery />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
