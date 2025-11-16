import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';

// Categories data with detailed descriptions
const categories = [
  {
    title: "Publications",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80",
    shortDescription: "Museum catalogs and art books",
    fullDescription: "Explore our extensive collection of museum catalogs, art books, and scholarly publications. Each publication offers deep insights into our collections, featuring high-quality reproductions and expert commentary from leading art historians and curators.",
    highlights: ["Exhibition Catalogs", "Art History Books", "Collection Guides", "Research Publications"],
    priceRange: "€15 - €120"
  },
  {
    title: "Art Workshops",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80",
    shortDescription: "Sculpture replicas and masterpieces",
    fullDescription: "Discover exquisite replicas of our most celebrated sculptures and artworks. Each piece is meticulously crafted using traditional techniques and materials, bringing museum-quality art into your home. Perfect for collectors and art enthusiasts.",
    highlights: ["Museum-Quality Replicas", "Limited Editions", "Bronze Sculptures", "Marble Reproductions"],
    priceRange: "€80 - €500"
  },
  {
    title: "Print on Demand",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80",
    shortDescription: "Custom art prints and posters",
    fullDescription: "Create your own custom prints from thousands of artworks in our collection. Available in various sizes and premium paper options, each print is produced using archival-quality inks to ensure lasting beauty and color accuracy.",
    highlights: ["Custom Sizes Available", "Museum-Grade Prints", "Framing Options", "Limited Edition Prints"],
    priceRange: "€25 - €200"
  },
  {
    title: "Images & Stationery",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80",
    shortDescription: "Postcards and notebooks",
    fullDescription: "Beautiful stationery inspired by masterpieces from our collection. From elegant postcards to luxurious notebooks, each item features stunning artwork and premium materials perfect for gifts or personal use.",
    highlights: ["Art Postcards", "Luxury Notebooks", "Greeting Cards", "Writing Sets"],
    priceRange: "€3 - €35"
  },
  {
    title: "Fashion & Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    shortDescription: "Scarves, bags and accessories",
    fullDescription: "Elevate your style with our exclusive fashion collection inspired by iconic artworks. Each piece is designed in collaboration with renowned fashion designers, featuring silk scarves, elegant bags, and sophisticated accessories.",
    highlights: ["Silk Scarves", "Designer Bags", "Fashion Accessories", "Limited Collections"],
    priceRange: "€45 - €350"
  },
  {
    title: "Jewellery",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
    shortDescription: "Elegant museum-inspired pieces",
    fullDescription: "Discover our collection of fine jewelry inspired by ancient treasures and artistic masterpieces. Each piece is carefully crafted using precious metals and stones, combining historical motifs with contemporary design.",
    highlights: ["Gold & Silver Pieces", "Precious Stones", "Ancient-Inspired Designs", "Handcrafted Items"],
    priceRange: "€60 - €800"
  },
  {
    title: "Homeware",
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80",
    shortDescription: "Decorative objects and tableware",
    fullDescription: "Transform your living space with our curated homeware collection. From elegant vases to sophisticated tableware, each piece brings museum aesthetics into your everyday life with exceptional quality and timeless design.",
    highlights: ["Decorative Vases", "Fine Tableware", "Textile Art", "Sculptural Objects"],
    priceRange: "€30 - €250"
  },
  {
    title: "Kids",
    image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600&q=80",
    shortDescription: "Educational games and toys",
    fullDescription: "Inspire young minds with our educational toys and games designed to introduce children to art and culture. Each product combines fun and learning, featuring puzzles, activity books, and creative kits based on museum masterpieces.",
    highlights: ["Educational Puzzles", "Art Activity Kits", "Creative Games", "Children's Books"],
    priceRange: "€10 - €60"
  }
];

// Collaborations data
const collaborations = [
  {
    name: "Renaissance Collection",
    designer: "Artisan Series",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
    description: "A stunning collaboration bringing Renaissance masterpieces to life through contemporary design. This collection features handcrafted items inspired by the golden age of art.",
    items: ["Silk Scarves", "Leather Goods", "Home Décor", "Fine Jewelry"],
    launchDate: "Spring 2025"
  },
  {
    name: "Classical Heritage",
    designer: "Museum Edition",
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
    description: "Celebrating the timeless beauty of classical art, this exclusive line combines ancient motifs with modern craftsmanship. Each piece tells a story of cultural heritage.",
    items: ["Porcelain Sets", "Bronze Sculptures", "Textiles", "Art Prints"],
    launchDate: "Available Now"
  },
  {
    name: "Modern Masters",
    designer: "Contemporary Line",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    description: "A bold collection inspired by 20th-century art movements. Modern Masters brings abstract expressionism and contemporary design into your everyday life.",
    items: ["Fashion Accessories", "Wall Art", "Furniture", "Lighting"],
    launchDate: "Summer 2025"
  },
  {
    name: "Ancient Elegance",
    designer: "Heritage Collection",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80",
    description: "Inspired by ancient civilizations, this collection showcases the sophistication of historical design. From Egyptian motifs to Greek patterns, each piece is a work of art.",
    items: ["Jewelry Collection", "Decorative Objects", "Luxury Scarves", "Art Books"],
    launchDate: "Available Now"
  }
];

