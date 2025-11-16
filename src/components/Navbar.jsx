import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import LanguageDropdown from './LanguageDropdown';
import ebplus1 from '../assets/ebplus1.png';

function Navbar({ onLoginClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showMembershipDetails, setShowMembershipDetails] = useState(false);
  const location = useLocation();
  const { isAuthenticated, username, bookings, membership, logout } = useContext(AuthContext);
  const dropdownRef = useRef(null);

  // Auto-close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    if (showUserDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (selectedBooking || showMembershipDetails) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedBooking, showMembershipDetails]);

  // Navbar scroll effect
  useEffect(() => {
    let lastScroll = 0;
    const navbar = document.getElementById('mainNavbar');
    
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (navbar) {
        if (currentScroll > lastScroll && currentScroll > 100) {
          navbar.classList.add('-translate-y-full');
          setShowUserDropdown(false);
        } else {
          navbar.classList.remove('-translate-y-full');
        }
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePage = (path) => {
    return location.pathname === path;
  };

  const isCollectionActive = () => {
    return location.pathname === '/collection' || location.pathname === '/display';
  };

  const isSeeMoreActive = () => {
    return ['/boutique', '/membership', '/ticketing', '/faqs'].includes(location.pathname);
  };

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
  };

  const handleMembershipClick = () => {
    setShowMembershipDetails(true);
    setShowUserDropdown(false);
  };

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    setShowUserDropdown(false);
  };

  return (
    <>
      <header id="mainNavbar" className="fixed w-full z-50 h-28 transform translate-y-0 transition-transform duration-500 bg-black">
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

                <div className="flex items-center gap-8 relative" ref={dropdownRef}>
                  {!isAuthenticated ? (
                    <button 
                      onClick={onLoginClick}
                      className="bg-museum-gold text-white px-8 py-2.5 rounded-full hover:bg-museum-gold/90 transition-all duration-300 text-sm"
                    >
                      Sign In / Sign Up
                    </button>
                  ) : (
                    <div className="relative">
                      <button 
                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                        className="bg-museum-gold text-white px-8 py-2.5 rounded-full hover:bg-museum-gold/90 transition-all duration-300 text-sm flex items-center gap-2"
                      >
                        <span className="capitalize">{username}</span>
                        <svg className={`w-4 h-4 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {showUserDropdown && (
                        <div className="absolute right-0 top-full mt-2 w-72 bg-black border border-museum-gold rounded-lg shadow-lg overflow-hidden">
                          <div className="p-4 border-b border-gray-700">
                            <p className="text-white font-medium capitalize">{username}</p>
                            {membership ? (
                              <button
                                onClick={handleMembershipClick}
                                className="text-museum-gold text-xs flex items-center gap-1 mt-1 hover:underline"
                              >
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {membership.title} 
                              </button>
                            ) : (
                              <p className="text-gray-400 text-xs">No active membership</p>
                            )}
                          </div>
                          
                          <div className="p-4 border-b border-gray-700 max-h-56 overflow-y-auto">
                            <p className="text-white text-sm font-semibold mb-2">My Bookings ({bookings.length})</p>
                            {bookings.length === 0 ? (
                              <p className="text-gray-400 text-xs">No bookings yet</p>
                            ) : (
                              <div className="space-y-2">
                                {bookings.slice(-3).reverse().map((booking) => (
                                  <button
                                    key={booking.id}
                                    onClick={() => handleBookingClick(booking)}
                                    className="w-full bg-gray-900 hover:bg-gray-800 p-2 rounded text-xs text-left transition-colors"
                                  >
                                    <p className="text-white font-medium">{booking.tourType}</p>
                                    <p className="text-gray-400">{booking.date} • {booking.time}</p>
                                    <p className="text-museum-gold">{booking.adults + booking.children} tickets • €{booking.totalPrice}</p>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <button 
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 text-white hover:bg-gray-900 transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  )}
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
              <Link to="/palace" className={`hover:text-museum-gold transition-colors text-sm ${isActivePage('/palace') ? 'text-museum-gold' : 'text-white'}`}>Visit</Link>
              <Link to="/3d-gallery" className={`hover:text-museum-gold transition-colors text-sm ${isActivePage('/3d-gallery') ? 'text-museum-gold' : 'text-white'}`}>3D Gallery</Link>
              <Link to="/collection" className={`hover:text-museum-gold transition-colors text-sm ${isCollectionActive() ? 'text-museum-gold' : 'text-white'}`}>Explore</Link>
              <Link to="/life-at-museum" className={`hover:text-museum-gold transition-colors text-sm ${isActivePage('/life-at-museum') ? 'text-museum-gold' : 'text-white'}`}>Events</Link>
              <Link to="/boutique" className={`hover:text-museum-gold transition-colors text-sm ${isActivePage('/boutique') ? 'text-museum-gold' : 'text-white'}`}>Online Boutique</Link>
              <Link to="/membership" className={`hover:text-museum-gold transition-colors text-sm ${isActivePage('/membership') ? 'text-museum-gold' : 'text-white'}`}>Membership</Link>
              <Link to="/ticketing" className={`hover:text-museum-gold transition-colors text-sm ${isActivePage('/ticketing') ? 'text-museum-gold' : 'text-white'}`}>Ticketing</Link>
              <Link to="/faqs" className={`hover:text-museum-gold transition-colors text-sm ${isActivePage('/faqs') ? 'text-museum-gold' : 'text-white'}`}>FAQs</Link>
              
              {!isAuthenticated ? (
                <button 
                  onClick={onLoginClick}
                  className="bg-museum-gold text-white px-4 py-2 rounded-full text-center text-sm"
                >
                  Sign In / Sign Up
                </button>
              ) : (
                <div className="space-y-2 pt-2 border-t border-gray-700">
                  <p className="text-white text-sm capitalize font-medium">Welcome, {username}!</p>
                  {membership && (
                    <button
                      onClick={handleMembershipClick}
                      className="text-museum-gold text-xs flex items-center gap-1 hover:underline"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {membership.title} - View Details
                    </button>
                  )}
                  {bookings.length > 0 && (
                    <p className="text-gray-400 text-xs">{bookings.length} booking(s)</p>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="bg-gray-700 text-white px-4 py-2 rounded-full text-center text-sm w-full"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Navigation Menu */}
        <div className="bg-black hidden md:block">
          <div className="container mx-auto px-8">
            <div className="flex justify-center space-x-12 py-4 relative">
              <Link to="/palace" className={`relative hover:text-museum-gold transition-colors uppercase text-sm tracking-wider pb-2 group ${isActivePage('/palace') ? 'text-museum-gold' : 'text-white'}`}>
                VISIT
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-museum-gold transition-all duration-300 ${isActivePage('/palace') ? 'w-full' : 'w-0 group-hover:w-full bg-white group-hover:bg-museum-gold'}`}></div>
              </Link>
              <Link to="/3d-gallery" className={`relative hover:text-museum-gold transition-colors uppercase text-sm tracking-wider pb-2 group ${isActivePage('/3d-gallery') ? 'text-museum-gold' : 'text-white'}`}>
                3D ART GALLERY
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-museum-gold transition-all duration-300 ${isActivePage('/3d-gallery') ? 'w-full' : 'w-0 group-hover:w-full bg-white group-hover:bg-museum-gold'}`}></div>
              </Link>
              <Link to="/collection" className={`relative hover:text-museum-gold transition-colors uppercase text-sm tracking-wider pb-2 group ${isCollectionActive() ? 'text-museum-gold' : 'text-white'}`}>
                EXPLORE
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-museum-gold transition-all duration-300 ${isCollectionActive() ? 'w-full' : 'w-0 group-hover:w-full bg-white group-hover:bg-museum-gold'}`}></div>
              </Link>
              
              <div className="relative group">
                <button className={`relative transition-colors uppercase text-sm tracking-wider pb-2 flex items-center gap-2 ${isSeeMoreActive() ? 'text-museum-gold' : 'text-white hover:text-museum-gold'}`}>
                  SEE MORE
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-museum-gold transition-all duration-300 ${isSeeMoreActive() ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
                </button>
                
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[800px] bg-black border-t-2 border-museum-gold opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="flex">
                    <div className="w-1/2 p-8 space-y-4">
                      <Link to="/boutique" className={`block transition-colors text-lg font-light ${isActivePage('/boutique') ? 'text-museum-gold' : 'text-white hover:text-museum-gold'}`}>Online boutique</Link>
                      <Link to="/life-at-museum" className={`block transition-colors text-lg font-light ${isActivePage('/life-at-museum') ? 'text-museum-gold' : 'text-white hover:text-museum-gold'}`}>Exhibitions and Events</Link>
                      <Link to="/membership" className={`block transition-colors text-lg font-light ${isActivePage('/membership') ? 'text-museum-gold' : 'text-white hover:text-museum-gold'}`}>Membership</Link>
                      <Link to="/ticketing" className={`block transition-colors text-lg font-light ${isActivePage('/ticketing') ? 'text-museum-gold' : 'text-white hover:text-museum-gold'}`}>Ticketing</Link>
                      <Link to="/faqs" className={`block transition-colors text-lg font-light ${isActivePage('/faqs') ? 'text-museum-gold' : 'text-white hover:text-museum-gold'}`}>FAQs</Link>
                      <Link to="/palace" className={`block transition-colors text-lg font-light ${isActivePage('/palace') ? 'text-museum-gold' : 'text-white hover:text-museum-gold'}`}>Places to Visit</Link>
                    </div>
                    
                    <div className="w-1/2 p-8 bg-gray-900">
                      <div className="relative">
                        <img src={ebplus1} alt="Support the Errobelo" className="w-full h-48 object-cover rounded" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white text-black px-3 py-1 text-xs font-medium rounded">Become a Patron</span>
                        </div>
                      </div>
                      <div className="mt-6">
                        <Link to="/membership" className="flex items-center text-white hover:text-museum-gold transition-colors group/link">
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

      {/* Booking Details Modal - Fixed Position Centered */}
      {selectedBooking && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
        >
          <div className="relative bg-black rounded-lg p-6 md:p-8 max-w-md w-full border border-museum-gold shadow-2xl">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-3 right-3 text-white hover:text-museum-gold transition-colors bg-gray-900 hover:bg-gray-800 rounded-full p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl font-light text-white mb-6">Booking Details</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Tour Type</p>
                <p className="text-white text-lg">{selectedBooking.tourType}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Date</p>
                  <p className="text-white">{selectedBooking.date}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Time</p>
                  <p className="text-white">{selectedBooking.time}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Adults</p>
                  <p className="text-white">{selectedBooking.adults}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Children</p>
                  <p className="text-white">{selectedBooking.children}</p>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Total Price</p>
                <p className="text-museum-gold text-2xl font-light">€{selectedBooking.totalPrice}</p>
              </div>

              <div className="bg-gray-900 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Booking ID</p>
                <p className="text-white text-sm font-mono">{selectedBooking.id}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Membership Details Modal - Fixed Position Centered */}
      {showMembershipDetails && membership && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
        >
          <div className="relative bg-black rounded-lg p-6 md:p-8 max-w-md w-full border border-museum-gold shadow-2xl">
            <button
              onClick={() => setShowMembershipDetails(false)}
              className="absolute top-3 right-3 text-white hover:text-museum-gold transition-colors bg-gray-900 hover:bg-gray-800 rounded-full p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <svg className="w-8 h-8 text-museum-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h3 className="text-2xl font-light text-white">Your Membership</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Tier</p>
                <p className="text-museum-gold text-xl font-light">{membership.title}</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Benefits</p>
                <ul className="text-white text-sm space-y-2 max-h-48 overflow-y-auto">
                  {membership.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-museum-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  )) || (
                    <>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-museum-gold mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Priority access to exhibitions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-museum-gold mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Free admission to all galleries</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-museum-gold mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>10% discount at museum shop</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-museum-gold mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Exclusive member events</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Status</p>
                <p className="text-green-500 text-sm font-medium">Active</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
