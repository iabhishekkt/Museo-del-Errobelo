import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthContext } from '../contexts/AuthContext';

// Tour types data
const tourTypes = {
  'guided-tours': {
    name: 'Another Errobelo - Guided Tours',
    description: 'Enjoy a visit away from the crowds and discover the lesser-known treasures and stunning settings of \'Another Errobelo.\'',
    tags: ['Guided tours', 'Masterpieces', 'Adults'],
    duration: '1:30',
    meetingPoint: 'Groups Reception Area',
    language: 'English',
    adultPrice: 15,
    childPrice: 8,
    schedule: 'Until July 4, every Monday, Friday and Saturday at 10:30 a.m. Every Friday at 6:30 p.m.',
    image: 'https://www.hopin.gr/wp-content/uploads/2019/07/National_Archaeological_Museum1.jpg'
  },
  'masterpieces': {
    name: 'Masterpieces Collection Tour',
    description: 'Experience an exclusive tour of our most celebrated masterpieces including the Mona Lisa, Venus de Milo, and more.',
    tags: ['Masterpieces', 'Art History', 'Adults'],
    duration: '2:00',
    meetingPoint: 'Pyramid Entrance',
    language: 'English, French',
    adultPrice: 20,
    childPrice: 12,
    schedule: 'Daily at 11:00 a.m. and 3:00 p.m.',
    image: 'https://images.hornblower.com/1200x840/images/tours/hwlkfr/76243ebd-ffee-4893-b5be-ccc453482943.jpeg'
  },
  'family': {
    name: 'Family Adventure Tour',
    description: 'A fun and interactive tour designed for families with children, exploring Egyptian mummies and ancient treasures.',
    tags: ['Family', 'Children', 'Interactive'],
    duration: '1:15',
    meetingPoint: 'Egyptian Wing',
    language: 'English',
    adultPrice: 12,
    childPrice: 6,
    schedule: 'Weekends at 10:00 a.m. and 2:00 p.m.',
    image: 'https://image.wmsm.co/592d846ec470f/the-egypt-centre-museum-of-egyptian-antiquities-swansea-7.jpg?quality=80&width=1280'
  }
};

