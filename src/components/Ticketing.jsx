import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LanguageDropdown from './LanguageDropdown';

// Import image
import collectionmain2 from '../assets/collectionmain2.png';

function Ticketing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1); // 1: Select, 2: Details, 3: Confirmation
  const [bookingData, setBookingData] = useState({
    adults: 1,
    children: 0,
    date: '',
    time: '10:30 AM',
    name: '',
    email: '',
    phone: ''
  });

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showBookingModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showBookingModal]);

  const handleComingSoon = (e) => {
    e.preventDefault();
    setShowComingSoon(true);
  };

  const handleBookNow = () => {
    setShowBookingModal(true);
    setBookingStep(1);
  };

  const handleNext = () => {
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    }
  };

  const handleBack = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    }
  };

  const handleConfirmBooking = () => {
    setBookingStep(3);
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setBookingStep(1);
    setBookingData({
      adults: 1,
      children: 0,
      date: '',
      time: '10:30 AM',
      name: '',
      email: '',
      phone: ''
    });
  };

  const totalTickets = bookingData.adults + bookingData.children;
  const totalPrice = bookingData.adults * 15 + bookingData.children * 8;

  return (
    <div className="bg-black text-white font-playfair">
      {/* Fixed Navbar */}
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
                  <LanguageDropdown />
                </div>

                <div className="flex items-center gap-8">
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
                        <img src={collectionmain2} alt="Support the Errobelo" className="w-full h-48 object-cover rounded" />
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
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[250px] mt-28">
        <img 
          src="https://www.hopin.gr/wp-content/uploads/2019/07/National_Archaeological_Museum1.jpg" 
          alt="Another Errobelo" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/40"></div>
        <div className="absolute bottom-10 left-12">
          <p className="text-white text-sm font-medium tracking-wider mb-2">GUIDED TOURS</p>
          <h1 className="text-white text-4xl font-extralight tracking-wide">Get Tickets to Errobelo</h1>
        </div>
      </section>

      {/* Info Section */}
      <section className="px-8 py-12 grid md:grid-cols-3 gap-8 text-xl bg-black">
        <div className="md:col-span-2">
          <div className="flex gap-4 mb-4 text-lg flex-wrap">
            <span className="px-3 py-1 bg-museum-gold text-white rounded">Guided tours</span>
            <span className="px-3 py-1 bg-museum-gold text-white rounded">Masterpieces</span>
            <span className="px-3 py-1 bg-museum-gold text-white rounded">Adults</span>
          </div>
          <h2 className="text-4xl font-light mb-4 text-white">Another Errobelo</h2>
          <p className="mb-6 text-xl text-white/90 font-light leading-relaxed">
            Enjoy a visit away from the crowds and discover the lesser-known treasures and stunning settings of 'Another Errobelo.'
          </p>
          <p className="text-gray-300 text-lg font-light">Monday, Friday and Saturday</p>
        </div>
        
        <div className="bg-black border border-white/10 rounded-xl p-6 text-lg">
          <p className="flex justify-between mb-4 text-white/90">
            <span>Average duration of the visit</span>
            <span className="font-normal text-white">1:30</span>
          </p>
          <p className="flex justify-between mb-4 text-white/90">
            <span>Meeting point</span>
            <span className="font-normal text-white">Groups Reception Area</span>
          </p>
          <p className="flex justify-between mb-4 text-white/90">
            <span>Language(s)</span>
            <span className="font-normal text-white">English</span>
          </p>
          <button 
            onClick={handleBookNow}
            className="w-full px-6 py-3 bg-museum-gold text-white font-normal rounded-lg text-lg hover:bg-museum-gold/90 transition-colors"
          >
            Book Now
          </button>
        </div>
      </section>

      {/* Schedule */}
      <section className="px-8 pb-12 text-gray-300 text-lg bg-black font-light">
        <p className="mb-2 leading-relaxed">
          Until July 4, every Monday, Friday and Saturday at 10:30 a.m. Every Friday at 6:30 p.m.
        </p>
        <p className="leading-relaxed">
          From July 5 to September 19: everyday at 10:30 a.m. and at 2:30 p.m. Every Friday at 6 p.m. (except Sept 5)
        </p>
      </section>

      {/* Booking Modal */}
{showBookingModal && (
  <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
    <div className="relative bg-gray-900 rounded-lg w-full max-w-lg border border-museum-gold shadow-2xl overflow-hidden">
      {/* Close Button */}
      <button
        onClick={handleCloseModal}
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Step 1: Select Number of People */}
      {bookingStep === 1 && (
        <div className="p-6">
          <h2 className="text-2xl font-light text-white mb-4">Select Tickets</h2>
          
          <div className="space-y-4">
            {/* Adults */}
            <div className="flex items-center justify-between bg-black p-3 rounded-lg border border-gray-800">
              <div>
                <p className="text-white font-medium text-sm">Adults</p>
                <p className="text-gray-400 text-xs">€15 per person</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBookingData({...bookingData, adults: Math.max(0, bookingData.adults - 1)})}
                  className="w-7 h-7 bg-gray-800 hover:bg-museum-gold text-white rounded-full transition-colors text-sm"
                >
                  −
                </button>
                <span className="text-white w-6 text-center text-sm">{bookingData.adults}</span>
                <button
                  onClick={() => setBookingData({...bookingData, adults: bookingData.adults + 1})}
                  className="w-7 h-7 bg-gray-800 hover:bg-museum-gold text-white rounded-full transition-colors text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between bg-black p-3 rounded-lg border border-gray-800">
              <div>
                <p className="text-white font-medium text-sm">Children (6-17 years)</p>
                <p className="text-gray-400 text-xs">€8 per person</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBookingData({...bookingData, children: Math.max(0, bookingData.children - 1)})}
                  className="w-7 h-7 bg-gray-800 hover:bg-museum-gold text-white rounded-full transition-colors text-sm"
                >
                  −
                </button>
                <span className="text-white w-6 text-center text-sm">{bookingData.children}</span>
                <button
                  onClick={() => setBookingData({...bookingData, children: bookingData.children + 1})}
                  className="w-7 h-7 bg-gray-800 hover:bg-museum-gold text-white rounded-full transition-colors text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-white text-sm mb-1.5">Select Date</label>
              <input
                type="date"
                value={bookingData.date}
                onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-museum-gold placeholder-gray-600"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-white text-sm mb-1.5">Select Time</label>
              <select
                value={bookingData.time}
                onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-museum-gold"
              >
                <option value="10:30 AM">10:30 AM</option>
                <option value="2:30 PM">2:30 PM</option>
                <option value="6:00 PM">6:00 PM (Friday only)</option>
              </select>
            </div>

            {/* Total */}
            <div className="bg-black p-3 rounded-lg border border-museum-gold">
              <div className="flex justify-between text-white text-sm mb-1">
                <span>Total Tickets:</span>
                <span className="font-semibold">{totalTickets}</span>
              </div>
              <div className="flex justify-between text-white text-base font-semibold">
                <span>Total Price:</span>
                <span className="text-museum-gold">€{totalPrice}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={totalTickets === 0 || !bookingData.date}
            className="w-full mt-4 px-6 py-2.5 bg-museum-gold text-white text-sm rounded-lg hover:bg-museum-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Details
          </button>
        </div>
      )}

      {/* Step 2: Enter Details */}
      {bookingStep === 2 && (
        <div className="p-6">
          <h2 className="text-2xl font-light text-white mb-4">Your Details</h2>
          
          <div className="space-y-3">
            <div>
              <label className="block text-white text-sm mb-1.5">Full Name</label>
              <input
                type="text"
                value={bookingData.name}
                onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-museum-gold placeholder-gray-500"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-white text-sm mb-1.5">Email Address</label>
              <input
                type="email"
                value={bookingData.email}
                onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-museum-gold placeholder-gray-500"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-white text-sm mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={bookingData.phone}
                onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-museum-gold placeholder-gray-500"
                placeholder="+1 234 567 8900"
              />
            </div>

            {/* Booking Summary */}
            <div className="bg-black p-3 rounded-lg border border-gray-800 mt-4">
              <h3 className="text-white font-semibold text-sm mb-2">Booking Summary</h3>
              <div className="space-y-1 text-xs text-gray-400">
                <p>Date: <span className="text-white">{bookingData.date}</span></p>
                <p>Time: <span className="text-white">{bookingData.time}</span></p>
                <p>Adults: <span className="text-white">{bookingData.adults} × €15</span></p>
                {bookingData.children > 0 && (
                  <p>Children: <span className="text-white">{bookingData.children} × €8</span></p>
                )}
                <div className="border-t border-gray-800 pt-1.5 mt-1.5">
                  <p className="text-sm text-white font-semibold">Total: <span className="text-museum-gold">€{totalPrice}</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleBack}
              className="flex-1 px-6 py-2.5 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleConfirmBooking}
              disabled={!bookingData.name || !bookingData.email || !bookingData.phone}
              className="flex-1 px-6 py-2.5 bg-museum-gold text-white text-sm rounded-lg hover:bg-museum-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {bookingStep === 3 && (
        <div className="p-6 text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-museum-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-light text-white mb-3">Booking Confirmed!</h2>
          <p className="text-gray-400 mb-4 text-sm">
            Your tickets have been booked successfully. You will receive a confirmation email at <span className="text-white">{bookingData.email}</span>
          </p>

          <div className="bg-black p-4 rounded-lg border border-museum-gold mb-4 text-left">
            <h3 className="text-museum-gold font-semibold text-sm mb-3">Booking Details</h3>
            <div className="space-y-1.5 text-white text-sm">
              <p><span className="text-gray-400">Name:</span> {bookingData.name}</p>
              <p><span className="text-gray-400">Date:</span> {bookingData.date}</p>
              <p><span className="text-gray-400">Time:</span> {bookingData.time}</p>
              <p><span className="text-gray-400">Tickets:</span> {totalTickets} ({bookingData.adults} Adults, {bookingData.children} Children)</p>
              <p><span className="text-gray-400">Total Paid:</span> <span className="text-museum-gold font-semibold">€{totalPrice}</span></p>
              <p className="text-xs text-gray-500 mt-3">Booking ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>

          <button
            onClick={handleCloseModal}
            className="w-full px-6 py-2.5 bg-museum-gold text-white text-sm rounded-lg hover:bg-museum-gold/90 transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  </div>
)}

      {/* Coming Soon Popup */}
      {showComingSoon && (
        <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
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

export default Ticketing;
