import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar.jsx';

// Gallery data - Places to Visit with detailed information
const galleryItems = [
  {
    image: "https://c0.wallpaperflare.com/preview/480/836/1000/sculpture-museum.jpg",
    title: "Greek Antiquities",
    subtitle: "Ancient Masterpieces",
    description: "Explore the magnificent collection of ancient Greek sculptures and artifacts spanning from the Bronze Age through the Hellenistic period.",
    details: "The Greek Antiquities gallery houses some of the most celebrated works of ancient Greek art. From the archaic period's kouroi to the classical era's perfect proportions, witness the evolution of Greek artistry. Marvel at intricate pottery, bronze sculptures, and marble masterpieces that defined Western aesthetic traditions. The collection includes pieces from major archaeological sites across Greece and offers insight into daily life, mythology, and religious practices of ancient civilizations.",
    period: "3000 BCE - 31 BCE",
    highlights: ["Marble Statues", "Ancient Pottery", "Bronze Sculptures", "Funerary Monuments"]
  },
  {
    image: "https://s.inyourpocket.com/gallery/190181.jpg",
    title: "Winged Victory of Samothrace",
    subtitle: "Nike of Samothrace",
    description: "The iconic Hellenistic sculpture of Nike, the Greek goddess of victory, discovered in 1863 on the island of Samothrace.",
    details: "Created around 200-190 BCE, the Winged Victory of Samothrace is one of the greatest masterpieces of Hellenistic sculpture. Standing at the top of the Daru staircase, this dramatic marble sculpture depicts Nike, the goddess of victory, landing on the prow of a ship. Despite missing her head and arms, the sculpture conveys powerful movement through the wind-swept drapery and dynamic pose. The work commemorates a naval victory and demonstrates the Hellenistic artist's mastery in capturing motion, fabric, and anatomy. The sculpture's theatrical presentation on the grand staircase enhances its majesty and makes it one of the museum's most photographed works.",
    period: "200-190 BCE",
    highlights: ["Hellenistic Sculpture", "Marble Masterpiece", "Dynamic Movement", "Naval Victory Monument"]
  },
  {
    image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/07/secrets-20of-20louvre-201.jpeg",
    title: "The Louvre Pyramid",
    subtitle: "Modern Architectural Icon",
    description: "The striking glass and metal pyramid designed by I. M. Pei, serving as the museum's main entrance since 1989.",
    details: "Designed by renowned architect I. M. Pei and completed in 1989, the Louvre Pyramid has become an iconic symbol merging ancient and modern architecture. The large pyramid stands 21.6 meters tall and is surrounded by three smaller pyramids in the Napoleon Courtyard. Made of 603 rhombus-shaped and 70 triangular glass segments, it serves as the main entrance to the museum, flooding the underground lobby with natural light. Initially controversial, the pyramid is now beloved as a bold statement that successfully integrates contemporary design with the historic palace. At night, it illuminates beautifully, creating a stunning contrast with the classical façade.",
    period: "Completed 1989",
    highlights: ["I. M. Pei Design", "Glass Architecture", "Main Entrance", "Modern Icon"]
  },
  {
    image: "https://images.hornblower.com/1200x840/images/tours/hwlkfr/76243ebd-ffee-4893-b5be-ccc453482943.jpeg",
    title: "Mona Lisa",
    subtitle: "La Gioconda",
    description: "Leonardo da Vinci's most famous portrait, painted between 1503-1519, depicting a mysterious woman with an enigmatic smile.",
    details: "The Mona Lisa, painted by Leonardo da Vinci in the early 16th century, is arguably the most famous painting in the world. This portrait of Lisa Gherardini showcases da Vinci's innovative sfumato technique, creating soft, almost imperceptible transitions between colors and tones. Her enigmatic smile has captivated viewers for centuries, while her direct gaze seems to follow observers around the room. The painting's fame grew exponentially after it was stolen in 1911 and recovered two years later. Protected behind bulletproof glass, the Mona Lisa draws millions of visitors annually, making it the museum's most visited work. The portrait exemplifies Renaissance humanism and artistic mastery.",
    period: "1503-1519",
    highlights: ["Leonardo da Vinci", "Sfumato Technique", "Renaissance Masterpiece", "World's Most Famous Painting"]
  },
  {
    image: "https://image.wmsm.co/592d846ec470f/the-egypt-centre-museum-of-egyptian-antiquities-swansea-7.jpg?quality=80&width=1280",
    title: "Egyptian Antiquities",
    subtitle: "Treasures of the Pharaohs",
    description: "An exceptional collection spanning 4,000 years of Egyptian civilization, from the Predynastic period to the Christian era.",
    details: "The Egyptian Antiquities department is one of the museum's most celebrated sections, housing over 50,000 objects. The collection includes monumental sculptures like the Great Sphinx of Tanis, intricate jewelry, mummies, sarcophagi, and everyday objects that illuminate ancient Egyptian life. Visitors can explore the evolution of Egyptian art from the Old Kingdom through the Ptolemaic period. Highlights include the famous Seated Scribe, magnificent temple fragments, elaborate funerary equipment, and exquisite examples of Egyptian craftsmanship in gold and semi-precious stones. The galleries are organized chronologically and thematically, offering insight into religious beliefs, royal power, daily life, and burial practices.",
    period: "4000 BCE - 4th Century CE",
    highlights: ["Great Sphinx of Tanis", "Seated Scribe", "Royal Sarcophagi", "Jewelry and Amulets"]
  },
  {
    image: "https://i.pinimg.com/originals/fb/2f/09/fb2f09e15f51dfb2fc76af563a7e888d.jpg",
    title: "Venus de Milo",
    subtitle: "Aphrodite of Milos",
    description: "This ancient Greek statue, created between 130-100 BCE, depicts Aphrodite, the goddess of love and beauty.",
    details: "Discovered in 1820 on the Greek island of Milos, the Venus de Milo is one of the most famous ancient Greek sculptures. Dating to the Hellenistic period (130-100 BCE), this marble statue stands over 6 feet tall and depicts Aphrodite, the Greek goddess of love and beauty. Despite losing her arms over time, the sculpture remains remarkably expressive, showcasing the classical ideal of female beauty with perfect proportions and graceful contrapposto stance. The unknown sculptor demonstrated exceptional skill in rendering the human form, particularly in the subtle treatment of drapery that clings to and reveals the body beneath. The statue's mysterious incompleteness has only added to its allure and iconic status.",
    period: "130-100 BCE",
    highlights: ["Hellenistic Period", "Marble Sculpture", "Classical Beauty", "Discovered 1820"]
  },
  {
    image: "https://www.fodors.com/wp-content/uploads/2019/06/09_10BestMuseumsRome__PalazzoDoriaPamphilij_shutterstock_1305760189-1600x1067.jpg",
    title: "Italian Renaissance Paintings",
    subtitle: "Masters of the Renaissance",
    description: "A magnificent collection featuring works by Leonardo, Raphael, Titian, Caravaggio, and other Italian masters.",
    details: "The Italian Paintings gallery showcases the artistic revolution that began in 14th-century Italy and transformed Western art forever. This collection spans from the early Renaissance through the Baroque period, featuring masterpieces by Leonardo da Vinci, Raphael, Titian, Veronese, and Caravaggio. Visitors can trace the development of perspective, the revival of classical themes, the perfection of human anatomy representation, and the dramatic use of light and shadow. Notable works include Veronese's massive Wedding Feast at Cana, which faces the Mona Lisa, and Caravaggio's revolutionary Death of the Virgin. The collection demonstrates the period's innovations in technique, composition, and the humanistic approach to religious and secular subjects.",
    period: "14th - 17th Century",
    highlights: ["Renaissance Masters", "Wedding Feast at Cana", "Caravaggio Works", "Venetian School"]
  },
  {
    image: "https://images.squarespace-cdn.com/content/v1/5fcb253e2842004a669a7dd3/1609411415351-0Z3MVH5HLF8WH3AYJKMO/image-asset.jpeg",
    title: "French Decorative Arts",
    subtitle: "Royal Splendor",
    description: "Exquisite examples of French craftsmanship including furniture, tapestries, and objets d'art from the medieval period to the 19th century.",
    details: "The Decorative Arts galleries present the finest examples of French craftsmanship from the Middle Ages through the Second Empire. This stunning collection includes ornate furniture made for royalty, intricate tapestries, elaborate clocks, porcelain, and jewelry that showcase the evolution of French taste and technical mastery. Visitors can admire pieces from the royal collections, including furniture from Versailles, magnificent Sèvres porcelain, and the crown jewels. The red-walled galleries create an appropriately regal setting for these treasures. Highlights include the Apollo Gallery, which houses the French crown jewels, and recreated period rooms that demonstrate how these objects were originally displayed and used in aristocratic settings.",
    period: "Medieval - 19th Century",
    highlights: ["Royal Furniture", "Crown Jewels", "Sèvres Porcelain", "Apollo Gallery"]
  },
  {
    image: "https://idsb.tmgrup.com.tr/ly/uploads/images/2022/04/08/197487.jpg",
    title: "Islamic Art",
    subtitle: "Cultural Crossroads",
    description: "A comprehensive collection spanning 1,300 years of Islamic art from three continents, featuring ceramics, textiles, manuscripts, and metalwork.",
    details: "The Islamic Art department, one of the museum's newest sections, presents masterpieces from Islamic civilizations spanning from Spain to India and covering 13 centuries. The collection includes over 15,000 objects: ceramics with lustrous glazes, intricately woven carpets, illuminated manuscripts with exquisite calligraphy, carved rock crystal, metalwork inlaid with precious metals, and architectural elements. The galleries trace the development of Islamic art across different dynasties and regions, highlighting both religious and secular traditions. Notable pieces include the Baptistère de Saint Louis, Persian miniature paintings, Ottoman textiles, and Mughal jade objects. The undulating glass roof designed by architects Rudy Ricciotti and Mario Bellini creates a magical play of light, evoking traditional Islamic architecture.",
    period: "7th - 19th Century",
    highlights: ["Baptistère de Saint Louis", "Persian Miniatures", "Ottoman Textiles", "Architectural Elements"]
  }
];

