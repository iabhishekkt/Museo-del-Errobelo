import React from 'react';
import { useNavigate } from 'react-router-dom';

function ComingSoon() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Goes back to previous page
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center text-center p-5">
      <div className="border-2 border-[#b0a97e] rounded-xl shadow-lg p-10 md:p-16 bg-black max-w-md w-full">
        <h1 className="font-bold text-4xl md:text-5xl mb-3 tracking-wider uppercase text-[#b0a97e] font-playfair">
          Information Coming Soon
        </h1>
        <p className="text-xl font-semibold mt-0 mb-8 text-white/80">
          Thank you for interacting with our site.
        </p>
        
        <button
          onClick={handleGoBack}
          className="bg-[#b0a97e] text-black px-8 py-3 rounded-full font-medium hover:bg-[#b0a97e]/90 transition-all duration-300 text-sm uppercase tracking-wider"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default ComingSoon;
