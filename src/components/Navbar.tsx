'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="border-b sticky top-0 z-50 bg-white">
      <div className="container mx-auto flex items-center justify-between p-4 w-full max-w-[1460px]">
        <div className="flex items-center gap-2">
        <Link href="/" passHref>
      <Image
        src="/cleartrip-logo.png"
        alt="Cleartrip Logo"
        width={125}
        height={17}
        className="h-6 cursor-pointer"
      />
    </Link>
          <div className="text-xs text-muted-foreground">|</div>
          <div className="text-xs text-muted-foreground cursor-pointer">
            A <span className="font-bold italic cursor-pointer">Flipkart</span> Company
          </div>
        </div>

        {/* Navigation Section */}
        <div className="relative flex items-center gap-4">
          {/* Smart Travel Button with Hover Dropdown */}
          <div className="relative group">
  {/* Trigger */}
  <Button
    variant="ghost"
    size="sm"
    className="text-sm group-hover:bg-blue-500 transition-all duration-300 hover:bg-blue-500 hover:scale-105"
  >
    <Image
      src="/wand.svg"
      alt="Wand Icon"
      width={20}
      height={20}
      className="mr-2 h-5 w-5 group-hover:brightness-0 group-hover:invert"
    />
    <span className="group-hover:text-white">Smart Travel</span>
  </Button>

{/* Enhanced Dropdown */}
<div className="relative group">
  {/* Dropdown */}
  <div
    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[950px] bg-blue-50 border-1 shadow-2xl rounded-3xl p-6 z-50 transition-all duration-300 ease-in-out group-hover:flex hidden"
    onMouseEnter={(e) => e.currentTarget.classList.add("flex")}
    onMouseLeave={(e) => e.currentTarget.classList.remove("flex")}
  >
    <div className="w-full">
      <div className="grid grid-cols-3 gap-6">
        
        {/* Card Template */}
        {[
  {
    title: "🎯 Best in Best",
    description: "Smart warnings about seasonal weather risks for destinations yet to be planned.",
    link: "/best",
  },
  {
    title: "🌍 No FOMO",
    description: "Manage your belongings and travel essentials efficiently through an AI powered chatbot.",
    link: "/packing",
  },
  {
    title: "🧩 Bingo",
    
    description: "Gamified travel experiences to check off your bucket list and gain some exclusive rewards.",
    link: "/bingo",
  },
].map(({ title, description, link }) => (
  <Link
    key={title}
    href={link}
    className="w-full" 
  >
    <div className="p-4 bg-white border-1 rounded-xl transition-all duration-300 ease-in-out cursor-pointer hover:shadow-2xl hover:scale-105 transform">
      <div className="flex items-center gap-2">
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      </div>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
    </div>
  </Link>
))}
      </div>
    </div>
  </div>
</div>
</div>


          {/* Other Nav Buttons */}
          <Button variant="ghost" size="sm" className="text-sm hover:bg-transparent cursor-pointer">
            <Image
              src="/offer.svg"
              alt="Offers Icon"
              width={20}
              height={20}
              className="mr-2 h-5 w-5 cursor-pointer"
            />
            <span className="hover:text-orange-500 cursor-pointer">Offers</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-sm hover:bg-transparent cursor-pointer">
            <Image
              src="/briefcase-business.svg"
              alt="Business Icon"
              width={20}
              height={20}
              className="mr-2 h-5 w-5 cursor-pointer"
            />
            <span className="hover:text-orange-500 cursor-pointer">Business</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-sm hover:bg-transparent cursor-pointer">
            <Image
              src="/ticket-slash.svg"
              alt="My Trips Icon"
              width={20}
              height={20}
              className="mr-2 h-5 w-5 cursor-pointer"
            />
            <span className="hover:text-orange-500 cursor-pointer">My Trips</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-sm hover:bg-transparent cursor-pointer">
            <Image
              src="/headset.svg"
              alt="Support Icon"
              width={20}
              height={20}
              className="mr-2 h-5 w-5 cursor-pointer"
            />
            <span className="hover:text-orange-500 cursor-pointer">Support</span>
          </Button>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