function Boutique() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCollab, setSelectedCollab] = useState(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedCategory || selectedCollab || showComingSoon) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedCategory, selectedCollab, showComingSoon]);

  const handleComingSoon = (e) => {
    e.preventDefault();
    setShowComingSoon(true);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCollabClick = (collab) => {
    setSelectedCollab(collab);
  };

  return (
    <div className="bg-black text-white font-playfair min-h-screen">
      {/* Navbar Component */}
      <Navbar onLoginClick={() => setShowLoginModal(true)} />

      {/* Main Content with proper spacing */}
      <div className="pt-28">
        {/* Hero Section */}
        <section className="relative w-full h-[350px]">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80" 
            alt="Online Boutique" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl md:text-6xl font-extralight tracking-wide mb-3">ONLINE BOUTIQUE</h1>
            <p className="text-lg md:text-xl font-light">Curated collections inspired by timeless art</p>
          </div>
        </section>

        {/* Categories Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-extralight mb-12 tracking-wide">CATEGORIES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index}
                onClick={() => handleCategoryClick(category)}
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
              >
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-xl font-semibold mb-1">{category.title}</h3>
                  <p className="text-sm text-white/80">{category.shortDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Collaborations Section */}
        <section className="bg-gradient-to-b from-black to-gray-900 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-extralight tracking-wide">COLLABORATIONS</h2>
              <a href="#" onClick={handleComingSoon} className="text-museum-gold hover:text-museum-gold/80 transition-colors text-sm flex items-center gap-2">
                View all
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {collaborations.map((collab, index) => (
                <div 
                  key={index}
                  onClick={() => handleCollabClick(collab)}
                  className="group relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer"
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
                </div>
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
            <a 
              href="#"
              onClick={handleComingSoon}
              className="bg-museum-gold text-white px-10 py-3 rounded-full font-medium hover:bg-museum-gold/90 transition-colors text-sm cursor-pointer"
            >
              Explore Collection
            </a>
          </div>
        </section>
      </div>

      {/* Category Detail Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-black rounded-lg max-w-3xl w-full max-h-[90vh] border-2 border-museum-gold shadow-2xl overflow-hidden flex flex-col">
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-4 right-4 z-10 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative h-80 flex-shrink-0">
              <img 
                src={selectedCategory.image} 
                alt={selectedCategory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="text-4xl font-light text-white mb-2">{selectedCategory.title}</h2>
                <p className="text-white/80 text-sm uppercase tracking-wider">{selectedCategory.priceRange}</p>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-8">
              <p className="text-xl text-gray-300 mb-6 leading-relaxed font-light">
                {selectedCategory.fullDescription}
              </p>

              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-white text-lg font-semibold mb-4 uppercase tracking-wider">Product Highlights</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedCategory.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-museum-gold rounded-full"></div>
                      <span className="text-gray-300 text-sm">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleComingSoon}
                className="w-full mt-6 px-6 py-3 bg-museum-gold text-white rounded-lg hover:bg-museum-gold/90 transition-colors text-sm font-medium"
              >
                Shop {selectedCategory.title}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collaboration Detail Modal */}
      {selectedCollab && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-black rounded-lg max-w-3xl w-full max-h-[90vh] border-2 border-museum-gold shadow-2xl overflow-hidden flex flex-col">
            <button
              onClick={() => setSelectedCollab(null)}
              className="absolute top-4 right-4 z-10 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative h-80 flex-shrink-0">
              <img 
                src={selectedCollab.image} 
                alt={selectedCollab.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-museum-gold text-sm uppercase tracking-widest mb-2">{selectedCollab.designer}</p>
                <h2 className="text-4xl font-light text-white mb-2">{selectedCollab.name}</h2>
                <p className="text-white/80 text-sm">{selectedCollab.launchDate}</p>
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-8">
              <p className="text-xl text-gray-300 mb-6 leading-relaxed font-light">
                {selectedCollab.description}
              </p>

              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-white text-lg font-semibold mb-4 uppercase tracking-wider">Collection Includes</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedCollab.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-museum-gold rounded-full"></div>
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleComingSoon}
                className="w-full mt-6 px-6 py-3 bg-museum-gold text-white rounded-lg hover:bg-museum-gold/90 transition-colors text-sm font-medium"
              >
                Explore {selectedCollab.name}
              </button>
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

export default Boutique;
