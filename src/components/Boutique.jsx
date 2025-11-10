import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import image
import collectionmain2 from '../assets/collectionmain2.png';

// Categories data
const categories = [
  {
    title: "Publications",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80",
    description: "Museum catalogs and art books"
  },
  {
    title: "Art Workshops",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80",
    description: "Sculpture replicas and masterpieces"
  },
  {
    title: "Print on Demand",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80",
    description: "Custom art prints and posters"
  },
  {
    title: "Images & Stationery",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80",
    description: "Postcards and notebooks"
  },
  {
    title: "Fashion & Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    description: "Scarves, bags and accessories"
  },
  {
    title: "Jewellery",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
    description: "Elegant museum-inspired pieces"
  },
  {
    title: "Homeware",
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80",
    description: "Decorative objects and tableware"
  },
  {
    title: "Kids",
    image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600&q=80",
    description: "Educational games and toys"
  }
];

// Collaborations data
const collaborations = [
  {
    name: "Renaissance Collection",
    designer: "Artisan Series",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80"
  },
  {
    name: "Classical Heritage",
    designer: "Museum Edition",
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80"
  },
  {
    name: "Modern Masters",
    designer: "Contemporary Line",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
  },
  {
    name: "Ancient Elegance",
    designer: "Heritage Collection",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80"
  }
];

function Boutique() {
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
    <div className="bg-black text-white font-playfair min-h-screen">
      {/* Header */}
      <header id="mainNavbar" className="fixed w-full z-50 h-28 top-0 transform translate-y-0 transition-transform duration-500 bg-black">
        <div className="bg-black h-24">
          <div className="container mx-auto px-8">
            <nav className="flex items-center justify-between h-24">
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

        {/* Navigation Menu */}
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
      <section className="relative w-full h-[400px] pt-28">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80" 
          alt="Online Boutique" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl md:text-7xl font-extralight tracking-wide mb-4">ONLINE BOUTIQUE</h1>
          <p className="text-xl md:text-2xl font-light">Curated collections inspired by timeless art</p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-extralight mb-12 tracking-wide">CATEGORIES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={index}
              to={`/boutique/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative overflow-hidden rounded-lg aspect-square"
            >
              <img 
                src={category.image} 
                alt={category.title}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-xl font-semibold mb-1">{category.title}</h3>
                <p className="text-sm text-white/80">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Collaborations Section */}
      <section className="bg-gradient-to-b from-black to-gray-900 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-extralight tracking-wide">COLLABORATIONS</h2>
            <Link to="/collaborations" className="text-museum-gold hover:text-museum-gold/80 transition-colors text-sm flex items-center gap-2">
              View all
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collaborations.map((collab, index) => (
              <Link 
                key={index}
                to={`/collaboration/${collab.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative overflow-hidden rounded-lg aspect-[3/4]"
              >
                <img 
                  src={collab.image} 
                  alt={collab.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-xs uppercase tracking-widest text-white/70 mb-2">{collab.designer}</p>
                  <h3 className="text-2xl font-light">{collab.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Banner */}
      <section className="relative w-full h-[400px]">
        <img 
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1600&q=80" 
          alt="Featured Collection" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-5xl font-extralight mb-6 tracking-wide">EXCLUSIVE COLLECTION</h2>
          <p className="text-lg mb-8 max-w-2xl font-light">
            Discover our limited edition pieces inspired by the masterpieces in our permanent collection
          </p>
          <Link 
            to="/exclusive-collection"
            className="bg-museum-gold text-white px-10 py-3 rounded-full font-medium hover:bg-museum-gold/90 transition-colors text-sm"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 pt-16 px-6 md:px-12 border-t border-gray-800 mt-20">
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
              <Link to="/membership" className="text-white underline text-sm hover:text-museum-gold transition-colors">
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

export default Boutique;
