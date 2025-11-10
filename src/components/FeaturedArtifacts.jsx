import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import collectionmain2 from '../assets/collectionmain2.png';

// Image Magnifier Component - Larger zoom area
const ImageMagnifier = ({ src, alt, className }) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);
  const magnifierHeight = 200; // Increased from 150
  const magnifierWidth = 200; // Increased from 150
  const zoomLevel = 2.5;

  const mouseEnter = (e) => {
    const el = e.currentTarget;
    const { width, height } = el.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const mouseLeave = () => {
    setShowMagnifier(false);
  };

  const mouseMove = (e) => {
    const el = e.currentTarget;
    const { top, left } = el.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    setXY([x, y]);
  };

  return (
    <div className="relative inline-block w-full h-full">
      <img
        src={src}
        alt={alt}
        className={className}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onMouseMove={mouseMove}
      />
      <div
        style={{
          display: showMagnifier ? '' : 'none',
          position: 'absolute',
          pointerEvents: 'none',
          height: `${magnifierHeight}px`,
          width: `${magnifierWidth}px`,
          opacity: '1',
          border: '2px solid #B8860B',
          backgroundColor: 'black',
          borderRadius: '4px',
          backgroundImage: `url('${src}')`,
          backgroundRepeat: 'no-repeat',
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifierWidth / 2}px`,
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
          backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          boxShadow: '0 0 20px rgba(184, 134, 11, 0.3)',
          zIndex: 100,
        }}
      />
    </div>
  );
};

const FeaturedArtifacts = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleArtifacts, setVisibleArtifacts] = useState(new Set());
  const [activeArtifact, setActiveArtifact] = useState(null);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [scrollProgress, setScrollProgress] = useState({});
  const sectionsRef = useRef([]);
  const lastScrollY = useRef(0);

  const artifacts = [
    {
      id: 1,
      name: "Ancient Greek Amphora",
      period: "500-450 BCE",
      description: "A masterfully crafted red-figure amphora depicting scenes from Greek mythology. This vessel was used for storing wine and olive oil during symposiums and religious ceremonies.",
      origin: "Athens, Greece",
      material: "Terracotta with red-figure decoration",
      dimensions: "Height: 45 cm, Diameter: 28 cm",
      historicalContext: "Created during the Classical period of ancient Greece, these amphorae were both functional vessels and works of art, often depicting heroes, gods, and scenes from daily life.",
      image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/255154/533046/main-image"
    },
    {
      id: 2,
      name: "Egyptian Canopic Jar",
      period: "1400-1300 BCE",
      description: "Sacred jar used during mummification to store internal organs. Features the head of Imseti, one of the Four Sons of Horus, protector of the liver.",
      origin: "Luxor, Egypt",
      material: "Limestone with painted details",
      dimensions: "Height: 28 cm, Diameter: 15.5 cm",
      historicalContext: "Part of the New Kingdom burial practices, these jars were essential for preserving the deceased's organs for the afterlife. Each of the four jars protected a different organ under the watchful eye of Horus's sons.",
      image: "https://www.britishmuseumshoponline.org/media/catalog/product/n/4/n412830_1_anubis_canopic_jar.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=240&width=240&canvas=240:240"
    },
    {
      id: 3,
      name: "Roman Marble Bust",
      period: "100-200 CE",
      description: "Remarkably preserved marble sculpture of a Roman senator. The intricate details showcase the advanced artistry of the Antonine period, including realistic facial features and draped toga.",
      origin: "Rome, Italy",
      material: "Carrara marble",
      dimensions: "Height: 65 cm, Width: 45 cm",
      historicalContext: "Roman portrait busts were commissioned by wealthy patricians and senators to display their status and preserve their legacy. This example demonstrates the veristic tradition of Roman portraiture.",
      image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/252884/534895/main-image"
    },
    {
      id: 4,
      name: "Ming Dynasty Vase",
      period: "1368-1644 CE",
      description: "Blue and white porcelain vase featuring traditional dragon motifs and cloud patterns. Represents the pinnacle of Chinese ceramic craftsmanship from the imperial kilns of Jingdezhen.",
      origin: "Jingdezhen, China",
      material: "Porcelain with cobalt blue underglaze",
      dimensions: "Height: 58 cm, Diameter: 32 cm",
      historicalContext: "Ming Dynasty blue and white porcelain was highly prized across the world and influenced ceramic traditions from Europe to the Middle East. The dragon motif symbolized imperial power and divine authority.",
      image: "https://images.metmuseum.org/CRDImages/as/original/DP-14605-073.jpg"
    },
    {
      id: 5,
      name: "Mesopotamian Clay Tablet",
      period: "2000-1800 BCE",
      description: "Ancient cuneiform tablet containing administrative records from the Old Babylonian period. One of humanity's earliest forms of written communication, detailing grain distributions and tax records.",
      origin: "Babylon, Mesopotamia",
      material: "Baked clay with cuneiform script",
      dimensions: "Height: 12 cm, Width: 8 cm",
      historicalContext: "Cuneiform writing emerged around 3200 BCE and was used for over 3000 years. These tablets provide invaluable insights into ancient economics, law, literature, and daily life in Mesopotamian civilizations.",
      image: "https://images.metmuseum.org/CRDImages/an/original/DP-13441-001.jpg"
    }
  ];

  // Navbar scroll effect
  useEffect(() => {
    let lastScroll = 0;
    const navbar = document.getElementById('mainNavbar');
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScroll && currentScrollY > 100) {
        navbar?.classList.add('-translate-y-full');
        setScrollDirection('down');
      } else if (currentScrollY < lastScroll) {
        navbar?.classList.remove('-translate-y-full');
        setScrollDirection('up');
      }
      
      lastScrollY.current = currentScrollY;
      lastScroll = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced intersection observer
  useEffect(() => {
    const observers = sectionsRef.current.map((section, index) => {
      if (!section) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const progress = entry.intersectionRatio;
            
            setScrollProgress(prev => ({
              ...prev,
              [index]: progress
            }));

            if (entry.isIntersecting && progress > 0.3) {
              setActiveArtifact(index);
              setVisibleArtifacts(prev => new Set([...prev, index]));
            }
            
            if (!entry.isIntersecting && progress < 0.1) {
              if (activeArtifact === index) {
                setActiveArtifact(null);
              }
            }
          });
        },
        {
          threshold: Array.from({ length: 21 }, (_, i) => i * 0.05),
          rootMargin: '0px'
        }
      );

      observer.observe(section);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [activeArtifact]);

  const getArtifactTransform = (index) => {
    const progress = scrollProgress[index] || 0;
    const isActive = activeArtifact === index;
    const isVisible = visibleArtifacts.has(index);

    if (!isVisible) {
      return {
        opacity: 0,
        scale: 0.85,
        rotateY: scrollDirection === 'down' ? 15 : -15,
        translateZ: -100
      };
    }

    if (isActive) {
      return {
        opacity: Math.min(progress * 2, 1),
        scale: 0.85 + (progress * 0.15),
        rotateY: 0,
        translateZ: 0
      };
    }

    return {
      opacity: 0.4,
      scale: 0.85,
      rotateY: 0,
      translateZ: -30
    };
  };

  return (
    <div className="bg-black text-white font-playfair min-h-screen">
      {/* Navbar */}
      <nav id="mainNavbar" className="fixed w-full z-50 h-28 top-0 transform translate-y-0 transition-transform duration-500 bg-black">
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
      </nav>

      {/* Artifacts Section - Starts directly after navbar */}
      <div className="relative pt-32">
        {artifacts.map((artifact, index) => {
          const transform = getArtifactTransform(index);
          const isActive = activeArtifact === index;
          const progress = scrollProgress[index] || 0;

          return (
            <section
              key={artifact.id}
              ref={(el) => (sectionsRef.current[index] = el)}
              className="min-h-screen flex items-center justify-center relative px-6 md:px-12 lg:px-20 py-20"
            >
              <div className="w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                  
                  {/* Artifact Image with Magnifier */}
                  <div className="order-2 lg:order-1">
                    <div
                      style={{
                        opacity: transform.opacity,
                        transform: `
                          scale(${transform.scale})
                          rotateY(${transform.rotateY}deg)
                          translateZ(${transform.translateZ}px)
                        `,
                        transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      <div className="relative aspect-square max-w-lg mx-auto bg-black/50 rounded-sm overflow-hidden border border-white/10">
                        <ImageMagnifier
                          src={artifact.image}
                          alt={artifact.name}
                          className="w-full h-full object-contain cursor-crosshair"
                        />
                      </div>
                      {/* Hover instruction */}
                      {isActive && (
                        <p className="text-center text-xs text-museum-gold/60 mt-4 tracking-wider uppercase">
                          Hover to magnify
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Information Panel - Font weight increased */}
                  <div className="order-1 lg:order-2">
                    <div
                      style={{
                        opacity: isActive ? Math.min(progress * 1.5, 1) : 0,
                        transform: `translateY(${isActive ? 0 : 30}px)`,
                        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      {/* Period */}
                      <p className="text-xs tracking-[0.3em] uppercase text-museum-gold mb-6 font-normal">
                        {artifact.period}
                      </p>
                      
                      {/* Title */}
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 tracking-wide leading-tight">
                        {artifact.name}
                      </h2>
                      
                      {/* Divider */}
                      <div className="w-16 h-px bg-museum-gold/50 mb-8"></div>
                      
                      {/* Description - Slightly thicker */}
                      <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 font-normal">
                        {artifact.description}
                      </p>

                      {/* Details Grid */}
                      <div className="space-y-4 mb-10">
                        <div className="flex items-start gap-4 text-sm">
                          <span className="text-museum-gold w-24 uppercase tracking-wider text-xs font-medium">Origin</span>
                          <span className="text-gray-400 font-normal">{artifact.origin}</span>
                        </div>
                        
                        <div className="flex items-start gap-4 text-sm">
                          <span className="text-museum-gold w-24 uppercase tracking-wider text-xs font-medium">Material</span>
                          <span className="text-gray-400 font-normal">{artifact.material}</span>
                        </div>
                        
                        <div className="flex items-start gap-4 text-sm">
                          <span className="text-museum-gold w-24 uppercase tracking-wider text-xs font-medium">Size</span>
                          <span className="text-gray-400 font-normal">{artifact.dimensions}</span>
                        </div>
                      </div>

                      {/* Historical Context */}
                      <div className="border-t border-white/10 pt-8">
                        <p className="text-gray-500 text-sm leading-relaxed font-normal">
                          {artifact.historicalContext}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Progress Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex flex-col gap-6">
          {artifacts.map((_, index) => {
            const isActive = activeArtifact === index;
            
            return (
              <button
                key={index}
                onClick={() => {
                  sectionsRef.current[index]?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                  });
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${
                  isActive
                    ? 'bg-museum-gold scale-150'
                    : 'bg-gray-700 hover:bg-museum-gold/50'
                }`}
                aria-label={`Go to ${artifacts[index].name}`}
              />
            );
          })}
        </div>
      </div>

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
};

export default FeaturedArtifacts;
