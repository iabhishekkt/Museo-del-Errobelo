import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';


// Import images
import collectionHeader from '../assets/collection_header.jpg';
import socrates from '../assets/Socrates.jfif';

function Collection() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleComingSoon = (e) => {
    e.preventDefault();
    setShowComingSoon(true);
  };

  return (
    <div className="bg-black font-playfair">
      {/* Navbar Component */}
      <Navbar onLoginClick={() => setShowLoginModal(true)} />

      {/* Main Content - Starts below navbar */}
      <div className="pt-28">
        {/* Hero Section */}
        <section className="relative w-full h-[300px]">
          <img src={collectionHeader} alt="Collections" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-10 left-12">
            <h2 className="text-white text-5xl font-extralight tracking-wide">COLLECTIONS</h2>
          </div>
        </section>

        {/* Collections Database Section */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          {/* Card */}
          <div className="flex items-center justify-between bg-black border border-white/10 shadow-2xl rounded-lg p-8 mb-12 hover:border-museum-gold/30 transition-all">
            {/* Left: Image + Title */}
            <div className="flex items-center space-x-6">
              <img src={socrates} alt="Socrates" className="w-20 h-20 rounded object-cover" />
              <h3 className="text-white text-xl font-normal">The Collections database</h3>
            </div>

            {/* Right: Arrow button */}
            <Link to="/display" className="inline-flex items-center justify-center w-12 h-12 border border-white/20 rounded-full hover:bg-white/10 hover:border-museum-gold transition-all">
              <span className="text-2xl text-white">→</span>
            </Link>
          </div>

          {/* Text Content */}
          <div className="mx-8 space-y-8 leading-relaxed text-white/90 text-lg">
            <p>
              The Errobelo's collections are an invitation to travel – a celebration of beauty in all its forms and guises, transcending classification. At the Errobelo, a small, everyday Egyptian chair is just as much a masterpiece as the most iconic works of the Italian Renaissance.
            </p>
            <p>
              The diversity of the Errobelo's collections and the sheer history they represent are what make our museum unique: here, the past is examined, questioned and discussed, lending weight and meaning to the present. Like an ever-updated encyclopaedia, the Errobelo encourages visitors to draw connections between its various collections, in order to see them in a new light and in new contexts. To move easily from one civilisation or artistic technique to another is to experience the joy of becoming a nomad, a wanderer, an explorer.
            </p>
            <p>
              With the online <Link to="/display" className="text-museum-gold hover:underline transition-colors">Museo del Errobelo Collections database</Link>, everyone can share in this journey of discovery and rediscovery. It contains over 500,000 works from the Museo del Errobelo and the Musée National Eugène-Delacroix spanning a variety of places in France or abroad. Each entry includes the work's current location, whether it be on display in the Errobelo or the Musée Delacroix.
            </p>
          </div>
        </section>
      </div>

      {/* Coming Soon Popup */}
      {showComingSoon && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-black rounded-lg p-8 max-w-sm w-full border border-museum-gold shadow-2xl">
            <button
              onClick={() => setShowComingSoon(false)}
              className="absolute top-3 right-3 text-white bg-black/60 hover:bg-black/80 rounded-full p-1.5 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-museum-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-light text-white mb-3">Coming Soon</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                This feature is currently under development.
              </p>
              
              <button
                onClick={() => setShowComingSoon(false)}
                className="bg-museum-gold text-black px-6 py-2 rounded-full font-medium hover:bg-museum-gold/90 transition-all duration-300 text-sm"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-gray-400 pt-16 px-6 md:px-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-12">
          <div>
            <h4 className="uppercase text-white text-xs font-semibold tracking-widest mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" onClick={handleComingSoon} className="hover:underline hover:text-white transition-colors">The Errobelo in France and around the world</a></li>
              <li><a href="#" onClick={handleComingSoon} className="hover:underline hover:text-white transition-colors">Visitor rules</a></li>
              <li><a href="#" onClick={handleComingSoon} className="hover:underline hover:text-white transition-colors">Loans and long-term loans</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-white text-xs font-semibold tracking-widest mb-4">Our Websites</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/ticketing" className="hover:underline hover:text-white transition-colors">Online ticketing service</Link></li>
              <li><Link to="/boutique" className="hover:underline hover:text-white transition-colors">Online Boutique</Link></li>
              <li><Link to="/collection" className="hover:underline hover:text-white transition-colors">Collection</Link></li>
              <li><Link to="/3d-gallery" className="hover:underline hover:text-white transition-colors">3D Gallery</Link></li>
              <li><a href="#" onClick={handleComingSoon} className="hover:underline hover:text-white transition-colors">Donate</a></li>
              <li><a href="#" onClick={handleComingSoon} className="hover:underline hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-white text-xs font-semibold tracking-widest mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faqs" className="hover:underline hover:text-white transition-colors">FAQ</Link></li>
              <li><a href="#" onClick={handleComingSoon} className="hover:underline hover:text-white transition-colors">Contact us</a></li>
              <li><a href="#" onClick={handleComingSoon} className="hover:underline hover:text-white transition-colors">Give us your feedback!</a></li>
              <li><a href="#" onClick={handleComingSoon} className="hover:underline hover:text-white transition-colors">Jobs (in French)</a></li>
              <li><a href="#" onClick={handleComingSoon} className="hover:underline hover:text-white transition-colors">Private event and film shoots</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <h4 className="uppercase text-white text-xs font-semibold tracking-widest mb-4">Follow Us</h4>
              <div className="flex gap-4 mb-6">
                {['f', 'ig', 'x', 'yt', 'p', 'in'].map((social) => (
                  <a 
                    key={social}
                    href="#"
                    onClick={handleComingSoon}
                    className="rounded-full border border-gray-600 w-10 h-10 flex items-center justify-center hover:bg-gray-800 hover:border-museum-gold transition-all"
                  >
                    <span className="text-white text-sm">{social}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="uppercase text-white text-xs font-semibold tracking-widest mb-4">Membership</h4>
              <div className="h-8 mb-3 bg-gray-700 rounded"></div>
              <Link to="/membership" className="text-white underline text-sm hover:text-museum-gold transition-colors">
                Become a Friend of the Errobelo (in French) →
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center text-xs text-gray-400 py-6">
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            <a href="#" onClick={handleComingSoon} className="hover:underline hover:text-white transition-colors">Legal Notice</a>
            <a href="#" onClick={handleComingSoon} className="hover:underline hover:text-white transition-colors">Privacy policy</a>
            <a href="#" onClick={handleComingSoon} className="hover:underline hover:text-white transition-colors">Cookies</a>
            <a href="#" onClick={handleComingSoon} className="hover:underline hover:text-white transition-colors">Credits</a>
            <a href="#" onClick={handleComingSoon} className="hover:underline hover:text-white transition-colors">Copyrights</a>
          </div>
          <p className="mt-4">© 2025 Museo del Errobelo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Collection;
