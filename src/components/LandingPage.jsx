import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from './navbar.jsx';

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
  const [mapEnabled, setMapEnabled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showAppsModal, setShowAppsModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const mapRef = useRef(null);
  
  const { login } = useContext(AuthContext);

  // Museum videos data
  const museumVideos = [
    {
      id: 1,
      title: "The restoration of the Arc du Carrousel [ENG subtitles]",
      duration: "7 min",
      thumbnail: ebplus1,
      videoUrl: "https://youtu.be/Z01FoDDyYUM?si=h90Tyy90668-l2P8"
    },
    {
      id: 2,
      title: "The restoration of the Napoleon-III apartments",
      duration: "10 min",
      thumbnail: ebplus2,
      videoUrl: "https://youtu.be/Z01FoDDyYUM?si=h90Tyy90668-l2P8"
    },
    {
      id: 3,
      title: "The Salle des Etats",
      duration: "4 min",
      thumbnail: ebplus3,
      videoUrl: "https://youtu.be/Z01FoDDyYUM?si=h90Tyy90668-l2P8"
    },
    {
      id: 4,
      title: "« Forêt » by Anne Teresa De Keersmaeker and Némo Flouret [ENG subtitles]",
      duration: "7 min",
      thumbnail: ebplus4,
      videoUrl: "https://youtu.be/Z01FoDDyYUM?si=h90Tyy90668-l2P8"
    }
  ];

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

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      setShowLoginModal(false);
      setUsername('');
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleVideoClick = (videoUrl) => {
    window.open(videoUrl, '_blank');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterSuccess(false);
      setNewsletterEmail('');
      setShowNewsletterModal(false);
    }, 2000);
  };

  return (
    <div className="bg-black font-playfair">
      {/* Navbar Component */}
      <Navbar onLoginClick={() => setShowLoginModal(true)} />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setShowLoginModal(false)}
          ></div>
          
          <div className="relative bg-black border-2 border-museum-gold rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-museum-gold/30 p-6 text-center">
              <h2 className="text-3xl font-semibold text-white tracking-wide mb-2">
                MUSEO DEL ERROBELO
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-museum-gold to-transparent w-3/4 mx-auto"></div>
            </div>

            <form onSubmit={handleLogin} className="p-8 space-y-6">
              <div>
                <label className="block text-white/80 text-sm font-light mb-2 tracking-wide">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-museum-gold transition-colors"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-light mb-2 tracking-wide">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-museum-gold transition-colors"
                  placeholder="Enter password"
                  required
                />
              </div>

              {loginError && (
                <p className="text-red-500 text-sm text-center">{loginError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-museum-gold text-white py-3 rounded-full hover:bg-museum-gold/90 transition-all duration-300 font-medium tracking-wide uppercase text-sm shadow-lg hover:shadow-museum-gold/50"
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="w-full text-gray-400 hover:text-white transition-colors text-sm"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

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
          <Link to="/palace" className="relative bg-black/30 backdrop-blur-sm text-white px-16 py-5 rounded-full border-2 border-museum-gold/70 shadow-[0_0_20px_rgba(184,134,11,0.3)] hover:border-museum-gold hover:shadow-[0_0_30px_rgba(184,134,11,0.5)] hover:bg-black/40 transition-all duration-500 overflow-hidden group">
  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-museum-gold/30 to-transparent transition-all duration-600 group-hover:left-full animate-shimmer"></div>
  <span className="relative text-lg tracking-wider uppercase font-light">Begin Your Journey</span>
</Link>

        </div>
      </section>

      {/* ERROBELO+ Section with Video Links */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-5xl text-white font-light mb-16 tracking-wide">
            ERROBELO<span className="text-museum-gold">+</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {museumVideos.map((video) => (
              <div 
                key={video.id}
                onClick={() => handleVideoClick(video.videoUrl)}
                className="relative group cursor-pointer"
              >
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      <div className="w-6 h-6 text-white relative ml-1">
                        <div className="w-0 h-0 border-l-[12px] border-l-current border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-normal text-lg mb-2 leading-tight">
                      {video.title}
                    </h3>
                    <div className="flex items-center text-white/90 text-sm gap-2">
                      <div className="w-4 h-3 border border-current rounded relative">
                        <div className="absolute top-1 left-1 w-1 h-1 bg-current rounded-full"></div>
                      </div>
                      <span className="uppercase tracking-wider font-medium">VIDEO • {video.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Link to="/life-at-museum" className="bg-white text-black rounded-full px-8 py-3 text-lg font-medium shadow hover:bg-gray-100 transition">
              More on ERROBELO
            </Link>
          </div>
        </div>
      </section>

      {/* Collection Gallery with Hover and Click */}
      <section className="bg-black relative overflow-hidden max-h-[700px]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-start">
            <div className="flex flex-col gap-8 w-full md:w-1/3">
              <Link to="/collection" className="group cursor-pointer">
                <img 
                  src={collectionmain1} 
                  alt="Ceiling" 
                  className="rounded-lg object-cover w-full h-96 bg-gray-800 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-museum-gold/20" 
                />
              </Link>
              <Link to="/collection" className="group cursor-pointer">
                <img 
                  src={collectionmain2} 
                  alt="Statue" 
                  className="rounded-lg object-cover w-full h-64 bg-gray-800 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-museum-gold/20" 
                />
              </Link>
            </div>
            
            <div className="flex flex-col gap-8 w-full md:w-1/3 relative">
              <Link to="/collection" className="group cursor-pointer">
                <img 
                  src={collectionmain3} 
                  alt="Relief" 
                  className="rounded-lg object-cover w-full h-56 bg-gray-800 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-museum-gold/20" 
                />
              </Link>
              <Link to="/collection" className="group cursor-pointer">
                <img 
                  src={collectionmain4} 
                  alt="Painting" 
                  className="rounded-lg object-cover w-full h-56 bg-gray-800 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-museum-gold/20" 
                />
              </Link>
              <div className="relative w-full">
                <Link to="/collection" className="group cursor-pointer block">
                  <img 
                    src={collectionmain5} 
                    alt="Ancient Wall" 
                    className="rounded-lg object-cover w-full h-48 bg-gray-800 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-museum-gold/20" 
                  />
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-16 z-30">
                  <Link to="/collection" className="bg-white text-black rounded-full px-8 py-3 text-lg font-medium shadow hover:bg-gray-100 transition">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-8 w-full md:w-1/3">
              <Link to="/collection" className="group cursor-pointer">
                <img 
                  src={collectionmain6} 
                  alt="Tilework" 
                  className="rounded-lg object-cover w-full h-96 bg-gray-800 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-museum-gold/20" 
                />
              </Link>
              <Link to="/collection" className="group cursor-pointer">
                <img 
                  src={collectionmain7} 
                  alt="Statue 2" 
                  className="rounded-lg object-cover w-full h-64 bg-gray-800 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-museum-gold/20" 
                />
              </Link>
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
            <button onClick={() => setShowAppsModal(true)} className="hover:underline hover:text-museum-gold transition-colors">OFFICIAL APPS</button>
            <div className="border-l border-gray-600 h-5"></div>
            <button onClick={() => setShowSocialModal(true)} className="hover:underline hover:text-museum-gold transition-colors">SOCIAL NETWORK</button>
            <div className="border-l border-gray-600 h-5"></div>
            <button onClick={() => setShowNewsletterModal(true)} className="hover:underline hover:text-museum-gold transition-colors">NEWSLETTER</button>
          </div>
          
          <div className="md:hidden px-4 py-4">
            <div className="flex flex-col space-y-4 text-center">
              <button onClick={() => setShowAppsModal(true)} className="hover:underline text-lg font-semibold tracking-wider uppercase hover:text-museum-gold transition-colors">OFFICIAL APPS</button>
              <div className="border-b border-gray-600 w-full"></div>
              <button onClick={() => setShowSocialModal(true)} className="hover:underline text-lg font-semibold tracking-wider uppercase hover:text-museum-gold transition-colors">SOCIAL NETWORK</button>
              <div className="border-b border-gray-600 w-full"></div>
              <button onClick={() => setShowNewsletterModal(true)} className="hover:underline text-lg font-semibold tracking-wider uppercase hover:text-museum-gold transition-colors">NEWSLETTER</button>
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

      {/* Official Apps Modal */}
      {showAppsModal && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
        >
          <div className="relative bg-black rounded-lg p-6 md:p-8 max-w-lg w-full border border-museum-gold shadow-2xl">
            <button
              onClick={() => setShowAppsModal(false)}
              className="absolute top-3 right-3 text-white hover:text-museum-gold transition-colors bg-gray-900 hover:bg-gray-800 rounded-full p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-light text-white mb-6">Official Apps</h3>
            
            <div className="space-y-4">
              <a 
                href="https://apps.apple.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors group"
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">Download on iOS</h4>
                  <p className="text-gray-400 text-sm">Available on the App Store</p>
                </div>
                <svg className="w-5 h-5 text-museum-gold transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <a 
                href="https://play.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors group"
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">Download on Android</h4>
                  <p className="text-gray-400 text-sm">Available on Google Play</p>
                </div>
                <svg className="w-5 h-5 text-museum-gold transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                <p className="text-gray-400 text-sm leading-relaxed">
                  Experience the museum in your pocket. Explore collections, book tickets, and get audio guides on the go.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Social Network Modal */}
      {showSocialModal && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
        >
          <div className="relative bg-black rounded-lg p-6 md:p-8 max-w-lg w-full border border-museum-gold shadow-2xl">
            <button
              onClick={() => setShowSocialModal(false)}
              className="absolute top-3 right-3 text-white hover:text-museum-gold transition-colors bg-gray-900 hover:bg-gray-800 rounded-full p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-light text-white mb-6">Follow Us</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 bg-gray-900 hover:bg-blue-600 rounded-lg transition-colors group">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-white font-medium text-sm">Facebook</span>
              </a>

              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 bg-gray-900 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-lg transition-colors group">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
                <span className="text-white font-medium text-sm">Instagram</span>
              </a>

              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 bg-gray-900 hover:bg-black rounded-lg transition-colors group border hover:border-white">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span className="text-white font-medium text-sm">X (Twitter)</span>
              </a>

              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 bg-gray-900 hover:bg-red-600 rounded-lg transition-colors group">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="text-white font-medium text-sm">YouTube</span>
              </a>

              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 bg-gray-900 hover:bg-red-700 rounded-lg transition-colors group">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.86-.19-2.27.04-3.24l1.35-5.72s-.34-.69-.34-1.7c0-1.6.92-2.78 2.07-2.78.98 0 1.46.74 1.46 1.62 0 .99-.63 2.47-.96 3.84-.27 1.15.58 2.09 1.72 2.09 2.06 0 3.65-2.18 3.65-5.32 0-2.78-2-4.72-4.86-4.72-3.31 0-5.25 2.48-5.25 5.04 0 1 .38 2.06.86 2.64.09.11.1.21.08.32l-.31 1.3c-.05.2-.17.24-.4.15-1.41-.66-2.3-2.73-2.3-4.39 0-3.58 2.6-6.87 7.51-6.87 3.94 0 7 2.81 7 6.56 0 3.91-2.47 7.06-5.89 7.06-1.15 0-2.23-.6-2.6-1.3l-.71 2.7c-.26.98-.95 2.21-1.42 2.96A12 12 0 1 0 12 0z"/>
                </svg>
                <span className="text-white font-medium text-sm">Pinterest</span>
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 p-4 bg-gray-900 hover:bg-blue-700 rounded-lg transition-colors group">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="text-white font-medium text-sm">LinkedIn</span>
              </a>
            </div>

            <div className="mt-6 p-4 bg-gray-900 rounded-lg">
              <p className="text-gray-400 text-sm text-center leading-relaxed">
                Stay connected with daily art inspiration and museum updates
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Modal */}
      {showNewsletterModal && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
        >
          <div className="relative bg-black rounded-lg p-6 md:p-8 max-w-md w-full border border-museum-gold shadow-2xl">
            <button
              onClick={() => {
                setShowNewsletterModal(false);
                setNewsletterSuccess(false);
                setNewsletterEmail('');
              }}
              className="absolute top-3 right-3 text-white hover:text-museum-gold transition-colors bg-gray-900 hover:bg-gray-800 rounded-full p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!newsletterSuccess ? (
              <>
                <h3 className="text-2xl font-light text-white mb-2">Newsletter</h3>
                <p className="text-gray-400 text-sm mb-6">Stay updated with exhibitions, events, and exclusive content</p>
                
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-light mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-museum-gold transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="terms" required className="mt-1" />
                    <label htmlFor="terms" className="text-gray-400 text-xs">
                      I agree to receive newsletters and accept the privacy policy
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-museum-gold text-white py-3 rounded-full hover:bg-museum-gold/90 transition-all duration-300 font-medium text-sm uppercase tracking-wide"
                  >
                    Subscribe
                  </button>
                </form>

                <div className="mt-6 p-4 bg-gray-900 rounded-lg">
                  <p className="text-gray-400 text-xs text-center leading-relaxed">
                    Join 50,000+ art enthusiasts receiving weekly updates
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-light text-white mb-2">Success!</h3>
                <p className="text-gray-400 text-sm">
                  Thank you for subscribing to our newsletter
                </p>
              </div>
            )}
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
