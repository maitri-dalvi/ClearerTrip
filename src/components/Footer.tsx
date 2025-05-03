import React from 'react'
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="bg-gray-100 border-t border-gray-200 mt-2">
      <div className="container mx-auto w-full max-w-[1460px] px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          {/* Logo and Company Line */}
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image
              src="/cleartrip-logo.png"
              alt="Cleartrip Logo"
              width={125}
              height={17}
              className="h-6 cursor-pointer"
            />
            <div className="text-xs text-gray-500">|</div>
            <div className="text-xs text-gray-500 cursor-pointer">A <span className="font-bold italic cursor-pointer">Flipkart</span> Company</div>
          </div>
    
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
            <a href="#" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">About Us</a>
            <a href="#" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">Careers</a>
            <a href="#" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">FAQs</a>
            <a href="#" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">Support</a>
            <a href="#" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">Collections</a>
            <a href="#" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">Cleartrip for Business</a>
            <a href="#" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">Gift Cards</a>
          </div>
    
          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">Connect</div>
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-pink-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.509-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
              </svg>
            </a>
          </div>
        </div>
    
        {/* Copyright and Legal Links */}
        <div className="text-xs text-gray-500 flex flex-col md:flex-row justify-center items-center gap-2 border-t border-gray-200 pt-4">
          <div>© 2025 Cleartrip Pvt. Ltd.</div>
          <div className="hidden md:block">•</div>
          <a href="#" className="hover:text-orange-500 transition-colors">Privacy</a>
          <div className="hidden md:block">•</div>
          <a href="#" className="hover:text-orange-500 transition-colors">Security</a>
          <div className="hidden md:block">•</div>
          <a href="#" className="hover:text-orange-500 transition-colors">Terms of Use</a>
          <div className="hidden md:block">•</div>
          <a href="#" className="hover:text-orange-500 transition-colors">Grievance Redressal</a>
        </div>
      </div>
    </div>
  )
}

export default Footer;