function Palace() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPlace || showComingSoon) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPlace, showComingSoon]);

  const handleComingSoon = (e) => {
    e.preventDefault();
    setShowComingSoon(true);
  };

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  const closePlaceModal = () => {
    setSelectedPlace(null);
  };

  return (
    <div className="bg-black text-white font-playfair">
      {/* Navbar Component */}
      <Navbar onLoginClick={() => setShowLoginModal(true)} />

      {/* Hero / Palace Section */}
      <section 
        className="relative w-full min-h-screen flex flex-col items-center justify-center bg-cover bg-center pt-28"
        style={{backgroundImage: "url('https://theotherpaths.com/wp-content/uploads/2020/03/IMG_20191026_120619.jpg')"}}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center max-w-3xl p-6 z-10">
          <h1 className="text-5xl md:text-7xl font-extralight mb-6 tracking-wide">The Palace</h1>
          <p className="text-xl md:text-2xl font-light text-white/90">From the former palace of the French monarchs to the largest museum in the world</p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="max-w-5xl mx-auto py-16 px-6 text-center">
        <h2 className="text-4xl font-light mb-6 tracking-wide"></h2>
      </section>

      {/* Gallery Section */}
      <section className="max-w-7xl mx-auto pb-20 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-lg border border-gray-800 hover:border-museum-gold transition-all duration-300 cursor-pointer"
              onClick={() => handlePlaceClick(item)}
            >
              <div 
                style={{height: index === 0 || index === 1 || index === 2 ? '450px' : '550px'}}
                className="relative overflow-hidden"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition duration-500"></div>
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition duration-300">
                  <p className="text-xs text-museum-gold uppercase tracking-widest mb-2">{item.subtitle}</p>
                  <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition duration-300 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Museum gold accent line */}
                <div className="absolute top-0 left-0 w-0 h-1 bg-museum-gold group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Place Detail Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-black rounded-lg max-w-3xl w-full max-h-[90vh] border-2 border-museum-gold shadow-2xl overflow-hidden flex flex-col">
            {/* Close Button */}
            <button
              onClick={closePlaceModal}
              className="absolute top-4 right-4 z-10 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Header */}
            <div className="relative h-80 flex-shrink-0">
              <img 
                src={selectedPlace.image} 
                alt={selectedPlace.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-museum-gold text-sm uppercase tracking-widest mb-2">{selectedPlace.subtitle}</p>
                <h2 className="text-4xl font-light text-white mb-2">{selectedPlace.title}</h2>
                <p className="text-white/80 text-sm uppercase tracking-wider">{selectedPlace.period}</p>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-8">
              <p className="text-xl text-gray-300 mb-6 leading-relaxed font-light italic">
                {selectedPlace.description}
              </p>

              <div className="text-gray-400 leading-relaxed space-y-4 mb-6">
                <p>{selectedPlace.details}</p>
              </div>

              {/* Highlights */}
              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-white text-lg font-semibold mb-4 uppercase tracking-wider">Highlights</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedPlace.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-museum-gold rounded-full"></div>
                      <span className="text-gray-300 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coming Soon Popup */}
      {showComingSoon && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
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
              <li><Link to="/faqs" className="hover:underline hover:text-white transition-colors">FAQ</Link></li>
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
                  <a 
                    key={social} 
                    href="#" 
                    onClick={handleComingSoon}
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

export default Palace;
