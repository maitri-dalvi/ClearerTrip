'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [smartTravelOpen, setSmartTravelOpen] = useState(false);

  const smartTravelCards = [
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
  ];

  const navItems = [
    {
      name: "Offers",
      icon: "/offer.svg",
      link: "/offers",
    },
    {
      name: "Business",
      icon: "/briefcase-business.svg",
      link: "/business",
    },
    {
      name: "My Trips",
      icon: "/ticket-slash.svg",
      link: "/trips",
    },
    {
      name: "Support",
      icon: "/headset.svg",
      link: "/support",
    },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (smartTravelOpen) setSmartTravelOpen(false);
  };

  const toggleSmartTravel = () => {
    setSmartTravelOpen(!smartTravelOpen);
  };

  return (
    <div className="border-b sticky top-0 z-50 bg-white">
      <div className="container mx-auto flex items-center justify-between p-2 sm:p-4 w-full max-w-[1460px]">
        {/* Logo and Company Info */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/" passHref>
            <Image
              src="/cleartrip-logo.png"
              alt="Cleartrip Logo"
              width={100}
              height={17}
              className="h-5 sm:h-6 w-auto cursor-pointer"
            />
          </Link>
          <div className="text-xs text-muted-foreground hidden sm:block">|</div>
          <div className="text-xs text-muted-foreground hidden sm:block cursor-pointer">
            A <span className="font-bold italic cursor-pointer">Flipkart</span> Company
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {/* Smart Travel Button with Hover Dropdown */}
          <div className="relative group">
            {/* Trigger */}
            <Button
              variant="ghost"
              size="sm"
              className="text-xs lg:text-sm group-hover:bg-blue-500 transition-all duration-300 hover:bg-blue-500 hover:scale-105"
            >
              <Image
                src="/wand.svg"
                alt="Wand Icon"
                width={16}
                height={16}
                className="mr-1 lg:mr-2 h-4 w-4 lg:h-5 lg:w-5 group-hover:brightness-0 group-hover:invert"
              />
              <span className="group-hover:text-white">Smart Travel</span>
            </Button>

            <div
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[90vw] max-w-[950px] bg-blue-50 border shadow-2xl rounded-3xl p-4 lg:p-6 z-50 transition-all duration-300 ease-in-out group-hover:flex hidden"
              onMouseEnter={(e) => e.currentTarget.classList.add("flex")}
              onMouseLeave={(e) => e.currentTarget.classList.remove("flex")}
            >
              <div className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                  {/* Card Template */}
                  {smartTravelCards.map(({ title, description, link }) => (
                    <Link
                      key={title}
                      href={link}
                      className="w-full"
                    >
                      <div className="p-3 lg:p-4 bg-white border rounded-xl transition-all duration-300 ease-in-out cursor-pointer hover:shadow-2xl hover:scale-105 transform">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base lg:text-lg font-semibold text-gray-900">{title}</h4>
                        </div>
                        <p className="text-xs lg:text-sm text-gray-500 mt-2">{description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Other Nav Buttons */}
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              size="sm"
              className="text-xs lg:text-sm hover:bg-transparent cursor-pointer"
            >
              <Image
                src={item.icon}
                alt={`${item.name} Icon`}
                width={16}
                height={16}
                className="mr-1 lg:mr-2 h-4 w-4 lg:h-5 lg:w-5 cursor-pointer"
              />
              <span className="hover:text-orange-500 cursor-pointer">{item.name}</span>
            </Button>
          ))}
          
          {/* Login Button */}
          <Button
            variant="outline"
            size="sm"
            className="text-xs lg:text-sm px-3 lg:px-11 py-1 lg:py-2 border-black hidden sm:flex"
          >
            <span className="text-black font-semibold">Log in</span>
          </Button>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Login Button (Mobile) */}
          <Button
            variant="outline"
            size="sm"
            className="text-xs px-3 py-1 border-black"
          >
            <span className="text-black font-semibold">Log in</span>
          </Button>
          
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="p-1"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-2 space-y-2">
            {/* Smart Travel Mobile Dropdown */}
            <div className="border-b pb-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm w-full flex justify-between items-center hover:bg-blue-100"
                onClick={toggleSmartTravel}
              >
                <div className="flex items-center">
                  <Image
                    src="/wand.svg"
                    alt="Wand Icon"
                    width={16}
                    height={16}
                    className="mr-2 h-5 w-5"
                  />
                  <span>Smart Travel</span>
                </div>
                <span>{smartTravelOpen ? '−' : '+'}</span>
              </Button>

              {smartTravelOpen && (
                <div className="mt-2 space-y-2">
                  {smartTravelCards.map(({ title, description, link }) => (
                    <Link href={link} key={title}>
                      <div className="p-3 bg-white border rounded-lg hover:bg-blue-50">
                        <h4 className="text-sm font-semibold">{title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Other Mobile Nav Items */}
            {navItems.map((item) => (
              <Link href={item.link} key={item.name}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm w-full flex justify-start hover:bg-blue-100"
                >
                  <Image
                    src={item.icon}
                    alt={`${item.name} Icon`}
                    width={16}
                    height={16}
                    className="mr-2 h-5 w-5"
                  />
                  <span>{item.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;