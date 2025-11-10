import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import LanguageDropdown from './LanguageDropdown';

// Import all assets
import ebplus1 from '../assets/ebplus1.png';
import ebplus2 from '../assets/ebplus2.png';
import ebplus3 from '../assets/ebplus3.png';
import ebplus4 from '../assets/ebplus4.png';
import collectionmain1 from '../assets/collectionmain1.png';
import collectionmain2 from '../assets/collectionmain2.png';
import collectionmain3 from '../assets/collectionmain3.png';
import collectionmain4 from '../assets/collectionmain4.png';
import collectionmain5 from '../assets/collectionmain5.png';
import collectionmain6 from '../assets/collectionmain6.png';
import collectionmain7 from '../assets/collectionmain7.png';

function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mapEnabled, setMapEnabled] = useState(false);
  const mapRef = useRef(null);

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

  // Custom marker icon
  const customIcon = L.divIcon({
    html: `<div class="flex flex-col items-center"><div class="w-6 h-8 bg-red-600 rounded-t-full relative"><div class="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div></div><div class="w-1 h-2 bg-red-600"></div></div>`,
    className: 'custom-div-icon',
    iconSize: [24, 32],
    iconAnchor: [12, 32]
  });

  const handleMapOverlayClick = () => {
    setMapEnabled(true);
    if (mapRef.current) {
      mapRef.current.scrollWheelZoom.enable();
      mapRef.current.touchZoom.enable();
      mapRef.current.doubleClickZoom.enable();
    }
  };

  const handleMapMouseLeave = () => {
    if (mapEnabled) {
      setMapEnabled(false);
      if (mapRef.current) {
        mapRef.current.scrollWheelZoom.disable();
        mapRef.current.touchZoom.disable();
        mapRef.current.doubleClickZoom.disable();
      }
    }
  };

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
                  <LanguageDropdown />
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

        {/* Desktop Navigation Menu */}
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
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></div>
                </button>
                
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[800px] bg-black border-t-2 border-museum-gold opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="flex">
                    <div className="w-1/2 p-8 space-y-4">
                      <Link to="/boutique" className="block text-white hover:text-museum-gold transition-colors text-lg font-light">Online boutique</Link>
                      <Link to="/life-at-museum" className="block text-white hover:text-museum-gold transition-colors text-lg font-light">Exhibitions and Events</Link>
                      <Link to="/membership" className="block text-white hover:text-museum-gold transition-colors text-lg font-light">Support the Errobelo</Link>
                    </div>
                    
                    <div className="w-1/2 p-8 bg-gray-900">
                      <div className="relative">
                        <img src={ebplus1} alt="Support the Errobelo" className="w-full h-48 object-cover rounded" />
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
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 top-32">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
            style={{position: 'absolute', top: 0, left: 0, zIndex: 0}}
          >
            <source src="/TRIM_3.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="absolute inset-0 bg-black/30" style={{zIndex: 1}}></div>

        <div className="absolute inset-0 flex items-center" style={{zIndex: 2}}>
          <h1 className="hidden md:block absolute left-[8%] text-white/90 font-extralight tracking-[0.2em] leading-tight uppercase opacity-0 animate-fadeLeftToRight" style={{fontSize: 'clamp(2.5rem, 6vw, 4.5rem)'}}>
            EXPERIENCE<br />TIMELESS ART
          </h1>
          <h1 className="hidden md:block absolute right-[8%] text-right text-white/90 font-extralight tracking-[0.2em] leading-tight uppercase opacity-0 animate-fadeRightToLeft" style={{fontSize: 'clamp(2.5rem, 6vw, 4.5rem)'}}>
            DISCOVER<br />ERROBELO
          </h1>
          <h1 className="md:hidden absolute inset-0 flex items-center justify-center text-center text-white/90 font-extralight tracking-[0.2em] leading-tight uppercase" style={{fontSize: 'clamp(2rem, 5vw, 3.5rem)'}}>
            DISCOVER<br />ERROBELO
          </h1>
        </div>

        <div className="absolute bottom-12 left-0 right-0 flex justify-center" style={{zIndex: 2}}>
          <Link to="/journey" className="relative bg-black/30 backdrop-blur-sm text-white px-16 py-5 rounded-full border-2 border-museum-gold/70 shadow-[0_0_20px_rgba(184,134,11,0.3)] hover:border-museum-gold hover:shadow-[0_0_30px_rgba(184,134,11,0.5)] hover:bg-black/40 transition-all duration-500 overflow-hidden group">
            <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-museum-gold/30 to-transparent transition-all duration-600 group-hover:left-full animate-shimmer"></div>
            <span className="relative text-lg tracking-wider uppercase font-light">Begin Your Journey</span>
          </Link>
        </div>
      </section>

      {/* ERROBELO+ Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-5xl text-white font-light mb-16 tracking-wide">
            ERROBELO<span className="text-museum-gold">+</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Video Card 1 */}
            <div className="relative group cursor-pointer">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <img src={ebplus1} alt="Restoration of the Arc" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 transition-all duration-300">
                    <div className="w-6 h-6 text-white relative ml-1">
                      <div className="w-0 h-0 border-l-[12px] border-l-current border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-normal text-lg mb-2 leading-tight">
                    The restoration of the Arc du Carrousel [ENG subtitles]
                  </h3>
                  <div className="flex items-center text-white/90 text-sm gap-2">
                    <div className="w-4 h-3 border border-current rounded relative">
                      <div className="absolute top-1 left-1 w-1 h-1 bg-current rounded-full"></div>
                    </div>
                    <span className="uppercase tracking-wider font-medium">VIDEO • 7 min</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video Card 2 */}
            <div className="relative group cursor-pointer">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <img src={ebplus2} alt="Napoleon III Apartments" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 transition-all duration-300">
                    <div className="w-6 h-6 text-white relative ml-1">
                      <div className="w-0 h-0 border-l-[12px] border-l-current border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-normal text-lg mb-2 leading-tight">
                    The restoration of the Napoleon-III apartments
                  </h3>
                  <div className="flex items-center text-white/90 text-sm gap-2">
                    <div className="w-4 h-3 border border-current rounded relative">
                      <div className="absolute top-1 left-1 w-1 h-1 bg-current rounded-full"></div>
                    </div>
                    <span className="uppercase tracking-wider font-medium">VIDEO • 10 min</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video Card 3 */}
            <div className="relative group cursor-pointer">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <img src={ebplus3} alt="Salle des Etats" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 transition-all duration-300">
                    <div className="w-6 h-6 text-white relative ml-1">
                      <div className="w-0 h-0 border-l-[12px] border-l-current border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-normal text-lg mb-2 leading-tight">
                    The Salle des Etats
                  </h3>
                  <div className="flex items-center text-white/90 text-sm gap-2">
                    <div className="w-4 h-3 border border-current rounded relative">
                      <div className="absolute top-1 left-1 w-1 h-1 bg-current rounded-full"></div>
                    </div>
                    <span className="uppercase tracking-wider font-medium">VIDEO • 4 min</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video Card 4 */}
            <div className="relative group cursor-pointer">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <img src={ebplus4} alt="Forêt by Anne Teresa" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 transition-all duration-300">
                    <div className="w-6 h-6 text-white relative ml-1">
                      <div className="w-0 h-0 border-l-[12px] border-l-current border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-normal text-lg mb-2 leading-tight">
                    « Forêt » by Anne Teresa De Keersmaeker and Némo Flouret [ENG subtitles]
                  </h3>
                  <div className="flex items-center text-white/90 text-sm gap-2">
                    <div className="w-4 h-3 border border-current rounded relative">
                      <div className="absolute top-1 left-1 w-1 h-1 bg-current rounded-full"></div>
                    </div>
                    <span className="uppercase tracking-wider font-medium">VIDEO • 7 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <Link to="/life-at-museum" className="bg-white text-black rounded-full px-8 py-3 text-lg font-medium shadow hover:bg-gray-100 transition">
              More on ERROBELO
            </Link>
          </div>
        </div>
      </section>

      {/* Collection Gallery */}
      <section className="bg-black relative overflow-hidden max-h-[700px]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-start">
            <div className="flex flex-col gap-8 w-full md:w-1/3">
              <img src={collectionmain1} alt="Ceiling" className="rounded-lg object-cover w-full h-96 bg-gray-800" />
              <img src={collectionmain2} alt="Statue" className="rounded-lg object-cover w-full h-64 bg-gray-800" />
            </div>
            
            <div className="flex flex-col gap-8 w-full md:w-1/3 relative">
              <img src={collectionmain3} alt="Relief" className="rounded-lg object-cover w-full h-56 bg-gray-800" />
              <img src={collectionmain4} alt="Painting" className="rounded-lg object-cover w-full h-56 bg-gray-800" />
              <div className="relative w-full">
                <img src={collectionmain5} alt="Ancient Wall" className="rounded-lg object-cover w-full h-48 bg-gray-800" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-16 z-30">
                  <Link to="/collection" className="bg-white text-black rounded-full px-8 py-3 text-lg font-medium shadow hover:bg-gray-100 transition">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-8 w-full md:w-1/3">
              <img src={collectionmain6} alt="Tilework" className="rounded-lg object-cover w-full h-96 bg-gray-800" />
              <img src={collectionmain7} alt="Statue 2" className="rounded-lg object-cover w-full h-64 bg-gray-800" />
            </div>
          </div>
        </div>
        
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-40 z-30 bg-gradient-to-b from-transparent to-black"></div>
      </section>

      {/* Featured Collection Section */}
      <section className="py-16 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-5xl text-white font-light mb-4 tracking-wide">
            FEATURED COLLECTION
          </h2>
          <p className="text-gray-400 text-lg mb-12 font-light">
            Discover our most celebrated artifacts from civilizations across the globe
          </p>
          
          <div className="relative -mx-4 md:-mx-8">
            <button 
              onClick={() => {
                const container = document.getElementById('featuredCarousel');
                container.scrollBy({ left: -350, behavior: 'smooth' });
              }}
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-4 rounded-full backdrop-blur-sm transition-all shadow-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div 
              id="featuredCarousel"
              className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-4 md:px-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[...Array(5)].map((_, setIndex) => (
                <React.Fragment key={setIndex}>
                  <Link to="/featured" className="relative group cursor-pointer overflow-hidden rounded-lg flex-shrink-0 w-[280px] md:w-[320px]">
                    <div className="relative h-96">
                      <img 
                        src="https://i.pinimg.com/564x/4f/c6/d8/4fc6d8d7e86886f606495abc4f1680e6.jpg" 
                        alt="Ancient Greek Amphora" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-100" 
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm"></div>
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <h3 className="text-white font-light text-xl mb-2 leading-tight drop-shadow-lg">
                          Ancient Greek Amphora
                        </h3>
                        <p className="text-museum-gold text-xs uppercase tracking-widest font-normal mb-2 drop-shadow-lg">
                          500-450 BCE
                        </p>
                        <p className="text-white/95 text-sm font-light leading-relaxed drop-shadow-lg">
                          Masterfully crafted red-figure vessel from Athens
                        </p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link to="/featured" className="relative group cursor-pointer overflow-hidden rounded-lg flex-shrink-0 w-[280px] md:w-[320px]">
                    <div className="relative h-96">
                      <img 
                        src="https://images.pexels.com/photos/14681329/pexels-photo-14681329.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                        alt="Egyptian Canopic Jar" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-100" 
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm"></div>
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <h3 className="text-white font-light text-xl mb-2 leading-tight drop-shadow-lg">
                          Egyptian Canopic Jar
                        </h3>
                        <p className="text-museum-gold text-xs uppercase tracking-widest font-normal mb-2 drop-shadow-lg">
                          1400-1300 BCE
                        </p>
                        <p className="text-white/95 text-sm font-light leading-relaxed drop-shadow-lg">
                          Sacred vessel from New Kingdom burial practices
                        </p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link to="/featured" className="relative group cursor-pointer overflow-hidden rounded-lg flex-shrink-0 w-[280px] md:w-[320px]">
                    <div className="relative h-96">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Buste_4_Bardo_National_Museum.jpg/250px-Buste_4_Bardo_National_Museum.jpg" 
                        alt="Roman Marble Bust" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-100" 
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm"></div>
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <h3 className="text-white font-light text-xl mb-2 leading-tight drop-shadow-lg">
                          Roman Marble Bust
                        </h3>
                        <p className="text-museum-gold text-xs uppercase tracking-widest font-normal mb-2 drop-shadow-lg">
                          100-200 CE
                        </p>
                        <p className="text-white/95 text-sm font-light leading-relaxed drop-shadow-lg">
                          Exquisitely preserved Antonine period sculpture
                        </p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link to="/featured" className="relative group cursor-pointer overflow-hidden rounded-lg flex-shrink-0 w-[280px] md:w-[320px]">
                    <div className="relative h-96">
                      <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS90rl6lGPpWkjtDaGQSOMpwNbxt2mSp3FswQ&s" 
                        alt="Ming Dynasty Vase" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-100" 
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm"></div>
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <h3 className="text-white font-light text-xl mb-2 leading-tight drop-shadow-lg">
                          Ming Dynasty Vase
                        </h3>
                        <p className="text-museum-gold text-xs uppercase tracking-widest font-normal mb-2 drop-shadow-lg">
                          1368-1644 CE
                        </p>
                        <p className="text-white/95 text-sm font-light leading-relaxed drop-shadow-lg">
                          Blue and white porcelain with dragon motifs
                        </p>
                      </div>
                    </div>
                  </Link>
                  
                  <Link to="/featured" className="relative group cursor-pointer overflow-hidden rounded-lg flex-shrink-0 w-[280px] md:w-[320px]">
                    <div className="relative h-96">
                      <img 
                        src="https://cdn.sanity.io/images/cxgd3urn/production/0849783912550b396d3c6d9c91b201e23cfd9507-2327x1701.jpg" 
                        alt="Mesopotamian Clay Tablet" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-100" 
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm"></div>
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <h3 className="text-white font-light text-xl mb-2 leading-tight drop-shadow-lg">
                          Mesopotamian Clay Tablet
                        </h3>
                        <p className="text-museum-gold text-xs uppercase tracking-widest font-normal mb-2 drop-shadow-lg">
                          2000-1800 BCE
                        </p>
                        <p className="text-white/95 text-sm font-light leading-relaxed drop-shadow-lg">
                          Ancient cuneiform script detailing administrative records
                        </p>
                      </div>
                    </div>
                  </Link>
                </React.Fragment>
              ))}
            </div>

            <button 
              onClick={() => {
                const container = document.getElementById('featuredCarousel');
                container.scrollBy({ left: 350, behavior: 'smooth' });
              }}
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black/90 text-white p-4 rounded-full backdrop-blur-sm transition-all shadow-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full bg-black">
        <div className="bg-black mt-10 text-white">
          <div className="hidden md:flex justify-between items-center py-2 text-xl font-semibold tracking-widest uppercase px-4 lg:px-20">
            <button className="hover:underline">OFFICIAL APPS</button>
            <div className="border-l border-gray-600 h-5"></div>
            <button className="hover:underline">SOCIAL NETWORK</button>
            <div className="border-l border-gray-600 h-5"></div>
            <button className="hover:underline">NEWSLETTER</button>
          </div>
          
          <div className="md:hidden px-4 py-4">
            <div className="flex flex-col space-y-4 text-center">
              <button className="hover:underline text-lg font-semibold tracking-wider uppercase">OFFICIAL APPS</button>
              <div className="border-b border-gray-600 w-full"></div>
              <button className="hover:underline text-lg font-semibold tracking-wider uppercase">SOCIAL NETWORK</button>
              <div className="border-b border-gray-600 w-full"></div>
              <button className="hover:underline text-lg font-semibold tracking-wider uppercase">NEWSLETTER</button>
            </div>
          </div>
        </div>

        <div className="relative h-96 w-full mt-10" onMouseLeave={handleMapMouseLeave}>
          <MapContainer
            center={[40.4169, -3.6922]}
            zoom={15}
            scrollWheelZoom={false}
            dragging={true}
            touchZoom={false}
            doubleClickZoom={false}
            zoomControl={true}
            className="h-full w-full bg-gray-800"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[40.4169, -3.6922]} icon={customIcon} />
          </MapContainer>
          
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-4 text-center text-xs leading-relaxed shadow-lg z-50 pointer-events-none">
            MUSEO DEL ERROBELO<br />Paseo del Prado s/n<br />28014 Madrid<br />Tel: 913 30 28 00
          </div>

          {!mapEnabled && (
            <div 
              onClick={handleMapOverlayClick}
              className="absolute inset-0 bg-black/20 flex items-center justify-center z-40 cursor-pointer"
            >
              <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg">
                <p className="text-gray-800 text-sm font-medium">Click to interact with map</p>
              </div>
            </div>
          )}
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
              <li><Link to="/3d-gallery" className="hover:underline">3D Gallery</Link></li>
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

export default LandingPage;
