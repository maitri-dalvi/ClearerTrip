"use client";

import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Flight1 = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Flight data for the chart
  const flightData = [
    { month: 'MAY 25', price: 6135 },
    { month: 'JUN 25', price: 5927 },
    { month: 'JUL 25', price: 7137 },
    { month: 'AUG 25', price: 8011 },
    { month: 'SEP 25', price: 3981 },
    { month: 'OCT 25', price: 5121 },
    { month: 'NOV 25', price: 5960 },
    { month: 'DEC 25', price: 9569 },
    { month: 'JAN 26', price: 5120 },
    { month: 'FEB 26', price: 8120 },
    { month: 'MAR 26', price: 6143 },
    { month: 'APR 26', price: 7057 }
  ];

  // Find the cheapest price and its index
  const cheapestPrice = Math.min(...flightData.map(item => item.price));

  useEffect(() => {
    // Set loaded state after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="h-screen overflow-hidden bg-gradient-to-b from-purple-50 to-blue-50 flex flex-col">
      <Navbar />
      <div className='mb-4'>

      </div>
      {/* Search Parameters */}
      

      <div className="bg-white shadow-sm px-6 py-4 border-b">
        <div className="container mx-auto flex items-center justify-between p-4 w-full max-w-[1460px]">
            <div className="text-gray-800 flex items-center ">
              Return Flight from  
              <span className="text-red-500 font-medium mx-1">New Delhi to Mumbai</span>
          </div>
          <div className="text-gray-500 text-sm">Economy | 1 Adult</div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="flex-1 relative p-8">
        {/* Price chart */}
        <div className="h-full flex flex-col justify-end">
          {/* Chart Container */}
          <div className="flex items-end h-full space-x-4 px-4 pb-16">
            {flightData.map((item, index) => {
              // Calculate height based on price (normalized)
              const maxPrice = Math.max(...flightData.map(d => d.price));
              const minPrice = Math.min(...flightData.map(d => d.price));
              const range = maxPrice - minPrice;
              // Make the bar height proportional to price
              const heightPercentage = 20 + ((item.price - minPrice) / range) * 70;
              const barHeightPixels = Math.max(100, Math.floor(heightPercentage * 4));
              
              // Add a bit more height to the cheapest bar to make the label more visible
              const finalBarHeight = item.price === cheapestPrice ? barHeightPixels + 10 : barHeightPixels;
              
              const isLowestPrice = item.price === cheapestPrice;
              
              return (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center flex-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoaded ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  {/* CHEAPEST label positioned above the price */}
                  {isLowestPrice && (
                    <motion.div 
                      className="bg-green-600 text-white text-xs py-1 px-3 rounded whitespace-nowrap z-10 shadow-md mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                    >
                      CHEAPEST
                    </motion.div>
                  )}
                  
                  {/* Price label with more spacing */}
                  <motion.div 
                    className={`mb-4 font-medium ${isLowestPrice ? 'text-green-600 font-bold text-base' : 'text-gray-700 text-sm'}`}
                    animate={isLowestPrice ? {
                      scale: [1, 1.1, 1],
                      transition: { repeat: 2, duration: 0.8, delay: 1.2 }
                    } : {}}
                  >
                    ₹ {item.price.toLocaleString()}
                  </motion.div>
                  
                  {/* Bar Container */}
                  <div className="relative w-full flex justify-center">
                    {/* Bar */}
                    <motion.div 
                      className={`w-full rounded-t-md ${
                        isLowestPrice ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                      initial={{ height: 1 }}
                      animate={{ 
                        height: isLoaded ? finalBarHeight : 1,
                      }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.1,
                        ease: "easeOut" 
                      }}
                      whileHover={{ scaleY: 1.05 }}
                    >
                    </motion.div>
                  </div>
                  
                  {/* Month label */}
                  <div className="mt-3 text-xs font-medium text-gray-600">
                    {item.month}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Flight1;