function Ticketing() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedTourType, setSelectedTourType] = useState('guided-tours');
  const [bookingData, setBookingData] = useState({
    adults: 1,
    children: 0,
    date: '',
    time: '10:30 AM',
    name: '',
    email: '',
    phone: ''
  });

  const { isAuthenticated, addBooking } = useContext(AuthContext);
  const currentTour = tourTypes[selectedTourType];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showBookingModal || showComingSoon) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showBookingModal, showComingSoon]);

  const handleComingSoon = (e) => {
    e.preventDefault();
    setShowComingSoon(true);
  };

  const handleBookNow = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
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
    const totalPrice = bookingData.adults * currentTour.adultPrice + bookingData.children * currentTour.childPrice;
    
    addBooking({
      tourType: currentTour.name,
      adults: bookingData.adults,
      children: bookingData.children,
      date: bookingData.date,
      time: bookingData.time,
      totalPrice: totalPrice,
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      bookedAt: new Date().toISOString()
    });
    
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
  const totalPrice = bookingData.adults * currentTour.adultPrice + bookingData.children * currentTour.childPrice;

  return (
    <div className="bg-black text-white font-playfair">
      {/* Navbar Component - Fixed at top */}
      <Navbar onLoginClick={() => setShowLoginModal(true)} />

      {/* Main Content - Starts below navbar with pt-28 */}
      <div className="pt-28">
        {/* Hero Section */}
        <section className="relative w-full h-[250px]">
          <img 
            src={currentTour.image}
            alt={currentTour.name}
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/40"></div>
          <div className="absolute bottom-10 left-12">
            <p className="text-white text-sm font-medium tracking-wider mb-2">MUSEUM TOURS</p>
            <h1 className="text-white text-4xl font-extralight tracking-wide">Get Tickets to Errobelo</h1>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="px-8 py-6 bg-black border-b border-gray-800">
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setSelectedTourType('guided-tours')}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedTourType === 'guided-tours'
                  ? 'bg-museum-gold text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Guided Tours
            </button>
            <button
              onClick={() => setSelectedTourType('masterpieces')}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedTourType === 'masterpieces'
                  ? 'bg-museum-gold text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Masterpieces
            </button>
            <button
              onClick={() => setSelectedTourType('family')}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedTourType === 'family'
                  ? 'bg-museum-gold text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Family Tours
            </button>
          </div>
        </section>

        {/* Info Section */}
        <section className="px-8 py-12 grid md:grid-cols-3 gap-8 text-xl bg-black">
          <div className="md:col-span-2">
            <div className="flex gap-3 mb-4 text-sm flex-wrap">
              {currentTour.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-museum-gold/20 text-museum-gold border border-museum-gold/30 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-4xl font-light mb-4 text-white">{currentTour.name}</h2>
            <p className="mb-6 text-xl text-white/90 font-light leading-relaxed">
              {currentTour.description}
            </p>
            <p className="text-gray-300 text-lg font-light">{currentTour.schedule}</p>
          </div>
          
          <div className="bg-black border border-white/10 rounded-xl p-6 text-lg">
            <p className="flex justify-between mb-4 text-white/90">
              <span>Average duration</span>
              <span className="font-normal text-white">{currentTour.duration}</span>
            </p>
            <p className="flex justify-between mb-4 text-white/90">
              <span>Meeting point</span>
              <span className="font-normal text-white">{currentTour.meetingPoint}</span>
            </p>
            <p className="flex justify-between mb-4 text-white/90">
              <span>Language(s)</span>
              <span className="font-normal text-white">{currentTour.language}</span>
            </p>
            <div className="mb-4 pb-4 border-b border-gray-800">
              <p className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Adult ticket</span>
                <span className="text-white">€{currentTour.adultPrice}</span>
              </p>
              <p className="flex justify-between text-sm text-gray-400">
                <span>Child ticket (6-17)</span>
                <span className="text-white">€{currentTour.childPrice}</span>
              </p>
            </div>
            <button 
              onClick={handleBookNow}
              className="w-full px-6 py-3 bg-museum-gold text-white font-normal rounded-lg text-lg hover:bg-museum-gold/90 transition-colors"
            >
              {isAuthenticated ? 'Book Now' : 'Sign In to Book'}
            </button>
          </div>
        </section>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-gray-900 rounded-lg w-full max-w-lg border border-museum-gold shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {bookingStep === 1 && (
              <div className="p-6 overflow-y-auto">
                <h2 className="text-2xl font-light text-white mb-4">Select Tickets</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-black p-3 rounded-lg border border-gray-800">
                    <div>
                      <p className="text-white font-medium text-sm">Adults</p>
                      <p className="text-gray-400 text-xs">€{currentTour.adultPrice} per person</p>
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

                  <div className="flex items-center justify-between bg-black p-3 rounded-lg border border-gray-800">
                    <div>
                      <p className="text-white font-medium text-sm">Children (6-17 years)</p>
                      <p className="text-gray-400 text-xs">€{currentTour.childPrice} per person</p>
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

                  <div>
  <label className="block text-white text-sm mb-1.5 flex items-center gap-2">
    <svg className="w-4 h-4 text-museum-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    Select Date
  </label>
  <div className="relative">
    <input
      type="date"
      value={bookingData.date}
      onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
      className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-museum-gold placeholder:text-gray-500 cursor-pointer
      [&::-webkit-calendar-picker-indicator]:cursor-pointer 
      [&::-webkit-calendar-picker-indicator]:opacity-100
      [&::-webkit-calendar-picker-indicator]:bg-museum-gold
      [&::-webkit-calendar-picker-indicator]:rounded
      [&::-webkit-calendar-picker-indicator]:p-1"
      min={new Date().toISOString().split('T')[0]}
      required
    />
  </div>
</div>

                  <div>
                    <label className="block text-white text-sm mb-1.5">Select Time</label>
                    <select
                      value={bookingData.time}
                      onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                      className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-museum-gold"
                    >
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="2:30 PM">2:30 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                    </select>
                  </div>

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

            {bookingStep === 2 && (
              <div className="p-6 overflow-y-auto">
                <h2 className="text-2xl font-light text-white mb-4">Your Details</h2>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-white text-sm mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                      className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-museum-gold placeholder:text-gray-500"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                      className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-museum-gold placeholder:text-gray-500"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                      className="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-museum-gold placeholder:text-gray-500"
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  <div className="bg-black p-3 rounded-lg border border-gray-800 mt-4">
                    <h3 className="text-white font-semibold text-sm mb-2">Booking Summary</h3>
                    <div className="space-y-1 text-xs text-gray-400">
                      <p>Tour: <span className="text-white">{currentTour.name}</span></p>
                      <p>Date: <span className="text-white">{bookingData.date}</span></p>
                      <p>Time: <span className="text-white">{bookingData.time}</span></p>
                      <p>Adults: <span className="text-white">{bookingData.adults} × €{currentTour.adultPrice}</span></p>
                      {bookingData.children > 0 && (
                        <p>Children: <span className="text-white">{bookingData.children} × €{currentTour.childPrice}</span></p>
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

            {bookingStep === 3 && (
              <div className="p-6 text-center overflow-y-auto">
                <div className="mb-4">
                  <svg className="w-16 h-16 mx-auto text-museum-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-light text-white mb-3">Booking Confirmed!</h2>
                <p className="text-gray-400 mb-4 text-sm">
                  Your tickets have been booked successfully. Check your profile for booking details.
                </p>

                <div className="bg-black p-4 rounded-lg border border-museum-gold mb-4 text-left">
                  <h3 className="text-museum-gold font-semibold text-sm mb-3">Booking Details</h3>
                  <div className="space-y-1.5 text-white text-sm">
                    <p><span className="text-gray-400">Name:</span> {bookingData.name}</p>
                    <p><span className="text-gray-400">Tour:</span> {currentTour.name}</p>
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

export default Ticketing;
