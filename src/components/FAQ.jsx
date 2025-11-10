import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LanguageDropdown from './LanguageDropdown';

// Import image
import faqHeader from '../assets/faqheader.png';
import collectionmain2 from '../assets/collectionmain2.png';

// FAQ Data
const faqData = {
  tickets: {
    title: "Tickets and prices",
    questions: [
      {
        q: "How can I buy a ticket at concession price?",
        a: (
          <>
            <p className="mb-3">The museum does not offer reduced-rate tickets. All tickets include admission to the museum's permanent collections and temporary exhibitions. However, admission is free for certain visitors.</p>
            <p className="text-gray-300 hover:underline cursor-pointer">See free admission conditions.</p>
          </>
        )
      },
      {
        q: "Can I buy fast-track tickets?",
        a: (
          <>
            <p className="mb-3">To ensure admission on the day of your choice, purchase your tickets online.</p>
            <p className="mb-3">Carte Louvre holders have priority access via the Richelieu entrance.</p>
            <p>Groups who have booked a time slot have priority access via the Richelieu entrance.</p>
          </>
        )
      },
      {
        q: "Can I get a refund?",
        a: (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <p className="text-white font-medium mb-2">Refund Policy:</p>
            <p className="text-white mb-3">Tickets are valid for the chosen time and date only, and cannot be modified, exchanged or refunded.</p>
            <p className="text-white">However, in the event of a cancellation by the Louvre, you will be entitled to a refund.</p>
          </div>
        )
      },
      {
        q: "Can I use my ticket to access temporary exhibitions?",
        a: (
          <>
            <p className="mb-3">Tickets include admission to all Louvre collections and temporary exhibitions.</p>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <p className="text-white"><strong>Note:</strong> For access to exhibitions in the Hall Napoléon, visitors must book a specific time slot.</p>
            </div>
          </>
        )
      }
    ]
  },
  visiting: {
    title: "While visiting",
    questions: [
      {
        q: "What are the museum opening hours?",
        a: (
          <>
            <p className="mb-3">The Errobelo is open every day except Tuesday from 9am to 6pm.</p>
            <p className="mb-3">On Wednesday and Friday evenings, the museum stays open until 9:45pm.</p>
            <p>The museum is closed on January 1, May 1, and December 25.</p>
          </>
        )
      },
      {
        q: "Can I take photos inside the museum?",
        a: (
          <>
            <p className="mb-3">Photography is permitted in the permanent collection galleries, but flash photography is prohibited.</p>
            <p>Photography may be restricted in certain temporary exhibitions.</p>
          </>
        )
      }
    ]
  },
  families: {
    title: "Children and families",
    questions: [
      {
        q: "Do children need tickets?",
        a: (
          <>
            <p className="mb-3">Admission is free for visitors under 18 and for 18-25 year-olds who are residents of the European Economic Area.</p>
            <p>However, all visitors, including those entitled to free admission, must book a time-stamped ticket online.</p>
          </>
        )
      },
      {
        q: "Are strollers allowed in the museum?",
        a: (
          <>
            <p className="mb-3">Strollers are welcome throughout the museum.</p>
            <p>Baby changing facilities are available on each floor of the museum.</p>
          </>
        )
      }
    ]
  },
  groups: {
    title: "Groups",
    questions: [
      {
        q: "How do I book a group visit?",
        a: (
          <>
            <p className="mb-3">Group bookings must be made online in advance. A group consists of 7 to 25 people.</p>
            <p className="mb-3">Groups must use the Passage Richelieu entrance.</p>
            <p>Guided tours are available for an additional fee.</p>
          </>
        )
      },
      {
        q: "What are the group rates?",
        a: (
          <>
            <p className="mb-3">Group tickets must be purchased online by bank transfer.</p>
            <p>Special rates apply for educational groups and cultural associations.</p>
          </>
        )
      }
    ]
  }
};

function FAQ() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('tickets');
  const [openQuestion, setOpenQuestion] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Navbar scroll effect
  useEffect(() => {
    let lastScroll = 0;
    const navbar = document.getElementById('mainNavbar');
    
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      if (navbar) {
        if (currentScroll <= 0) {
          navbar.classList.remove('-translate-y-full');
        } else if (currentScroll > lastScroll && currentScroll > 50) {
          navbar.classList.add('-translate-y-full');
        } else if (currentScroll < lastScroll) {
          navbar.classList.remove('-translate-y-full');
        }
      }
      
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const handleComingSoon = (e) => {
    e.preventDefault();
    setShowComingSoon(true);
  };

  return (
    <div className="bg-black font-playfair">
      {/* Header */}
      <header id="mainNavbar" className="fixed w-full z-50 h-28 bg-black transition-transform duration-500">
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

        {/* Navigation Menu */}
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
      </header>

      {/* FAQ Header Section */}
      <section className="relative w-full pt-28">
        <div className="relative h-[250px]">
          <img src={faqHeader} alt="FAQ" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
          <div className="absolute bottom-10 left-12">
            <p className="text-white text-sm font-medium tracking-wider mb-2">FREQUENTLY ASKED QUESTIONS</p>
            <h2 className="text-white text-4xl font-light tracking-wide">Answers from the Errobelo</h2>
          </div>
        </div>
      </section>

      {/* FAQ Layout */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-8">
          
          {/* Left Sidebar - Categories */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-black rounded-lg shadow-lg border border-gray-800">
              <nav className="p-0">
                {Object.keys(faqData).map((category, index) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setOpenQuestion(null);
                    }}
                    className={`w-full text-left px-6 py-4 ${
                      index < Object.keys(faqData).length - 1 ? 'border-b border-gray-800' : ''
                    } hover:bg-gray-900 transition-colors flex items-center justify-between group ${
                      activeCategory === category ? 'bg-gray-900 border-gray-700' : ''
                    }`}
                  >
                    <span className={`${
                      activeCategory === category ? 'text-white font-medium' : 'text-gray-400 group-hover:text-white'
                    }`}>
                      {faqData[category].title}
                    </span>
                    <svg
                      className={`w-4 h-4 ${
                        activeCategory === category ? 'text-gray-400' : 'text-gray-600 group-hover:text-gray-400'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            <div className="bg-black rounded-lg shadow-lg border border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-2xl font-medium text-white">{faqData[activeCategory].title}</h2>
              </div>
              
              <div className="divide-y divide-gray-800">
                {faqData[activeCategory].questions.map((item, index) => (
                  <details
                    key={index}
                    className="group"
                    open={openQuestion === index}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleQuestion(index);
                    }}
                  >
                    <summary className="px-6 py-4 cursor-pointer text-gray-400 hover:text-white hover:bg-gray-900 transition-colors flex items-center justify-between">
                      <span className="font-medium">{item.q}</span>
                      <svg
                        className={`w-5 h-5 text-gray-600 transition-transform ${
                          openQuestion === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </summary>
                    {openQuestion === index && (
                      <div className="px-6 pb-4 text-white leading-relaxed bg-gray-900">
                        {item.a}
                      </div>
                    )}
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Popup */}
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

export default FAQ;
