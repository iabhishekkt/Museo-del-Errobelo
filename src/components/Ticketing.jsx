import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import image
import collectionmain1 from '../assets/collectionmain1.png';

function Ticketing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navbar scroll effect
  useEffect(() => {
    let lastScroll = 0;
    const navbar = document.getElementById('mainNavbar');
    
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (navbar) {
        if (currentScroll > lastScroll && currentScroll > 100) {
          navbar.classList.add('-translate-y-full');
        } else {
          navbar.classList.remove('-translate-y-full');
        }
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black text-white font-playfair">
      {/* Fixed Navbar */}
      <nav id="mainNavbar" className="fixed w-full z-50 h-28 top-0 transform translate-y-0 transition-transform duration-500">
        <div className="bg-black h-24">
          <div className="container mx-auto px-8">
            <div className="flex items-center justify-between h-24">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white"
              >
                <div className="w-6 h-0.5 bg-white mb-1.5"></div>
                <div className="w-6 h-0.5 bg-white mb-1.5"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </button>

              <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <Link to="/" className="font-semibold text-3xl text-white text-center tracking-wide">
                  MUSEO DEL ERROBELO
                </Link>
                <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-48 md:w-96 my-2"></div>
              </div>

              <div className="hidden md:flex items-center justify-between w-full">
                <div className="flex items-center gap-8 text-white/80">
                  <button className="hover:text-museum-gold transition-colors">
                    <div className="w-5 h-5 border border-current rounded-full relative">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-current transform rotate-45"></div>
                    </div>
                  </button>
                  <button className="hover:text-museum-gold transition-colors text-sm">English</button>
                </div>

                <div className="flex items-center gap-8">
                  
                  <Link to="/ticketing" className="bg-museum-gold text-white px-8 py-2.5 rounded-full hover:bg-museum-gold/90 transition-all duration-300 text-sm">
                    Ticketing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-black/95 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="container mx-auto px-8 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/language" className="text-white hover:text-museum-gold transition-colors text-sm">English</Link>
              <Link to="/palace" className="text-white hover:text-museum-gold transition-colors text-sm">Visit</Link>
              <Link to="/life-at-museum" className="text-white hover:text-museum-gold transition-colors text-sm">Events</Link>
              <Link to="/collection" className="text-white hover:text-museum-gold transition-colors text-sm">Explore</Link>
              <Link to="/ticketing" className="bg-museum-gold text-white px-4 py-2 rounded-full text-center text-sm">Ticketing</Link>
            </div>
          </div>
        </div>

        {/* Navigation Menu with SEE MORE Dropdown */}
        <div className="bg-black hidden md:block">
          <div className="container mx-auto px-8">
            <div className="flex justify-center space-x-12 py-4 relative">
              <Link to="/palace" className="relative text-white hover:text-museum-gold transition-colors uppercase text-sm tracking-wider pb-2 group">
                VISIT
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link to="/life-at-museum" className="relative text-white hover:text-museum-gold transition-colors uppercase text-sm tracking-wider pb-2 group">
                EXHIBITIONS AND EVENTS
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link to="/collection" className="relative text-white hover:text-museum-gold transition-colors uppercase text-sm tracking-wider pb-2 group">
                EXPLORE
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
              </Link>
              
              {/* SEE MORE with Dropdown */}
              <div className="relative group">
                <button className="relative text-white hover:text-museum-gold transition-colors uppercase text-sm tracking-wider pb-2 flex items-center gap-2">
                  SEE MORE
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[800px] bg-black border-t-2 border-museum-gold opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="flex">
                    {/* Left Side - Links */}
                    <div className="w-1/2 p-8 space-y-4">
                      <Link to="/boutique" className="block text-white hover:text-museum-gold transition-colors text-lg font-light">Online boutique</Link>
                      <Link to="/support" className="block text-white hover:text-museum-gold transition-colors text-lg font-light">Support the Errobelo</Link>
                    </div>
                    
                    {/* Right Side - Support Section */}
                    <div className="w-1/2 p-8 bg-gray-900">
                      <div className="relative">
                        <img src={collectionmain1} alt="Support the Errobelo" className="w-full h-48 object-cover rounded" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white text-black px-3 py-1 text-xs font-medium rounded">Become a Patron</span>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Link to="/support" className="flex items-center text-white hover:text-museum-gold transition-colors group/link">
                          <span className="text-lg font-light mr-2">Support the Errobelo</span>
                          <svg className="w-5 h-5 transition-transform group-hover/link:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                        <p className="text-gray-400 text-sm mt-2">Individuals, companies or foundations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[250px] mt-28">
        <img 
          src="https://www.hopin.gr/wp-content/uploads/2019/07/National_Archaeological_Museum1.jpg" 
          alt="Another Errobelo" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/40"></div>
        <div className="absolute bottom-10 left-12">
          <p className="text-white text-sm font-medium tracking-wider mb-2">GUIDED TOURS</p>
          <h1 className="text-white text-4xl font-extralight tracking-wide">Get Tickets to Errobelo</h1>
        </div>
      </section>

      {/* Info Section */}
      <section className="px-8 py-12 grid md:grid-cols-3 gap-8 text-xl bg-black">
        <div className="md:col-span-2">
          <div className="flex gap-4 mb-4 text-lg flex-wrap">
            <span className="px-3 py-1 bg-museum-gold text-white rounded">Guided tours</span>
            <span className="px-3 py-1 bg-museum-gold text-white rounded">Masterpieces</span>
            <span className="px-3 py-1 bg-museum-gold text-white rounded">Adults</span>
          </div>
          <h2 className="text-4xl font-light mb-4 text-white">Another Errobelo</h2>
          <p className="mb-6 text-xl text-white/90 font-light leading-relaxed">
            Enjoy a visit away from the crowds and discover the lesser-known treasures and stunning settings of 'Another Errobelo.'
          </p>
          <p className="text-gray-300 text-lg font-light">Monday, Friday and Saturday</p>
        </div>
        
        <div className="bg-black border border-white/10 rounded-xl p-6 text-lg">
          <p className="flex justify-between mb-4 text-white/90">
            <span>Average duration of the visit</span>
            <span className="font-normal text-white">1:30</span>
          </p>
          <p className="flex justify-between mb-4 text-white/90">
            <span>Meeting point</span>
            <span className="font-normal text-white">Groups Reception Area</span>
          </p>
          <p className="flex justify-between mb-4 text-white/90">
            <span>Language(s)</span>
            <span className="font-normal text-white">English</span>
          </p>
          <button className="w-full px-6 py-3 bg-museum-gold text-white font-normal rounded-lg text-lg hover:bg-museum-gold/90 transition-colors">
            Book Now
          </button>
        </div>
      </section>

      {/* Schedule */}
      <section className="px-8 pb-12 text-gray-300 text-lg bg-black font-light">
        <p className="mb-2 leading-relaxed">
          Until July 4, every Monday, Friday and Saturday at 10:30 a.m. Every Friday at 6:30 p.m.
        </p>
        <p className="leading-relaxed">
          From July 5 to September 19: everyday at 10:30 a.m. and at 2:30 p.m. Every Friday at 6 p.m. (except Sept 5)
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 pt-16 px-6 md:px-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-12">
          <div>
            <h4 className="uppercase text-white text-xs font-semibold tracking-widest mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:underline hover:text-white transition-colors">The Errobelo in France and around the world</Link></li>
              <li><Link to="/rules" className="hover:underline hover:text-white transition-colors">Visitor rules</Link></li>
              <li><Link to="/loans" className="hover:underline hover:text-white transition-colors">Loans and long-term loans</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-white text-xs font-semibold tracking-widest mb-4">Our Websites</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/ticketing" className="hover:underline hover:text-white transition-colors">Online ticketing service</Link></li>
              <li><Link to="/boutique" className="hover:underline hover:text-white transition-colors">Online Boutique</Link></li>
              <li><Link to="/collection" className="hover:underline hover:text-white transition-colors">Collection</Link></li>
              <li><Link to="/corpus" className="hover:underline hover:text-white transition-colors">Corpus</Link></li>
              <li><Link to="/donate" className="hover:underline hover:text-white transition-colors">Donate</Link></li>
              <li><Link to="/press" className="hover:underline hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-white text-xs font-semibold tracking-widest mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faqs" className="hover:underline hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:underline hover:text-white transition-colors">Contact us</Link></li>
              <li><Link to="/feedback" className="hover:underline hover:text-white transition-colors">Give us your feedback!</Link></li>
              <li><Link to="/jobs" className="hover:underline hover:text-white transition-colors">Jobs (in French)</Link></li>
              <li><Link to="/events-shoots" className="hover:underline hover:text-white transition-colors">Private event and film shoots</Link></li>
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
                    className="rounded-full border border-gray-600 w-10 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    <span className="text-white text-sm">{social}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="uppercase text-white text-xs font-semibold tracking-widest mb-4">Membership</h4>
              <div className="h-8 mb-3 bg-gray-700 rounded"></div>
              <Link to="/membership" className="text-white underline text-sm hover:text-gray-300 transition-colors">
                Become a Friend of the Errobelo (in French) →
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center text-xs text-gray-400 py-6">
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            <Link to="/legal" className="hover:underline hover:text-white transition-colors">Legal Notice</Link>
            <Link to="/privacy" className="hover:underline hover:text-white transition-colors">Privacy policy</Link>
            <Link to="/cookies" className="hover:underline hover:text-white transition-colors">Cookies</Link>
            <Link to="/credits" className="hover:underline hover:text-white transition-colors">Credits</Link>
            <Link to="/copyrights" className="hover:underline hover:text-white transition-colors">Copyrights</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Ticketing;
