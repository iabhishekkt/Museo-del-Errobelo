import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LanguageDropdown from './LanguageDropdown';
import collectionHeader from '../assets/collection_header.jpg';
import collectionmain2 from '../assets/collectionmain2.png';

const ITEMS_PER_PAGE = 12;

// Collection type filters
const collectionTypes = [
  { id: '', name: 'All Collections' },
  { id: 'painting', name: 'Paintings' },
  { id: 'sculpture', name: 'Sculptures' },
  { id: 'print', name: 'Prints & Drawings' },
  { id: 'photograph', name: 'Photographs' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'ceramics', name: 'Ceramics' },
  { id: 'jewelry', name: 'Jewelry' },
  { id: 'textile', name: 'Textiles' }
];

function Display() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [collectionType, setCollectionType] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Fetch artifacts from Rijksmuseum API
  useEffect(() => {
    const fetchArtifacts = async () => {
      setLoading(true);
      setError('');
      try {
        let searchTerm = search || 'art';
        
        // Add collection type to search if selected
        if (collectionType) {
          searchTerm = `${collectionType} ${searchTerm}`;
        }
        
        const url = `https://www.rijksmuseum.nl/api/en/collection?key=0fiuZFh4&q=${encodeURIComponent(searchTerm)}&imgonly=true&ps=${ITEMS_PER_PAGE}&p=${page}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        setTotal(data.count || 0);
        
        const formattedArtifacts = (data.artObjects || []).map(item => ({
          name: item.title || 'Untitled',
          artist: item.principalOrFirstMaker || 'Unknown Artist',
          era: item.dating?.presentingDate || 'Undated',
          origin: item.productionPlaces?.[0] || 'Unknown',
          description: item.longTitle || item.title || 'A beautiful piece from our collection.',
          image: item.webImage?.url || item.headerImage?.url,
          classification: item.objectTypes?.[0] || 'Artwork',
          medium: item.materials?.join(', ') || 'Various materials',
        }));
        
        setArtifacts(formattedArtifacts);
      } catch (err) {
        setError('Failed to load artifacts. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArtifacts();
  }, [search, collectionType, page]);

  useEffect(() => {
    document.body.style.overflow = selectedArtifact ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedArtifact]);

  // Sticky navbar
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

  const handleComingSoon = (e) => {
    e.preventDefault();
    setShowComingSoon(true);
  };

  return (
    <div className="bg-black text-white font-playfair">
      {/* NAVBAR - Same as before */}
      <nav id="mainNavbar" className="fixed w-full z-50 h-28 top-0 transform translate-y-0 transition-transform duration-500 bg-black">
        <div className="bg-black h-24">
          <div className="container mx-auto px-8">
            <div className="flex items-center justify-between h-24">
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
                  <LanguageDropdown />
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
              <div className="text-white">
                <LanguageDropdown />
              </div>
              <Link to="/palace" className="text-white hover:text-museum-gold transition-colors text-sm">Visit</Link>
              <Link to="/life-at-museum" className="text-white hover:text-museum-gold transition-colors text-sm">Events</Link>
              <Link to="/collection" className="text-white hover:text-museum-gold transition-colors text-sm">Explore</Link>
              <Link to="/3d-gallery" className="text-white hover:text-museum-gold transition-colors text-sm">3D Gallery</Link>
              <Link to="/ticketing" className="bg-museum-gold text-white px-4 py-2 rounded-full text-center text-sm">Ticketing</Link>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="bg-black hidden md:block">
          <div className="container mx-auto px-8">
            <div className="flex justify-center space-x-12 py-4 relative">
              <Link to="/palace" className="relative text-white hover:text-museum-gold transition-colors uppercase text-sm tracking-wider pb-2 group">
                VISIT
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link to="/3d-gallery" className="relative text-white hover:text-museum-gold transition-colors uppercase text-sm tracking-wider pb-2 group">
                3D ART GALLERY
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
                </button>
                
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[800px] bg-black border-t-2 border-museum-gold opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="flex">
                    <div className="w-1/2 p-8 space-y-4">
                      <Link to="/boutique" className="block text-white hover:text-museum-gold transition-colors text-lg font-light">Online boutique</Link>
                      <Link to="/life-at-museum" className="block text-white hover:text-museum-gold transition-colors text-lg font-light">Exhibitions and Events</Link>
                      <a href="#" onClick={handleComingSoon} className="block text-white hover:text-museum-gold transition-colors text-lg font-light">Support the Errobelo</a>
                    </div>
                    
                    <div className="w-1/2 p-8 bg-gray-900">
                      <div className="relative">
                        <img src={collectionmain2} alt="Support" className="w-full h-48 object-cover rounded" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white text-black px-3 py-1 text-xs font-medium rounded">Become a Patron</span>
                        </div>
                      </div>
                      <div className="mt-6">
                        <a href="#" onClick={handleComingSoon} className="flex items-center text-white hover:text-museum-gold transition-colors group/link">
                          <span className="text-lg font-light mr-2">Support the Errobelo</span>
                          <svg className="w-5 h-5 transition-transform group-hover/link:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
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

      {/* HEADER */}
      <section className="relative w-full pt-28">
        <div className="relative h-[350px]">
          <img src={collectionHeader} alt="Heritage Collections" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-12 left-8 md:left-16 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-extralight tracking-wide text-white mb-4">HERITAGE COLLECTIONS</h1>
            <p className="text-base md:text-lg text-white/90 font-light">Discover masterpieces from across the ages. Search, filter, and explore our vast collection.</p>
          </div>
        </div>
      </section>

      {/* CONTROLS WITH FILTER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-black">
        <form
          onSubmit={e => { e.preventDefault(); setPage(1); }}
          className="flex gap-4 mb-12 flex-wrap items-center justify-center"
        >
          <input
            type="text"
            placeholder="Search by keyword..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="px-6 py-3 rounded-full bg-black border border-museum-gold text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-museum-gold w-64"
          />
          
          <select
            value={collectionType}
            onChange={e => { setCollectionType(e.target.value); setPage(1); }}
            className="px-6 py-3 rounded-full bg-black border border-museum-gold text-white focus:outline-none focus:ring-2 focus:ring-museum-gold cursor-pointer"
          >
            {collectionTypes.map(type => (
              <option key={type.id} value={type.id} className="bg-black text-white">
                {type.name}
              </option>
            ))}
          </select>
          
          <button
            type="submit"
            className="px-8 py-3 bg-museum-gold text-black rounded-full font-medium hover:bg-museum-gold/90 transition-all"
          >
            Search
          </button>
        </form>

        {/* Active Filters Display */}
        {(search || collectionType) && (
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            <span className="text-gray-400 text-sm">Active filters:</span>
            {search && (
              <span className="px-4 py-1 bg-museum-gold/20 border border-museum-gold text-museum-gold rounded-full text-sm flex items-center gap-2">
                Search: "{search}"
                <button onClick={() => { setSearch(''); setPage(1); }} className="hover:text-white">
                  ×
                </button>
              </span>
            )}
            {collectionType && (
              <span className="px-4 py-1 bg-museum-gold/20 border border-museum-gold text-museum-gold rounded-full text-sm flex items-center gap-2">
                {collectionTypes.find(t => t.id === collectionType)?.name}
                <button onClick={() => { setCollectionType(''); setPage(1); }} className="hover:text-white">
                  ×
                </button>
              </span>
            )}
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="flex flex-col justify-center items-center min-h-[300px]">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-museum-gold mb-4"></div>
            <span className="text-lg text-gray-400">Loading artifacts...</span>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="text-red-400 text-center mt-16 text-lg">{error}</div>
        )}

        {/* ARTIFACT GRID */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {artifacts.map((artifact, index) => (
                <div 
                  key={index}
                  className="rounded-lg shadow-2xl overflow-hidden cursor-pointer bg-black border border-gray-800 hover:border-museum-gold transition-all duration-300 transform hover:scale-105"
                  onClick={() => setSelectedArtifact(artifact)}
                >
                  <div className="relative h-72">
                    <img 
                      src={artifact.image} 
                      alt={artifact.name} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-normal text-white mb-2 line-clamp-2 leading-tight">{artifact.name}</h3>
                    <p className="text-sm text-museum-gold mb-2 uppercase tracking-wider font-semibold">
                      {artifact.artist}
                    </p>
                    <p className="text-sm text-gray-400">
                      {artifact.era}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-4 mt-16">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-6 py-3 bg-museum-gold text-black rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-museum-gold/90 transition-all font-medium"
              >
                Previous
              </button>
              <span className="text-white text-lg">
                Page <span className="text-museum-gold font-semibold">{page}</span> of <span className="text-museum-gold font-semibold">{Math.ceil(total / ITEMS_PER_PAGE) || 1}</span>
              </span>
              <button
                onClick={() => setPage(p => (p * ITEMS_PER_PAGE < total ? p + 1 : p))}
                disabled={page * ITEMS_PER_PAGE >= total}
                className="px-6 py-3 bg-museum-gold text-black rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-museum-gold/90 transition-all font-medium"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>

      {/* ARTIFACT DETAIL MODAL - Same as before */}
      {selectedArtifact && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedArtifact(null)}
        >
          <div 
            className="relative bg-black rounded-lg max-w-4xl w-full mx-4 overflow-hidden border border-museum-gold shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-museum-gold text-white p-3 rounded-full transition-all duration-300 hover:rotate-90"
              onClick={() => setSelectedArtifact(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-96 md:h-full">
                <img 
                  src={selectedArtifact.image} 
                  alt={selectedArtifact.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              </div>

              <div className="p-8 md:p-10 overflow-y-auto max-h-[600px] bg-black">
                <div className="mb-4">
                  <span className="inline-block px-4 py-1 bg-museum-gold/20 border border-museum-gold text-museum-gold rounded-full text-xs uppercase tracking-wider font-semibold">
                    {selectedArtifact.classification}
                  </span>
                </div>

                <h2 className="text-3xl font-light text-white mb-6 leading-tight">{selectedArtifact.name}</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Artist</p>
                    <p className="text-white text-sm">{selectedArtifact.artist}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Era</p>
                    <p className="text-white text-sm">{selectedArtifact.era}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Origin</p>
                    <p className="text-white text-sm">{selectedArtifact.origin}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Medium</p>
                    <p className="text-white text-sm">{selectedArtifact.medium}</p>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6"></div>

                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">About</p>
                  <p className="text-gray-300 text-base leading-relaxed">{selectedArtifact.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coming Soon Popup - Same as before */}
      {showComingSoon && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative bg-black rounded-lg p-8 max-w-md w-full border border-museum-gold shadow-2xl">
            <button
              onClick={() => setShowComingSoon(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <div className="mb-6">
                <svg className="w-20 h-20 mx-auto text-museum-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h3 className="text-3xl font-light text-white mb-4">Coming Soon</h3>
              <p className="text-gray-400 text-base mb-6 leading-relaxed">
                This feature is currently under development. We're working hard to bring you an amazing experience.
              </p>
              
              <button
                onClick={() => setShowComingSoon(false)}
                className="bg-museum-gold text-black px-8 py-3 rounded-full font-medium hover:bg-museum-gold/90 transition-all duration-300 text-sm"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER - Same as before */}
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
              <li><Link to="/faq" className="hover:underline hover:text-white transition-colors">FAQ</Link></li>
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
                  <a key={social} href="#" onClick={handleComingSoon} className="rounded-full border border-gray-600 w-10 h-10 flex items-center justify-center hover:bg-gray-800 hover:border-museum-gold transition-all">
                    <span className="text-white text-sm">{social}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="uppercase text-white text-xs font-semibold tracking-widest mb-4">Membership</h4>
              <div className="h-8 mb-3 bg-gray-700 rounded"></div>
              <a href="#" onClick={handleComingSoon} className="text-white underline text-sm hover:text-museum-gold transition-colors">
                Become a Friend of the Errobelo (in French) →
              </a>
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

export default Display;
