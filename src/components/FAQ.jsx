import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import image
import faqHeader from '../assets/faqheader.png';

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
            <p className="mb-3">The Louvre is open every day except Tuesday from 9am to 6pm.</p>
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

  return (
    <div className="bg-black font-playfair">
      {/* Header */}
      <header id="mainNavbar" className="w-full z-50 h-42 bg-black transition-transform duration-500">
        <div className="bg-black h-24">
          <div className="container mx-auto px-8">
            <nav className="flex items-center justify-between h-24">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <Link to="/" className="font-semibold text-3xl text-white text-center tracking-wide">
                  MUSEO DEL ERROBELO
                </Link>
                <div className="logo-line w-48 md:w-96"></div>
              </div>

              <div className="hidden md:flex items-center justify-between w-full">
                <div className="flex items-center gap-8 text-white/80">
                  <button className="hover:text-museum-gold transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  <button className="hover:text-museum-gold transition-colors text-sm">English</button>
                </div>

                <div className="flex items-center gap-8">
                  <Link to="/signin" className="text-white/80 hover:text-museum-gold transition-colors text-sm border border-white/20 px-6 py-2 rounded-full hover:bg-white/10">
                    Sign In
                  </Link>
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
              <Link to="/search" className="text-white hover:text-museum-gold transition-colors text-sm">Search</Link>
              <Link to="/language" className="text-white hover:text-museum-gold transition-colors text-sm">English</Link>
              <Link to="/signin" className="text-white hover:text-museum-gold transition-colors text-sm">Sign In</Link>
              <Link to="/ticketing" className="bg-museum-gold text-white px-4 py-2 rounded-full text-center text-sm">Ticketing</Link>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="bg-black hidden md:block">
          <div className="container mx-auto px-8">
            <div className="flex justify-center space-x-12 py-4">
              <Link to="/palace" className="nav-link relative text-white hover:text-museum-gold transition-colors uppercase text-sm tracking-wider pb-2">
                VISIT
              </Link>
              <Link to="/life-at-museum" className="nav-link relative text-white hover:text-museum-gold transition-colors uppercase text-sm tracking-wider pb-2">
                EXHIBITIONS AND EVENTS
              </Link>
              <Link to="/collection" className="nav-link relative text-white hover:text-museum-gold transition-colors uppercase text-sm tracking-wider pb-2">
                EXPLORE
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* FAQ Header Section */}
      <section className="relative w-full h-[250px]">
        <img src={faqHeader} alt="FAQ" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
        <div className="absolute bottom-10 left-12">
          <p className="text-white text-sm font-medium tracking-wider mb-2">FREQUENTLY ASKED QUESTIONS</p>
          <h2 className="text-white text-4xl font-light tracking-wide">Answers from the Errobelo</h2>
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

      {/* Footer */}
      <footer className="bg-black text-gray-400 pt-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-12">
          <div>
            <h4 className="uppercase text-white text-xs font-semibold tracking-widest mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:underline">The Louvre in France and around the world</Link></li>
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
                Become a Friend of the Louvre (in French) →
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
          <div className="text-gray-500 mt-2">
            Powered by <span className="font-bold">gnoss</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default FAQ;
