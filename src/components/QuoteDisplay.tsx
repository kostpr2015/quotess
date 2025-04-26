import React, { useState, useEffect } from 'react';
import { quotes } from '../data/quotes';

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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#E5DEFF]">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <p className="text-lg font-medium text-[#1A1F2C]/70">{currentTime}</p>
        </div>
        <div 
          className={`bg-white p-8 rounded-xl shadow-lg transform transition-opacity duration-500 ${
            fadeIn ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <blockquote className="text-2xl font-medium text-[#1A1F2C] mb-4 leading-relaxed">
            "{currentQuote.text}"
          </blockquote>
          <p className="text-right text-lg text-[#1A1F2C]/70">
            — {currentQuote.author}
          </p>
        </div>
        <div className="mt-8 text-center text-sm text-[#1A1F2C]/60">
          Quote updates every 10 seconds
        </div>
      </div>
    </div>
  );
};

export default QuoteDisplay;
