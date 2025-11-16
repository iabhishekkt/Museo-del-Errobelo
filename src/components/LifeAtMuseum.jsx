import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

// Import local images
import heroImage from '../assets/image.png';

function LifeAtMuseum() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Fetch news from The Guardian API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = 'test';
        const url = `https://content.guardianapis.com/search?q=museum OR art OR gallery OR exhibition OR artifact&show-fields=thumbnail,trailText,body&page-size=6&api-key=${apiKey}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.response && data.response.results) {
          const articles = data.response.results.map(article => ({
            title: article.webTitle,
            description: article.fields?.trailText || 'Click to read more about this story.',
            urlToImage: article.fields?.thumbnail || 'https://via.placeholder.com/400x300?text=Museum+News',
            content: article.fields?.body?.substring(0, 500) || article.fields?.trailText,
            publishedAt: article.webPublicationDate,
            url: article.webUrl,
            source: { name: 'The Guardian' }
          }));
          setNews(articles);
        } else {
          setNews(mockNewsData);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setNews(mockNewsData);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedArticle || showComingSoon) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedArticle, showComingSoon]);

  const handleComingSoon = (e) => {
    e.preventDefault();
    setShowComingSoon(true);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const closeArticleModal = () => {
    setSelectedArticle(null);
  };

  // Mock data as fallback
  const mockNewsData = [
    {
      title: 'This painting doesn\'t lose complexity the longer you look at it – it grows richer.',
      description: 'The Portrait of King Charles I of England, by Anthony van Dyck, returns to the gallery walls after over a year.',
      urlToImage: 'https://www.rd.com/wp-content/uploads/2024/05/GettyImages-2152375446-scaled-e1716936778118.jpg',
      content: 'After extensive restoration work, this masterpiece by Anthony van Dyck has returned to public display. The painting showcases the artist\'s exceptional skill in capturing royal dignity and character. Conservation experts spent over 18 months carefully cleaning and preserving this important work of art.',
      publishedAt: '2024-11-15T10:30:00Z',
      url: '#',
      source: { name: 'Art Daily' }
    },
    {
      title: 'Say it with a bench!',
      description: 'The Errobelo is launching a campaign to restore benches from the museum gardens dating back to the 19th century.',
      urlToImage: 'https://www.parisinsidersguide.com/image-files/tuileries-jardin-palace-palais-engraving-700-2x1.jpg',
      content: 'These historic benches have provided rest for countless visitors over the centuries. The restoration campaign aims to preserve these pieces of living history while maintaining their original character.',
      publishedAt: '2024-11-14T14:20:00Z',
      url: '#',
      source: { name: 'Museum News' }
    },
    {
      title: 'Conservation treatment on the Arc de triomphe del Carrousel',
      description: 'The conservation treatment began in Nov 2022 and will be completed by summer 2024.',
      urlToImage: 'https://fondation-ca-paysdefrance.org/wp-content/uploads/2019/12/oo-louvre-arc-carrousel-006-1024x684.jpg',
      content: 'This ambitious conservation project represents a significant investment in preserving France\'s cultural heritage. Specialists are using advanced techniques to clean and stabilize the monument.',
      publishedAt: '2024-11-13T09:15:00Z',
      url: '#',
      source: { name: 'Heritage Conservation Weekly' }
    },
    {
      title: 'A Masterpiece of the Errobelo',
      description: 'Creative figures are invited to highlight selected works each Thursday.',
      urlToImage: 'https://i.la-croix.com/1400x933/smart/2023/12/05/1134744-cette-photographie-prise-le-5-decembre-2023-montre-meidias-hydria-un-vase-grec-vieux-de-2-500-ans-prete-par-le-musee-britannique-presente-dans-l-exposition-temporaire-intitulee-significations-au-musee-de-l-acropole-a-athenes.jpg',
      content: 'The museum\'s new initiative brings together artists, curators, and cultural figures to share their perspectives on masterpieces from the collection.',
      publishedAt: '2024-11-12T16:45:00Z',
      url: '#',
      source: { name: 'Cultural Insights' }
    },
    {
      title: 'Barthélémy Toguo - Contemporary Installation',
      description: 'This powerful installation beneath the main hall offers fresh perspective on objects and migration.',
      urlToImage: 'https://artlogic-res.cloudinary.com/w_600,c_limit,f_auto,fl_lossy,q_auto/artlogicstorage/galerielelong/images/view/57df02f3354949ebff3622d67f0b5000j/galerielelong-barth-l-my-toguo-caring-for-memory-2023.jpg',
      content: 'Barthélémy Toguo\'s installation challenges viewers to reconsider the relationship between cultural artifacts and human movement.',
      publishedAt: '2024-11-11T11:30:00Z',
      url: '#',
      source: { name: 'Contemporary Art Review' }
    },
    {
      title: 'Three New Papyri for the Errobelo',
      description: 'A rare anthology of scribal writings now enriches the museum\'s exceptional collection.',
      urlToImage: 'https://www.pearlofgreatpricecentral.org/wp-content/uploads/2019/10/Picture1-2.png',
      content: 'These newly acquired papyri represent significant additions to our understanding of ancient writing and administrative practices.',
      publishedAt: '2024-11-10T08:00:00Z',
      url: '#',
      source: { name: 'Archaeological News' }
    }
  ];

  return (
    <div className="bg-black font-playfair">
      {/* Navbar Component */}
      <Navbar onLoginClick={() => setShowLoginModal(true)} />

      {/* Hero Section */}
      <section className="relative w-full pt-28">
        <div className="relative h-[calc(100vh-7rem)]">
          <img src={heroImage} alt="Life at the Museum" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 z-10 text-white px-4 md:px-8 max-w-7xl mx-auto flex items-center">
            <div>
              <h1 className="text-6xl md:text-8xl font-extralight mb-4 leading-tight tracking-wide">Life at the Museum</h1>
              <p className="text-3xl md:text-4xl font-light opacity-90 tracking-wide">All the news</p>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-museum-gold border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white text-xl">Loading latest news...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.slice(0, 3).map((article, index) => (
                <div 
                  key={index} 
                  className="group cursor-pointer"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="relative h-80 rounded-lg overflow-hidden border border-gray-800 hover:border-museum-gold transition-all duration-300">
                    <img 
                      src={article.urlToImage} 
                      alt={article.title} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Museum+News';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                      <h3 className="text-white font-normal text-lg mb-2 leading-tight line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed line-clamp-3">
                        {article.description}
                      </p>
                      <p className="text-museum-gold text-xs mt-2 uppercase tracking-wider">
                        {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* More from the Museum Section */}
      <section className="bg-black py-24 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-5xl font-light mb-16 text-white tracking-wide">More from the Museum</h2>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-museum-gold border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white text-xl">Loading more stories...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.slice(3, 6).map((article, index) => (
                <div 
                  key={index} 
                  className="group cursor-pointer"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="relative h-80 rounded-lg overflow-hidden border border-gray-800 hover:border-museum-gold transition-all duration-300">
                    <img 
                      src={article.urlToImage} 
                      className="w-full h-full object-cover" 
                      alt={article.title}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Museum+News';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                      <h3 className="text-white font-normal text-lg mb-2 leading-tight line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed line-clamp-3">
                        {article.description}
                      </p>
                      <p className="text-museum-gold text-xs mt-2 uppercase tracking-wider">
                        {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Article Detail Modal - FIXED SIZE & SCROLL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-black rounded-lg max-w-2xl w-full max-h-[85vh] border-2 border-museum-gold shadow-2xl overflow-hidden flex flex-col">
            {/* Close Button */}
            <button
              onClick={closeArticleModal}
              className="absolute top-4 right-4 z-10 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image Header */}
            <div className="relative h-64 flex-shrink-0">
              <img 
                src={selectedArticle.urlToImage} 
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=Museum+News';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-6">
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                <span className="text-museum-gold uppercase tracking-wider">
                  {selectedArticle.source?.name || 'Museum News'}
                </span>
                <span>•</span>
                <span>
                  {new Date(selectedArticle.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>

              <h2 className="text-3xl font-light text-white mb-4 leading-tight">
                {selectedArticle.title}
              </h2>

              <p className="text-lg text-gray-300 mb-6 leading-relaxed font-light">
                {selectedArticle.description}
              </p>

              <div className="text-gray-400 leading-relaxed space-y-4">
                <p>{selectedArticle.content || selectedArticle.description}</p>
              </div>

              {selectedArticle.url && selectedArticle.url !== '#' && (
                <div className="mt-6 pt-4 border-t border-gray-800">
                  <a
                    href={selectedArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-museum-gold hover:text-white transition-colors"
                  >
                    <span>Read full article</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Coming Soon Popup - FIXED SIZE */}
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

export default LifeAtMuseum;
