"use client";

import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Flight2 = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const flightData = [
    { month: 'MAY 25', price: 4980 },
    { month: 'JUN 25', price: 4620 },
    { month: 'JUL 25', price: 6240 },
    { month: 'AUG 25', price: 6895 },
    { month: 'SEP 25', price: 6620 },
    { month: 'OCT 25', price: 5299 },
    { month: 'NOV 25', price: 6040 },
    { month: 'DEC 25', price: 7590 },
    { month: 'JAN 26', price: 4810 },
    { month: 'FEB 26', price: 5585 },
    { month: 'MAR 26', price: 4620 },
    { month: 'APR 26', price: 5770 }
  ];

  const cheapestPrice = Math.min(...flightData.map(item => item.price));

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <main className="h-screen overflow-hidden bg-gradient-to-b from-purple-50 to-blue-50 flex flex-col">
      <div className="flex-shrink-0">
        <Navbar />
      </div>

      {/* Search Parameters */}
      <div className="flex-shrink-0 bg-white shadow-sm px-3 md:px-6 py-3 md:py-4 border-b">
        <div className="container mx-auto flex flex-col md:flex-row md:items-center justify-between p-2 md:p-4 w-full max-w-[1460px]">
          <div className="text-gray-800 flex flex-wrap items-center text-sm md:text-base mb-2 md:mb-0">
            Flight from <span className="text-red-500 font-medium mx-1">Bengaluru to Pune</span>
          </div>
          <div className="text-gray-500 text-xs md:text-sm">Economy | 1 Adult</div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-2 md:p-4 lg:p-8">
        <div className="h-full flex flex-col justify-end min-w-full">
          {isMobile && (
            <div className="text-center mb-4 text-gray-700 font-medium">
              Price Trends (Scroll horizontally to view all)
            </div>
          )}

          <div
            className="flex items-end h-full space-x-1 md:space-x-2 lg:space-x-4 px-1 md:px-4 pb-6 md:pb-10"
            style={{ minWidth: isMobile ? '800px' : 'auto' }}
          >
            {flightData.map((item, index) => {
              const maxPrice = Math.max(...flightData.map(d => d.price));
              const minPrice = Math.min(...flightData.map(d => d.price));
              const range = maxPrice - minPrice;

              const heightPercentage = 20 + ((item.price - minPrice) / range) * 70;
              const baseHeight = isMobile ? 60 : 100;
              const barHeightPixels = Math.max(baseHeight, Math.floor(heightPercentage * (isMobile ? 2 : 4)));

              const finalBarHeight = item.price === cheapestPrice ? barHeightPixels + 10 : barHeightPixels;
              const isLowestPrice = item.price === cheapestPrice;

              return (
                <motion.div
                  key={index}
                  className="flex flex-col items-center flex-1 min-w-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoaded ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  {isLowestPrice && (
                    <motion.div
                      className="bg-green-600 text-white text-xs py-1 px-2 md:px-3 rounded whitespace-nowrap z-10 shadow-md mb-1 md:mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                    >
                      CHEAPEST
                    </motion.div>
                  )}

                  <motion.div
                    className={`mb-2 md:mb-3 font-medium ${isLowestPrice ? 'text-green-600 font-bold text-xs md:text-base' : 'text-gray-700 text-xs md:text-sm'}`}
                    animate={isLowestPrice ? {
                      scale: [1, 1.1, 1],
                      transition: { repeat: 2, duration: 0.8, delay: 1.2 }
                    } : {}}
                  >
                    ₹ {item.price.toLocaleString()}
                  </motion.div>

                  <div className="relative w-full flex justify-center">
                    <motion.div
                      className={`w-full rounded-t-md ${isLowestPrice ? 'bg-green-500' : 'bg-gray-200'}`}
                      initial={{ height: 1 }}
                      animate={{ height: isLoaded ? finalBarHeight : 1 }}
                      transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                      whileHover={{ scaleY: 1.05 }}
                    />
                  </div>

                  <div className="mt-2 text-xs font-medium text-gray-600 truncate w-full text-center">
                    {item.month}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {isMobile && (
            <div className="text-center mt-2 text-gray-500 text-xs italic">
              Swipe left/right to view more months
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Flight2;
