
import React, { useState, useEffect } from 'react';
import { quotes } from '../data/quotes';
import { Quote } from 'lucide-react';

const QuoteDisplay = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [fadeIn, setFadeIn] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

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
      setCurrentTime(new Date().toLocaleTimeString());
    };

    // Set up intervals
    const quoteInterval = setInterval(updateQuote, 10000); // 10 seconds
    const timeInterval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(timeInterval);
    };
  }, [currentIndex]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#9b87f5]">
      <div className="max-w-3xl w-full relative">
        {/* Large quote marks */}
        <div className="absolute -top-12 left-0 text-white/20 text-[120px] font-serif rotate-180">"</div>
        <div className="absolute -bottom-32 right-0 text-white/20 text-[120px] font-serif">"</div>
        
        <div className="text-center mb-8">
          <p className="text-lg font-medium text-white/70">{currentTime}</p>
        </div>
        
        <div 
          className={`bg-transparent p-8 rounded-3xl transform transition-opacity duration-500 ${
            fadeIn ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <blockquote className="text-4xl font-medium text-white mb-6 leading-relaxed text-center px-12">
            {currentQuote.text}
          </blockquote>
          <p className="text-right text-xl text-white/70 mt-8 pr-12">
            — {currentQuote.author}
          </p>
        </div>
        
        <div className="mt-8 text-center text-sm text-white/60">
          Quote updates every 10 seconds
        </div>
      </div>
    </div>
  );
};

export default QuoteDisplay;
