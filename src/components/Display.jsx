import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Replace with your actual asset
import collectionHeader from '../assets/collection_header.jpg';
import collectionmain2 from '../assets/collectionmain2.png';

const departments = [
  { id: '', name: 'All Departments' },
  { id: 1, name: 'American Decorative Arts' },
  { id: 3, name: 'Ancient Near Eastern Art' },
  { id: 4, name: 'Arms and Armor' },
  { id: 5, name: 'Arts of Africa, Oceania, and the Americas' },
  { id: 6, name: 'Asian Art' },
  { id: 7, name: 'The Cloisters' },
  { id: 8, name: 'The Costume Institute' },
  { id: 9, name: 'Drawings and Prints' },
  { id: 10, name: 'Egyptian Art' },
  { id: 11, name: 'European Paintings' },
  { id: 12, name: 'European Sculpture and Decorative Arts' },
  { id: 13, name: 'Greek and Roman Art' },
  { id: 14, name: 'Islamic Art' }
];

const ITEMS_PER_PAGE = 20;

function Display() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Helper for building search URL
  function buildSearchURL() {
    let base = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=';
    base += encodeURIComponent(search ? search : 'artifact');
    if (department) base += `&departmentId=${department}`;
    return base;
  }

  // Fetch artifacts
  useEffect(() => {
    const fetchArtifacts = async () => {
      setLoading(true);
      setError('');
      try {
        const searchURL = buildSearchURL();
        const searchResponse = await fetch(searchURL);
        const searchData = await searchResponse.json();
        const totalResults = searchData.objectIDs ? searchData.objectIDs.length : 0;
        setTotal(totalResults);

        let objectIDs = searchData.objectIDs || [];
        const pageStart = (page - 1) * ITEMS_PER_PAGE;
        const pageEnd = page * ITEMS_PER_PAGE;
        objectIDs = objectIDs.slice(pageStart, pageEnd);

        const artifactPromises = objectIDs.map(id =>
          fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`).then(res => res.json())
        );
        const artifactDatas = await Promise.all(artifactPromises);

        // Format data
        setArtifacts(
          artifactDatas
            .filter(a => a.primaryImageSmall && a.title)
            .map(a => ({
              name: a.title,
              origin: a.culture || a.country || 'Unknown',
              era: a.objectDate || 'Undated',
              description: a.creditLine || `A treasure from ${a.culture || 'the past'}.`,
              image: a.primaryImageSmall,
              preview: a.classification ? `${a.classification} - ${a.culture || ''}` : '',
            }))
        );
      } catch (err) {
        setError('Failed to load artifacts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchArtifacts();
    // eslint-disable-next-line
  }, [search, department, page]);

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

  return (
    <div className="bg-black text-white font-playfair">
      {/* NAVBAR - as before */}
      <nav id="mainNavbar" className="fixed w-full z-50 h-28 top-0 transform translate-y-0 transition-transform duration-500">
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
                  <button className="hover:text-museum-gold transition-colors text-sm">English</button>
                </div>
                <div className="flex items-center gap-8">
                  <Link to="/store" className="text-white/80 hover:text-museum-gold transition-colors text-sm border border-white/20 px-6 py-2 rounded-full hover:bg-white/10">
                    Online Store
                  </Link>
                  <Link to="/ticketing" className="bg-museum-gold text-white px-8 py-2.5 rounded-full hover:bg-museum-gold/90 transition-all duration-300 text-sm">
                    Ticketing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
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
        <div className="bg-black hidden md:block">
          <div className="container mx-auto px-8">
            <div className="flex justify-center space-x-12 py-4 relative">
              <Link to="/palace" className="relative text-white hover:text-museum-gold transition-colors uppercase text-sm tracking-wider pb-2 group">
                VISIT
              </Link>
              <Link to="/life-at-museum" className="relative text-white hover:text-museum-gold transition-colors uppercase text-sm tracking-wider pb-2 group">
                EXHIBITIONS AND EVENTS
              </Link>
              <Link to="/collection" className="relative text-white hover:text-museum-gold transition-colors uppercase text-sm tracking-wider pb-2 group">
                EXPLORE
              </Link>
              <div className="relative group">
                {/* See More Dropdown */}
                <button className="relative text-white hover:text-museum-gold transition-colors uppercase text-sm tracking-wider pb-2 flex items-center gap-2">
                  SEE MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <header className="relative w-full h-[400px] pt-28">
        <img src={collectionHeader} alt="Heritage Collections" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-16 left-8 md:left-16 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-extralight tracking-wide text-white mb-4">HERITAGE COLLECTIONS</h1>
          <p className="text-xl md:text-2xl text-white/90 font-light">Implemented features like loading 20 items per page, search by keyword, filter by department, and error handling for failed requests.</p>
        </div>
      </header>

      {/* CONTROLS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-black">
        <form
          onSubmit={e => { e.preventDefault(); setPage(1); }}
          className="flex gap-4 mb-10 flex-wrap items-center justify-center"
        >
          <input
            type="text"
            placeholder="Search by keyword..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="px-4 py-2 rounded bg-black border border-museum-gold text-white focus:outline-none w-56"
          />
          <select
            value={department}
            onChange={e => { setDepartment(e.target.value); setPage(1); }}
            className="px-4 py-2 rounded bg-black border border-museum-gold text-white focus:outline-none"
          >
            {departments.map(dep => (
              <option key={dep.id} value={dep.id}>{dep.name}</option>
            ))}
          </select>
        </form>

        {/* Artifact GRID */}
        {loading && (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-museum-gold mb-4"></div>
            <span className="ml-4">Loading artifacts...</span>
          </div>
        )}
        {error && (
          <div className="text-red-400 text-center mt-16">{error}</div>
        )}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {artifacts.map((artifact, index) => (
                <div 
                  key={index}
                  className="artifact-card rounded-lg shadow-2xl overflow-hidden cursor-pointer bg-zinc-900 hover:border-museum-gold border border-zinc-700 transition"
                  onClick={() => setSelectedArtifact(artifact)}
                >
                  <div className="relative">
                    <img 
                      src={artifact.image} 
                      alt={artifact.name} 
                      className="w-full h-64 object-cover" 
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-normal text-white mb-2 line-clamp-2">{artifact.name}</h3>
                    <p className="text-sm text-museum-gold mb-3 uppercase tracking-wider">
                      {artifact.era} • {artifact.origin}
                    </p>
                    <p className="text-sm text-white/70 leading-relaxed line-clamp-3">{artifact.preview}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-museum-gold text-white rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                Page {page} of {Math.ceil(total / ITEMS_PER_PAGE) || 1}
              </span>
              <button
                onClick={() => setPage(p => (p * ITEMS_PER_PAGE < total ? p + 1 : p))}
                disabled={page * ITEMS_PER_PAGE >= total}
                className="px-4 py-2 bg-museum-gold text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>

      {/* Modal */}
      {selectedArtifact && (
        <div 
          className="modal-overlay fixed inset-0 z-[9999] bg-black bg-opacity-70 flex items-center justify-center"
          onClick={() => setSelectedArtifact(null)}
        >
          <div 
            className="modal-content relative bg-white text-black rounded-lg max-w-lg w-full mx-4 p-8"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-2 right-2 text-2xl text-museum-gold hover:text-black"
              onClick={() => setSelectedArtifact(null)}
            >
              ×
            </button>
            <img src={selectedArtifact.image} alt={selectedArtifact.name} className="w-full h-64 object-contain mb-4 rounded" />
            <h2 className="text-2xl font-bold mb-2">{selectedArtifact.name}</h2>
            <div className="flex gap-8 text-sm text-gray-600 mb-3">
              <div><span className="font-semibold">Origin:</span> {selectedArtifact.origin}</div>
              <div><span className="font-semibold">Era:</span> {selectedArtifact.era}</div>
            </div>
            <p className="text-base">{selectedArtifact.description}</p>
          </div>
        </div>
      )}

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
                {['f', 'ig', 'x', 'yt', 'p', 'in'].map((social) => (
                  <a key={social} href="#" className="rounded-full border border-gray-600 w-10 h-10 flex items-center justify-center hover:bg-gray-800">
                    <span className="text-white text-sm">{social}</span>
                  </a>
                ))}
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

export default Display;
