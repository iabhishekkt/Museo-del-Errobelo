import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthContext } from '../contexts/AuthContext';

// Import images
import faqHeader from '../assets/faqheader.png';

// Membership plans data
const membershipPlans = [
  {
    id: 'standard-1year',
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
    id: 'young-26-1year',
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
    id: 'member-premium-1year',
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
    id: 'young-26-29-1year',
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
    id: 'benefactor-1year',
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
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);
  const [showAlreadyMember, setShowAlreadyMember] = useState(false);
  
  const { isAuthenticated, membership, purchaseMembership } = useContext(AuthContext);

  const handleComingSoon = (e) => {
    e.preventDefault();
    setShowComingSoon(true);
  };

  const handlePurchaseMembership = (plan) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    if (membership) {
      setShowAlreadyMember(true);
      return;
    }

    purchaseMembership({
      id: plan.id,
      title: plan.title,
      price: plan.price,
      premium: plan.premium || false,
      vip: plan.vip || false
    });

    setShowPurchaseSuccess(true);
  };

  return (
    <div className="bg-black text-white font-playfair min-h-screen">
      {/* Navbar Component */}
      <Navbar onLoginClick={() => setShowLoginModal(true)} />

      {/* Main Content */}
      <div className="pt-28">
        {/* Hero Header Section */}
        <section className="relative w-full">
          <div className="relative h-[300px]">
            <img src={faqHeader} alt="Become a Member" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/40"></div>
            <div className="absolute bottom-12 left-8 md:left-12">
              <h1 className="text-white text-4xl md:text-6xl font-extralight tracking-wide">BECOME A MEMBER</h1>
            </div>
          </div>
        </section>

        {/* Intro Text */}
        <section className="max-w-5xl mx-auto px-6 py-16">
          <p className="text-center text-base md:text-lg text-white/80 leading-relaxed font-light">
            The Friends of the Louvre card is personal and valid for one year. You can join alone, in pairs, as a couple, or with your family. 
            Check out all your benefits and enjoy My Digital Card on your mobile phone as soon as you sign up online for free access to the museum.
          </p>
        </section>

        {/* Current Membership Status */}
        {isAuthenticated && membership && (
          <section className="max-w-5xl mx-auto px-6 pb-8">
            <div className="bg-gradient-to-r from-museum-gold/20 to-museum-gold/10 border border-museum-gold rounded-lg p-6 flex items-center gap-4">
              <svg className="w-12 h-12 text-museum-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div>
                <p className="text-white font-semibold text-lg">Active Membership</p>
                <p className="text-museum-gold">{membership.title}</p>
                <p className="text-gray-400 text-sm">Expires: {new Date(membership.expiryDate).toLocaleDateString()}</p>
              </div>
            </div>
          </section>
        )}

        {/* Membership Cards Grid */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {membershipPlans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-black text-white rounded-lg p-8 transition-all duration-300 flex flex-col hover:transform hover:scale-105 ${
                  plan.vip 
                    ? 'border-2 border-museum-gold shadow-xl shadow-museum-gold/20' 
                    : 'border border-gray-800 hover:border-museum-gold'
                }`}
              >
                {/* Plan Header */}
                <div className="mb-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold tracking-wide flex-1">{plan.title}</h3>
                    {plan.premium && (
                      <span className="text-[10px] bg-museum-gold text-black px-2.5 py-1 rounded-full font-semibold uppercase">
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
                <button 
                  onClick={() => handlePurchaseMembership(plan)}
                  className="w-auto self-start px-8 bg-museum-gold text-black py-2 rounded-full font-medium hover:bg-museum-gold/90 transition-colors text-sm"
                >
                  {isAuthenticated ? 'Join Now' : 'Sign In to Join'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Honorary Member Section */}
        <section className="bg-gradient-to-r from-gray-900 to-black py-20 px-6 border-t border-gray-800">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-extralight mb-6">Honorary Membership</h2>
              <p className="text-lg text-white/80 leading-relaxed mb-8 font-light">
                For all donations over €5,000 you become an <strong className="font-normal text-museum-gold">HONORARY MEMBER</strong> of the Society of Friends of the Louvre and you join the 
                Circle of Patrons of the Louvre which finances new projects for the museum.
              </p>
              <a 
                href="#"
                onClick={handleComingSoon}
                className="inline-block bg-museum-gold text-black px-8 py-3 rounded-full font-medium hover:bg-museum-gold/90 transition-colors text-sm"
              >
                Learn More
              </a>
            </div>
            <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-800">
              <img 
                src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80" 
                alt="Museum Gallery" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Purchase Success Popup */}
      {showPurchaseSuccess && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-black rounded-lg p-8 max-w-md w-full border-2 border-museum-gold shadow-2xl">
            <button
              onClick={() => setShowPurchaseSuccess(false)}
              className="absolute top-3 right-3 text-white bg-black/60 hover:bg-black/80 rounded-full p-1.5 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-museum-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-light text-white mb-3">Membership Purchased!</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Congratulations! Your <span className="text-museum-gold font-semibold">{membership?.title}</span> membership has been activated successfully.
              </p>
              
              <div className="bg-museum-gold/10 border border-museum-gold rounded-lg p-4 mb-6 text-left">
                <p className="text-white text-sm mb-1">Membership Type: <span className="text-museum-gold">{membership?.title}</span></p>
                <p className="text-white text-sm mb-1">Price: <span className="text-museum-gold">{membership?.price}</span></p>
                <p className="text-white text-sm">Valid Until: <span className="text-museum-gold">{new Date(membership?.expiryDate).toLocaleDateString()}</span></p>
              </div>
              
              <button
                onClick={() => setShowPurchaseSuccess(false)}
                className="bg-museum-gold text-black px-6 py-2 rounded-full font-medium hover:bg-museum-gold/90 transition-all duration-300 text-sm w-full"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Already Member Popup */}
      {showAlreadyMember && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-black rounded-lg p-8 max-w-md w-full border border-museum-gold shadow-2xl">
            <button
              onClick={() => setShowAlreadyMember(false)}
              className="absolute top-3 right-3 text-white bg-black/60 hover:bg-black/80 rounded-full p-1.5 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-museum-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-light text-white mb-3">Already a Member!</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                You already have an active <span className="text-museum-gold font-semibold">{membership?.title}</span> membership that expires on {new Date(membership?.expiryDate).toLocaleDateString()}.
              </p>
              
              <button
                onClick={() => setShowAlreadyMember(false)}
                className="bg-museum-gold text-black px-6 py-2 rounded-full font-medium hover:bg-museum-gold/90 transition-all duration-300 text-sm w-full"
              >
                Got it!
              </button>
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

export default Membership;
