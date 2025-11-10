import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import images
import collectionmain2 from '../assets/collectionmain2.png';
import faqHeader from '../assets/faqheader.png';

// Membership plans data
const membershipPlans = [
  {
    title: "1 YEAR MEMBER",
    price: "€95",
    doublePrice: "€150",
    description: "To freely visit the permanent collections and exhibitions of the Errobelo Museum with the privilege of having a guest on Wednesday and Friday evenings and during the first fifteen days of the exhibition in the Hall Napoléon",
    benefits: [
      "Unlimited access to permanent collections",
      "Access to temporary exhibitions",
      "Bring a guest on Wednesday & Friday evenings",
      "Priority access during first 15 days of exhibitions",
      "Digital membership card"
    ]
  },
  {
    title: "YOUNG -26 1 YEAR",
    price: "22€",
    doublePrice: "€35",
    description: "For those under 30, a reduced-rate card that offers all the benefits of individual membership for unlimited access to the Errobelo Museum.",
    benefits: [
      "All benefits of regular membership",
      "Unlimited museum access",
      "Access to all exhibitions",
      "Digital membership card",
      "Special youth events"
    ]
  },
  {
    title: "MEMBER 1 YEAR",
    price: "€170",
    doublePrice: "€250",
    premium: true,
    description: "To be invited to exhibition openings and curator conferences, with the added bonus of free access to Grand Palais exhibitions co-produced by the Louvre.",
    benefits: [
      "All standard membership benefits",
      "Exhibition opening invitations",
      "Curator conference access",
      "Free Grand Palais exhibitions",
      "Behind-the-scenes tours"
    ]
  },
  {
    title: "YOUNG 26-29 1 YEAR",
    price: "€45",
    doublePrice: "€70",
    description: "For those under 30, a reduced-rate card that offers all the benefits of individual membership for unlimited access to the Errobelo Museum.",
    benefits: [
      "Unlimited access to collections",
      "All temporary exhibitions",
      "Digital membership card",
      "Members newsletter",
      "Priority event booking"
    ]
  },
  {
    title: "BENEFACTOR 1 YEAR",
    price: "€1200",
    doublePrice: "€1400",
    premium: true,
    vip: true,
    description: "By becoming a Benefactor, you provide essential support to the patronage work of the Société des Amis du Louvre. You can have a guest on each of your visits to the Louvre.",
    benefits: [
      "Essential patron support status",
      "Bring a guest on every visit",
      "Private museum tours",
      "Revue des Musées subscription",
      "Unlimited Musée d'Orsay access",
      "VIP event invitations"
    ]
  }
];

function Membership() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <div className="bg-black text-white font-playfair min-h-screen">
      {/* Header */}
      <header id="mainNavbar" className="fixed w-full z-50 h-28 top-0 transform translate-y-0 transition-transform duration-500 bg-black">
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
                  <button className="hover:text-museum-gold transition-colors text-sm">English</button>
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
      </header>

      {/* Hero Header Section - Fixed Top Margin */}
      <section className="relative w-full h-[300px] pt-28">
        <img src={faqHeader} alt="Become a Member" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/40"></div>
        <div className="absolute bottom-12 left-12">
          <h1 className="text-white text-5xl md:text-6xl font-extralight tracking-wide">BECOME A MEMBER</h1>
        </div>
      </section>

      {/* Intro Text */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <p className="text-center text-base md:text-lg text-white/80 leading-relaxed font-light">
          The Friends of the Louvre card is personal and valid for one year. You can join alone, in pairs, as a couple, or with your family. 
          Check out all your benefits and enjoy My Digital Card on your mobile phone as soon as you sign up online for free access to the museum.
        </p>
      </section>

      {/* Membership Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {membershipPlans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-black text-white rounded-lg p-8 transition-all duration-300 flex flex-col ${
                plan.vip ? 'border-2 border-museum-gold shadow-xl shadow-museum-gold/20' : 'border border-white/10'
              }`}
            >
              {/* Plan Header */}
              <div className="mb-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold tracking-wide flex-1">{plan.title}</h3>
                  {plan.premium && (
                    <span className="text-[10px] bg-museum-gold text-white px-2.5 py-1 rounded-full font-semibold uppercase">
                      Premium
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-museum-gold">{plan.price}</span>
                </div>
                <p className="text-xs text-white/50">
                  DOUBLE OPTION <span className="font-semibold text-white/70">{plan.doublePrice}</span>
                </p>
              </div>

              {/* Description */}
              <p className="text-white/70 text-sm mb-5 leading-relaxed">
                {plan.description}
              </p>

              {/* Benefits List */}
              <div className="mb-6 flex-1">
                <h4 className="text-museum-gold text-sm font-semibold mb-3 uppercase tracking-wide">Benefits</h4>
                <ul className="space-y-2 text-xs text-white/80">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-museum-gold mt-0.5">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Join Button */}
              <button className="w-auto self-start px-8 bg-museum-gold text-white py-2 rounded-full font-medium hover:bg-museum-gold/90 transition-colors text-sm">
                Join
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Honorary Member Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-extralight mb-6">Honorary Membership</h2>
            <p className="text-lg text-white/80 leading-relaxed mb-8 font-light">
              For all donations over €5,000 you become an <strong className="font-normal">HONORARY MEMBER</strong> of the Society of Friends of the Louvre and you join the 
              Circle of Patrons of the Louvre which finances new projects for the museum.
            </p>
            <Link 
              to="/support"
              className="inline-block bg-museum-gold text-white px-8 py-3 rounded-full font-medium hover:bg-museum-gold/90 transition-colors text-sm"
            >
              Learn More
            </Link>
          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80" 
              alt="Museum Gallery" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

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
}

export default Membership;
