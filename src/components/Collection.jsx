import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import images
import collectionHeader from '../assets/collection_header.jpg';
import socrates from '../assets/Socrates.jfif';
import collectionmain2 from '../assets/collectionmain2.png';

function Collection() {
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
    <div className="bg-black font-playfair">
      {/* Header */}
      <header id="mainNavbar" className="fixed w-full z-50 h-28 transform translate-y-0 transition-transform duration-500">
        <div className="bg-black h-24">
          <div className="container mx-auto px-8">
            <nav className="flex items-center justify-between h-24">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white"
              >
                <div className="w-6 h-0.5 bg-current mb-1.5"></div>
                <div className="w-6 h-0.5 bg-current mb-1.5"></div>
                <div className="w-6 h-0.5 bg-current"></div>
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
            </nav>
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

        {/* Desktop Navigation Menu */}
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
              
              <div className="relative group">
                <button className="relative text-white hover:text-museum-gold transition-colors uppercase text-sm tracking-wider pb-2 flex items-center gap-2">
                  SEE MORE
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
                </button>
                
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[800px] bg-black border-t-2 border-museum-gold opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="flex">
                    <div className="w-1/2 p-8 space-y-4">
                      <Link to="/boutique" className="block text-white hover:text-museum-gold transition-colors text-lg font-light">Online boutique</Link>
                      <Link to="/support" className="block text-white hover:text-museum-gold transition-colors text-lg font-light">Support the Errobelo</Link>
                    </div>
                    
                    <div className="w-1/2 p-8 bg-gray-900">
                      <div className="relative">
                        <img src={collectionmain2} alt="Support the Errobelo" className="w-full h-48 object-cover rounded" />
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
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[300px] pt-28">
        <img src={collectionHeader} alt="Collections" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-10 left-12">
          <h2 className="text-white text-5xl font-extralight tracking-wide">COLLECTIONS</h2>
        </div>
      </section>

      {/* Collections Database Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        {/* Card */}
        <div className="flex items-center justify-between bg-black border border-white/10 shadow-2xl rounded-lg p-8 mb-12">
          {/* Left: Image + Title */}
          <div className="flex items-center space-x-6">
            <img src={socrates} alt="Socrates" className="w-20 h-20 rounded object-cover" />
            <h3 className="text-white text-xl font-normal">The Collections database</h3>
          </div>

          {/* Right: Arrow button */}
          <Link to="/display" className="inline-flex items-center justify-center w-12 h-12 border border-white/20 rounded-full hover:bg-white/10 transition-all">
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
            With the online <Link to="/database" className="text-museum-gold hover:underline transition-colors">Museo del Errobelo Collections database</Link>, everyone can share in this journey of discovery and rediscovery. It contains over 500,000 works from the Museo del Errobelo and the Musée National Eugène-Delacroix spanning a variety of places in France or abroad. Each entry includes the work's current location, whether it be on display in the Errobelo or the Musée Delacroix.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 pt-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-12">
          <div>
            <h4 className="uppercase text-white text-xs font-semibold tracking-widest mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:underline">The Errobelo in France and around the world</Link></li>
              <li><Link to="/rules" className="hover:underline">Visitor rules</Link></li>
              <li><Link to="/loans" className="hover:underline">Loans and long-term loans</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-white text-xs font-semibold tracking-widest mb-4">Our Websites</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/ticketing" className="hover:underline">Online ticketing service</Link></li>
              <li><Link to="/boutique" className="hover:underline">Online Boutique</Link></li>
              <li><Link to="/collection" className="hover:underline">Collection</Link></li>
              <li><Link to="/corpus" className="hover:underline">Corpus</Link></li>
              <li><Link to="/donate" className="hover:underline">Donate</Link></li>
              <li><Link to="/press" className="hover:underline">Press</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="uppercase text-white text-xs font-semibold tracking-widest mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faqs" className="hover:underline">FAQ</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact us</Link></li>
              <li><Link to="/feedback" className="hover:underline">Give us your feedback!</Link></li>
              <li><Link to="/jobs" className="hover:underline">Jobs (in French)</Link></li>
              <li><Link to="/events-shoots" className="hover:underline">Private event and film shoots</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <h4 className="uppercase text-white text-xs font-semibold tracking-widest mb-4">Follow Us</h4>
              <div className="flex gap-4 mb-6">
                <a href="#" className="rounded-full border border-gray-600 w-10 h-10 flex items-center justify-center hover:bg-gray-800">
                  <span className="text-white text-sm">f</span>
                </a>
                <a href="#" className="rounded-full border border-gray-600 w-10 h-10 flex items-center justify-center hover:bg-gray-800">
                  <span className="text-white text-sm">ig</span>
                </a>
                <a href="#" className="rounded-full border border-gray-600 w-10 h-10 flex items-center justify-center hover:bg-gray-800">
                  <span className="text-white text-sm">x</span>
                </a>
                <a href="#" className="rounded-full border border-gray-600 w-10 h-10 flex items-center justify-center hover:bg-gray-800">
                  <span className="text-white text-sm">yt</span>
                </a>
                <a href="#" className="rounded-full border border-gray-600 w-10 h-10 flex items-center justify-center hover:bg-gray-800">
                  <span className="text-white text-sm">p</span>
                </a>
                <a href="#" className="rounded-full border border-gray-600 w-10 h-10 flex items-center justify-center hover:bg-gray-800">
                  <span className="text-white text-sm">in</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="uppercase text-white text-xs font-semibold tracking-widest mb-4">Membership</h4>
              <div className="h-8 mb-3 bg-gray-700 rounded"></div>
              <Link to="/membership" className="text-white underline text-sm hover:text-museum-gold">
                Become a Friend of the Errobelo (in French) →
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center text-xs text-gray-400 py-6">
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            <Link to="/legal" className="hover:underline">Legal Notice</Link>
            <Link to="/privacy" className="hover:underline">Privacy policy</Link>
            <Link to="/cookies" className="hover:underline">Cookies</Link>
            <Link to="/credits" className="hover:underline">Credits</Link>
            <Link to="/copyrights" className="hover:underline">Copyrights</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Collection;
