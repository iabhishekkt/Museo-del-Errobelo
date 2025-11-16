import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar.jsx';
import heroImage from '../assets/image.png';

function ThreeDGallery() {
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const itemsPerPage = 6;

  // Only 6 artifacts
  const allArtifacts = [
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
      fullDescription: "Vasa is a Swedish warship built between 1626 and 1628. The ship sank after sailing roughly 1,300 m into her maiden voyage on 10 August 1628. She fell into obscurity after most of her valuable bronze cannons were salvaged in the 17th century, until she was located again in the late 1950s in a busy shipping area. Salvaged with a largely intact hull in 1961, it was housed in a temporary museum called Wasavarvet until 1988 and then moved to the Vasa Museum in Stockholm. The ship is one of Sweden's most popular tourist attractions and has been seen by over 35 million visitors.",
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
      fullDescription: "This magnificent heraldic badge belonged to Edward of Woodstock, known to history as the Black Prince, the eldest son of King Edward III of England. The badge features the prince's heraldic achievements and was likely worn or displayed during ceremonial occasions. The Black Prince was one of the most successful military commanders of the Hundred Years' War, and his heraldic symbols became iconic representations of medieval English chivalry. The intricate craftsmanship demonstrates the importance of heraldry in medieval society, where such symbols conveyed identity, allegiance, and prestige.",
      sketchfabId: "2f4f2bd7ed9a4ce6b10ac0d1fdec8257",
      thumbnail: "https://media.britishmuseum.org/media/Repository/Documents/2014_10/5_17/0d313238_f698_41ff_9761_a3bb011a6195/mid_00357402_001.jpg"
    }
  ];

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArtifacts = allArtifacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allArtifacts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleSocialShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${selectedArtifact?.name} in 3D at Museo del Errobelo!`);
    
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      instagram: `https://www.instagram.com/`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleComingSoon = (e) => {
    e.preventDefault();
    setShowComingSoon(true);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedArtifact || showDetails || isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedArtifact, showDetails, isFullscreen]);

  return (
    <div className="bg-black text-white font-playfair min-h-screen">
      {/* Navbar Component */}
      <Navbar onLoginClick={() => setShowLoginModal(true)} />

      {/* Main Content */}
      <div className="pt-28">
        {/* Hero Section */}
        <section className="relative w-full">
          <div className="relative h-[calc(100vh-7rem)]">
            <img 
              src={heroImage} 
              alt="3D Gallery" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 z-10 text-white px-4 md:px-8 max-w-7xl mx-auto flex items-center">
              <div>
                <div className="mb-4">
                  <span className="inline-block px-6 py-2 bg-museum-gold/20 border border-museum-gold text-museum-gold rounded-full text-sm uppercase tracking-wider">
                    Interactive Experience
                  </span>
                </div>
                <h1 className="text-6xl md:text-8xl font-extralight mb-6 tracking-wide">
                  3D GALLERY
                </h1>
                <div className="w-24 h-px bg-museum-gold mb-8"></div>
                <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl leading-relaxed">
                  Explore world-famous artifacts in stunning 3D. Rotate, zoom, and examine every detail from the comfort of your home
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3D Models Grid */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-light">Explore Artifacts ({allArtifacts.length} total)</h2>
              {totalPages > 1 && <p className="text-gray-400">Page {currentPage} of {totalPages}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentArtifacts.map(artifact => (
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-museum-gold transition-colors"
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === index + 1
                        ? 'bg-museum-gold text-white'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-museum-gold transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* 3D Viewer Modal (Regular Mode) */}
      {selectedArtifact && !showDetails && !isFullscreen && (
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

            {/* Fullscreen Toggle Button */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-20 z-10 bg-black/70 hover:bg-museum-gold text-white p-3 rounded-full transition-all duration-300"
              title="View Fullscreen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>

            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2.5 rounded-lg z-10 border border-museum-gold/30 hidden md:block">
              <p className="text-white text-xs flex items-center gap-2">
                <span className="text-museum-gold text-base">💡</span> 
                <span className="font-light">Drag to rotate • Scroll to zoom • Right-click to pan</span>
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent p-4 md:p-8 z-10">
              <p className="text-museum-gold text-xs uppercase tracking-widest mb-2 font-semibold">{selectedArtifact.period}</p>
              <h3 className="text-white text-2xl md:text-4xl font-light mb-3 leading-tight">{selectedArtifact.name}</h3>
              <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base leading-relaxed">{selectedArtifact.description}</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(true);
                  }}
                  className="px-6 md:px-8 py-2 md:py-3 bg-museum-gold text-white rounded-full text-sm hover:bg-museum-gold/90 transition-all duration-300 shadow-lg shadow-museum-gold/30 font-medium"
                >
                  View Full Details
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSharePopup(true);
                  }}
                  className="px-6 md:px-8 py-2 md:py-3 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm hover:bg-white/20 transition-all duration-300 border border-white/20 font-medium"
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
      {showDetails && selectedArtifact && !isFullscreen && (
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

              <h2 className="text-4xl md:text-5xl font-light text-white mb-4 leading-tight">{selectedArtifact.name}</h2>
              
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

      {/* Fullscreen 3D Viewer */}
      {isFullscreen && selectedArtifact && (
        <div className="fixed inset-0 z-[10000] bg-black">
          {/* Minimal Top Bar */}
          <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-3 md:p-4 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-white text-sm md:text-base font-light truncate">{selectedArtifact.name}</p>
              <p className="text-museum-gold text-xs">{selectedArtifact.period}</p>
            </div>
            
            <button
              onClick={() => setIsFullscreen(false)}
              className="ml-4 bg-black/70 hover:bg-museum-gold text-white p-2 md:p-3 rounded-full transition-all duration-300"
              title="Exit Fullscreen"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Controls Hint */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full z-20 border border-museum-gold/30 hidden md:block">
            <p className="text-white text-xs flex items-center gap-2">
              <span className="text-museum-gold">💡</span> 
              <span className="font-light">Drag to rotate • Scroll to zoom • Right-click to pan</span>
            </p>
          </div>

          {/* Mobile Touch Hint */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full z-20 border border-museum-gold/30 md:hidden">
            <p className="text-white text-xs flex items-center gap-2">
              <span className="text-museum-gold">💡</span> 
              <span className="font-light">Touch & drag to explore</span>
            </p>
          </div>

          <iframe
            title={`${selectedArtifact.name} - Fullscreen`}
            src={`https://sketchfab.com/models/${selectedArtifact.sketchfabId}/embed?autostart=1&ui_theme=dark&ui_hint=0&ui_infos=0&ui_controls=1&ui_stop=0`}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
          />
        </div>
      )}

      {/* Share Popup - Compact with Icons Only */}
      {showSharePopup && (
        <div className="fixed inset-0 z-[10001] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative bg-gray-900 rounded-lg p-6 md:p-8 max-w-md w-full border border-gray-700">
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
            <p className="text-gray-400 text-sm mb-6">Copy the link or share on social media</p>

            <div className="flex gap-2 mb-6">
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

            {/* Social Media Share - Icons Only in One Line */}
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-sm mb-4">Share on:</p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => handleSocialShare('whatsapp')}
                  className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center transition-colors"
                  title="WhatsApp"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </button>

                <button
                  onClick={() => handleSocialShare('facebook')}
                  className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-colors"
                  title="Facebook"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>

                <button
                  onClick={() => handleSocialShare('twitter')}
                  className="w-12 h-12 rounded-full bg-black hover:bg-gray-900 border border-gray-600 flex items-center justify-center transition-colors"
                  title="X (Twitter)"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>

                <button
                  onClick={() => handleSocialShare('telegram')}
                  className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center transition-colors"
                  title="Telegram"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </button>

                <button
                  onClick={() => handleSocialShare('linkedin')}
                  className="w-12 h-12 rounded-full bg-blue-700 hover:bg-blue-800 flex items-center justify-center transition-colors"
                  title="LinkedIn"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>

                <button
                  onClick={() => {
                    alert('Instagram doesn\'t support direct URL sharing. Please copy the link and share it manually!');
                  }}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex items-center justify-center transition-colors"
                  title="Instagram"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
        <div className="max-w-7xl mx-auto text-center text-xs text-gray-400 py-6">
          <p>© 2025 Museo del Errobelo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default ThreeDGallery;
