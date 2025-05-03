import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'

const Header = () => {
  return (
    <div className="border-b sticky top-0 z-50 bg-white">
      <div className="container mx-auto flex items-center justify-between p-4 w-full max-w-[1460px]">
        <div className="flex items-center gap-2">
          <Image
            src="/cleartrip-logo.png"
            alt="Cleartrip Logo"
            width={125}
            height={17}
            className="h-6 cursor-pointer"
          />
          <div className="text-xs text-muted-foreground">|</div>
          <div className="text-xs text-muted-foreground cursor-pointer">
            A <span className="font-bold italic cursor-pointer">Flipkart</span> Company
          </div>
        </div>
        <div className="cursor-pointer">
          <div className="flex items-center gap-4">
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
            <Button variant="outline" size="sm" className="text-sm justify-center items-center pt-4 pb-4 pl-13 pr-13 border-black cursor-pointer">
              <span className="text-black font-semibold cursor-pointer">Log in</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;
