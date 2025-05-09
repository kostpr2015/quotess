
import React, { useState, useEffect } from 'react';
import { quotes } from '../data/quotes';

const QuoteDisplay = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [fadeIn, setFadeIn] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update quote every 10 seconds
    const updateQuote = () => {
      setFadeIn(false);
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % quotes.length;
        setCurrentIndex(nextIndex);
        setCurrentQuote(quotes[nextIndex]);
        setFadeIn(true);
      }, 500);
    };

    // Update time every second
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    // Set up intervals
    const quoteInterval = setInterval(updateQuote, 10000); // 10 seconds
    const timeInterval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(timeInterval);
    };
  }, [currentIndex]);

  // Format time in a modern, 12-hour English style
  const formattedTime = currentTime.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-[#9b87f5] touch-pan-y">
      <div className="w-full max-w-md sm:max-w-3xl relative">
        {/* Large quote marks */}
        <div className="absolute -top-8 sm:-top-12 left-0 text-white/20 text-[80px] sm:text-[120px] font-serif rotate-180">"</div>
        <div className="absolute -bottom-24 sm:-bottom-32 right-0 text-white/20 text-[80px] sm:text-[120px] font-serif">"</div>
        
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-xl sm:text-2xl font-medium text-white/70">{formattedTime}</p>
        </div>
        
        <div 
          className={`bg-transparent p-6 sm:p-8 rounded-3xl transform transition-opacity duration-500 ${
            fadeIn ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <blockquote className="text-2xl sm:text-4xl font-medium text-white mb-4 sm:mb-6 leading-relaxed text-center px-4 sm:px-12">
            {currentQuote.text}
          </blockquote>
          <p className="text-right text-lg sm:text-xl text-white/70 mt-6 sm:mt-8 pr-4 sm:pr-12">
            — {currentQuote.author}
          </p>
        </div>
        
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-white/60">
          Quote updates every 10 seconds
        </div>
      </div>
    </div>
  );
};

export default QuoteDisplay;
