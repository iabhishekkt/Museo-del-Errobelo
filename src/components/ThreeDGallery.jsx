import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import collectionmain2 from '../assets/collectionmain2.png';

function ThreeDGallery() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showDetails, setShowDetails] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Comprehensive artifact data with full descriptions
  const artifacts = [
    {
      id: 1,
      name: "The Rosetta Stone",
      category: "ancient",
      period: "196 BCE",
      location: "British Museum, London",
      material: "Granodiorite",
      dimensions: "112.3 cm × 75.7 cm × 28.4 cm",
      description: "Ancient Egyptian granodiorite stele inscribed with decree in three scripts - hieroglyphic, demotic, and Greek",
      fullDescription: "The Rosetta Stone is one of the most important objects in the British Museum as it holds the key to understanding Egyptian hieroglyphs—a script made up of small pictures that was used originally in ancient Egypt for religious texts. The Stone is a broken part of a bigger stone slab that has a message carved into it written in three types of writing: Ancient Egyptian hieroglyphs, Demotic script, and Ancient Greek. The message is a decree (official message) that was issued in Memphis on behalf of King Ptolemy V in 196 BCE. Because the inscriptions say the same thing in three different scripts, the Rosetta Stone became a valuable key to deciphering Egyptian hieroglyphs, thereby opening a window into ancient Egyptian history.",
      sketchfabId: "1e03509704a3490e99a173e53b93e282",
      thumbnail: "https://i.natgeofe.com/n/7c5df0a2-fd71-4fd2-acf8-9489102f736d/534231.JPG"
    },
    {
      id: 2,
      name: "Bust of Nefertiti",
      category: "ancient",
      period: "1345 BCE",
      location: "Neues Museum, Berlin",
      material: "Limestone and Stucco",
      dimensions: "50 cm height",
      description: "Iconic limestone and stucco sculpture of Egyptian Queen Nefertiti, wife of Pharaoh Akhenaten",
      fullDescription: "The Nefertiti Bust is a painted stucco-coated limestone bust of Nefertiti, the Great Royal Wife of Egyptian pharaoh Akhenaten. The work is believed to have been crafted in 1345 BCE by Thutmose because it was found in his workshop in Amarna, Egypt. It is one of the most copied works of ancient Egypt. The bust is notable for exemplifying the understanding Ancient Egyptians had regarding realistic facial proportions. The elegant neck and facial structure, combined with the elaborate crown, make this one of the most recognized images from ancient Egypt. The vibrant colors remain remarkably preserved, particularly the blue crown and the warm skin tones.",
      sketchfabId: "8c60faca6152405e9d35784efa8b9aa1",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Nofretete_Neues_Museum.jpg"
    },
    {
      id: 3,
      name: "Alexandria Library Artifact",
      category: "ancient",
      period: "300 BCE - 200 CE",
      location: "Bibliotheca Alexandrina, Egypt",
      material: "Stone",
      dimensions: "Variable",
      description: "Ancient stone artifact from the legendary Library of Alexandria, center of knowledge in the ancient world",
      fullDescription: "The Library of Alexandria was one of the largest and most significant libraries of the ancient world. Situated in Alexandria, Egypt, the Library was part of a larger research institution called the Mouseion, which was dedicated to the Muses, the nine goddesses of the arts. The library is estimated to have held between 40,000 and 400,000 scrolls at its height. This artifact represents the rich scholarly tradition of ancient Alexandria, where Greek, Egyptian, and other cultures merged to create unprecedented advances in mathematics, astronomy, medicine, and literature. The library's destruction remains one of history's greatest losses of knowledge.",
      sketchfabId: "6c12346529fd4a6b97ed2f84525a5997",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrHyYiupvOI6tFuJl_buxg-OWPMncHEv09FA&s"
    },
    {
      id: 4,
      name: "The Vasa Warship",
      category: "military",
      period: "1628 CE",
      location: "Vasa Museum, Stockholm",
      material: "Oak Wood",
      dimensions: "69 m length, 11.7 m beam",
      description: "17th century Swedish warship that sank on maiden voyage, now fully preserved in Stockholm museum",
      fullDescription: "Vasa is a Swedish warship built between 1626 and 1628. The ship sank after sailing roughly 1,300 m into her maiden voyage on 10 August 1628. She fell into obscurity after most of her valuable bronze cannons were salvaged in the 17th century, until she was located again in the late 1950s in a busy shipping area. Salvaged with a largely intact hull in 1961, it was housed in a temporary museum called Wasavarvet until 1988 and then moved to the Vasa Museum in Stockholm. The ship is one of Sweden's most popular tourist attractions and has been seen by over 35 million visitors. Vasa has become a widely recognized symbol of the Swedish 'great power period' and is today a de facto national emblem.",
      sketchfabId: "8a958b4ee8b545ee8c85f47b66f0566a",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsZdqiF-hhHTgf0Krn3VoV9vreWyK2hGF2AA&s"
    },
    {
      id: 5,
      name: "Asian Buddha Statue",
      category: "religious",
      period: "12th Century CE",
      location: "Asian Art Museum, San Francisco",
      material: "Bronze",
      dimensions: "180 cm height",
      description: "Exquisite Buddhist sculpture from San Francisco's Asian Art Museum collection",
      fullDescription: "This magnificent Buddha statue exemplifies the artistic excellence of medieval Asian sculpture. The serene expression, intricate hand gestures (mudras), and flowing robes demonstrate the sophisticated understanding of both spiritual symbolism and artistic technique. The statue likely served as a focal point for meditation and worship in a Buddhist temple. The craftsmanship involved in casting such large bronze sculptures required immense skill, with artisans creating detailed clay models before casting the final bronze form. The patina that has developed over centuries adds to its historical authenticity and beauty.",
      sketchfabId: "afddebcbd3584294923dc8cbc9f629eb",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/3e/%E5%94%90_%E5%BD%A9%E7%B9%AA%E6%BC%86%E9%87%91%E5%A4%BE%E7%B4%B5%E9%98%BF%E5%BD%8C%E9%99%80%E4%BD%9B%E5%83%8F-Buddha%2C_Probably_Amitabha_%28Amituofo%29_MET_DP170964.jpg"
    },
    {
      id: 6,
      name: "Badge of the Black Prince",
      category: "military",
      period: "1376 CE",
      location: "British Museum, London",
      material: "Gilt Copper Alloy",
      dimensions: "29 cm diameter",
      description: "Medieval heraldic badge of Edward the Black Prince, son of King Edward III of England",
      fullDescription: "This magnificent heraldic badge belonged to Edward of Woodstock, known to history as the Black Prince, the eldest son of King Edward III of England. The badge features the prince's heraldic achievements and was likely worn or displayed during ceremonial occasions. The Black Prince was one of the most successful military commanders of the Hundred Years' War, and his heraldic symbols became iconic representations of medieval English chivalry. The intricate craftsmanship demonstrates the importance of heraldry in medieval society, where such symbols conveyed identity, allegiance, and prestige. The badge's preservation provides invaluable insights into 14th-century metalworking techniques and royal iconography.",
      sketchfabId: "2f4f2bd7ed9a4ce6b10ac0d1fdec8257",
      thumbnail: "https://media.britishmuseum.org/media/Repository/Documents/2014_10/5_17/0d313238_f698_41ff_9761_a3bb011a6195/mid_00357402_001.jpg"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Artifacts' },
    { id: 'ancient', name: 'Ancient Civilizations' },
    { id: 'military', name: 'Military & Warfare' },
    { id: 'religious', name: 'Religious Objects' }
  ];

  const filteredArtifacts = activeCategory === 'all' 
    ? artifacts 
    : artifacts.filter(a => a.category === activeCategory);

  // Copy link to clipboard
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // Navbar scroll effect
  useEffect(() => {
    let lastScroll = 0;
    const navbar = document.getElementById('mainNavbar');
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (navbar) {
        if (currentScrollY > lastScroll && currentScrollY > 100) {
          navbar.classList.add('-translate-y-full');
        } else {
          navbar.classList.remove('-translate-y-full');
        }
      }
      lastScroll = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedArtifact || showDetails) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedArtifact, showDetails]);

  return (
    <div className="bg-black text-white font-playfair min-h-screen">
      {/* Navbar - Same as before */}
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
                  <Link to="/boutique" className="text-white/80 hover:text-museum-gold transition-colors text-sm border border-white/20 px-6 py-2 rounded-full hover:bg-white/10">
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
              <Link to="/" className="text-white hover:text-museum-gold transition-colors text-sm">Home</Link>
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
                </button>
                
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[800px] bg-black border-t-2 border-museum-gold opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="flex">
                    <div className="w-1/2 p-8 space-y-4">
                      <Link to="/boutique" className="block text-white hover:text-museum-gold transition-colors text-lg font-light">Online boutique</Link>
                      <Link to="/support" className="block text-white hover:text-museum-gold transition-colors text-lg font-light">Support the Errobelo</Link>
                      <Link to="/3d-gallery" className="block text-white hover:text-museum-gold transition-colors text-lg font-light">3D Gallery</Link>
                    </div>
                    
                    <div className="w-1/2 p-8 bg-gray-900">
                      <div className="relative">
                        <img src={collectionmain2} alt="Support" className="w-full h-48 object-cover rounded" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white text-black px-3 py-1 text-xs font-medium rounded">Become a Patron</span>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Link to="/support" className="flex items-center text-white hover:text-museum-gold transition-colors">
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

      {/* Hero Section with Background Image */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554907984-15263bfd63bd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXJ0JTIwbXVzZXVtfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000" 
            alt="Museum Interior" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="mb-4">
            <span className="inline-block px-6 py-2 bg-museum-gold/20 border border-museum-gold text-museum-gold rounded-full text-sm uppercase tracking-wider">
              Interactive Experience
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-extralight mb-6 tracking-wide">
            3D GALLERY
          </h1>
          <div className="w-24 h-px bg-museum-gold mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
            Explore world-famous artifacts in stunning 3D. Rotate, zoom, and examine every detail from the comfort of your home
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-black border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-museum-gold text-white shadow-lg shadow-museum-gold/30'
                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Models Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtifacts.map(artifact => (
              <div
                key={artifact.id}
                onClick={() => setSelectedArtifact(artifact)}
                className="group relative bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-museum-gold transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <div className="relative h-96">
                  <img
                    src={artifact.thumbnail}
                    alt={artifact.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = "https://cdn.britannica.com/73/102573-050-4D3B1A89/Rosetta-Stone-British-Museum-London.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
                  
                  <div className="absolute top-4 right-4 bg-museum-gold text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 3.5L2 8l8 4.5L18 8l-8-4.5z"/>
                      <path d="M2 12l8 4.5 8-4.5"/>
                      <path d="M2 16l8 4.5 8-4.5"/>
                    </svg>
                    VIEW IN 3D
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-museum-gold text-xs uppercase tracking-widest mb-2 font-semibold">{artifact.period}</p>
                    <h3 className="text-white text-2xl font-light mb-2 leading-tight">{artifact.name}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2 opacity-90">{artifact.description}</p>
                    
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center text-museum-gold text-sm">
                        Click to explore 
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Viewer Modal */}
      {selectedArtifact && !showDetails && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-6xl h-[85vh] bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedArtifact(null)}
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-museum-gold text-white p-3 rounded-full transition-all duration-300 hover:rotate-90"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2.5 rounded-lg z-10 border border-museum-gold/30">
              <p className="text-white text-xs flex items-center gap-2">
                <span className="text-museum-gold text-base">💡</span> 
                <span className="font-light">Drag to rotate • Scroll to zoom • Right-click to pan</span>
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent p-8 z-10">
              <p className="text-museum-gold text-xs uppercase tracking-widest mb-2 font-semibold">{selectedArtifact.period}</p>
              <h3 className="text-white text-4xl font-light mb-3 leading-tight">{selectedArtifact.name}</h3>
              <p className="text-gray-300 mb-6 text-base leading-relaxed">{selectedArtifact.description}</p>
              <div className="flex gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(true);
                  }}
                  className="px-8 py-3 bg-museum-gold text-white rounded-full text-sm hover:bg-museum-gold/90 transition-all duration-300 shadow-lg shadow-museum-gold/30 font-medium"
                >
                  View Full Details
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSharePopup(true);
                  }}
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm hover:bg-white/20 transition-all duration-300 border border-white/20 font-medium"
                >
                  Share Model
                </button>
              </div>
            </div>

            <iframe
              title={selectedArtifact.name}
              src={`https://sketchfab.com/models/${selectedArtifact.sketchfabId}/embed?autostart=1&ui_theme=dark&ui_hint=0&ui_infos=0&ui_controls=1&ui_stop=0`}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
            />
          </div>
        </div>
      )}

      {/* Full Details Modal */}
      {showDetails && selectedArtifact && (
        <div className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-gray-900 rounded-lg overflow-hidden shadow-2xl my-8">
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-museum-gold text-white p-3 rounded-full transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1 bg-museum-gold/20 border border-museum-gold text-museum-gold rounded-full text-xs uppercase tracking-wider">
                  {selectedArtifact.category}
                </span>
                <span className="text-gray-400 text-sm">{selectedArtifact.period}</span>
              </div>

              <h2 className="text-5xl font-light text-white mb-4 leading-tight">{selectedArtifact.name}</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Location</p>
                  <p className="text-white text-sm">{selectedArtifact.location}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Material</p>
                  <p className="text-white text-sm">{selectedArtifact.material}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Dimensions</p>
                  <p className="text-white text-sm">{selectedArtifact.dimensions}</p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

              <h3 className="text-2xl font-light text-white mb-4">About This Artifact</h3>
              <p className="text-gray-300 text-base leading-relaxed mb-8">
                {selectedArtifact.fullDescription}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-8 py-3 bg-museum-gold text-white rounded-full text-sm hover:bg-museum-gold/90 transition-all duration-300 shadow-lg font-medium"
                >
                  Back to 3D View
                </button>
                <button 
                  onClick={() => setShowSharePopup(true)}
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm hover:bg-white/20 transition-all duration-300 border border-white/20 font-medium"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Popup */}
      {showSharePopup && (
        <div className="fixed inset-0 z-[10001] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative bg-gray-900 rounded-lg p-8 max-w-md w-full border border-gray-700">
            <button
              onClick={() => {
                setShowSharePopup(false);
                setCopySuccess(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-light text-white mb-4">Share This Artifact</h3>
            <p className="text-gray-400 text-sm mb-6">Copy the link below to share this 3D model</p>

            <div className="flex gap-2">
              <input
                type="text"
                value={window.location.href}
                readOnly
                className="flex-1 bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-museum-gold"
              />
              <button
                onClick={handleShare}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  copySuccess
                    ? 'bg-green-600 text-white'
                    : 'bg-museum-gold text-white hover:bg-museum-gold/90'
                }`}
              >
                {copySuccess ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </span>
                ) : (
                  'Copy'
                )}
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
              <li><Link to="/3d-gallery" className="hover:underline hover:text-white transition-colors">3D Gallery</Link></li>
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
            <Link to="/legal" className="hover:underline hover:text-white transition-colors">Legal Notice</Link>
            <Link to="/privacy" className="hover:underline hover:text-white transition-colors">Privacy policy</Link>
            <Link to="/cookies" className="hover:underline hover:text-white transition-colors">Cookies</Link>
            <Link to="/credits" className="hover:underline hover:text-white transition-colors">Credits</Link>
            <Link to="/copyrights" className="hover:underline hover:text-white transition-colors">Copyrights</Link>
          </div>
          <p className="mt-4">© 2025 Museo del Errobelo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ThreeDGallery;
