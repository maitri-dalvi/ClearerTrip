import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Building2 } from "lucide-react"
import DiscountCard from "../components/DiscountCard"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import About from "@/components/About"
import Link from "next/link"

const searchCards = [
  { 
    icon: <Building2 className="w-5 h-5 md:w-6 md:h-6" />, 
    title: 'Hotels in Goa', 
    date: '18 - 19 May · 2 guests',
    href: ''
  },
  { 
    icon: <Plane className="w-5 h-5 md:w-6 md:h-6" />, 
    title: 'New Delhi → Mumbai 🆕', 
    date: 'Next week · 1 traveller',
    href: '/flight1'
  },
  { 
    icon: <Plane className="w-5 h-5 md:w-6 md:h-6" />, 
    title: 'Bengaluru → Pune 🆕', 
    date: 'Next week · 1 traveller',
    href: '/flight2'
  },
  { 
    icon: <Plane className="w-5 h-5 md:w-6 md:h-6" />, 
    title: 'Mumbai → London', 
    date: 'Next week · 2 travellers',
    href: ''
  },
  { 
    icon: <Plane className="w-5 h-5 md:w-6 md:h-6" />, 
    title: 'Tokyo → London', 
    date: 'Next week · 3 travellers',
    href: ''
  },
  { 
    icon: <Plane className="w-5 h-5 md:w-6 md:h-6" />, 
    title: 'Abu Dhabi → Hyderabad', 
    date: 'Next week · 2 travellers',
    href: ''
  },
];

const popularDestinations = [
  { city: "Goa", img: "/goa.png", properties: "2000+" },
  { city: "Delhi", img: "/delhi.png", properties: "2000+" },
  { city: "Bangalore", img: "/bangalore.png", properties: "2000+" },
  { city: "Jaipur", img: "/jaipur.png", properties: "2000+" },
  { city: "Pattaya", img: "/pattaya.png", properties: "2000+" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="w-full max-w-[1460px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-8 pt-4 sm:pt-6">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">So, where to?</h1>
            <p className="text-gray-600">Plan your trip with us</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Content */}
            <div className="w-full lg:w-3/4">
              {/* Travel Options Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4 mb-8">
                {/* Flights Card */}
                <Card className="border rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500 h-auto relative">
                  <CardContent className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold mb-1">Flights</h3>
                    <p className="text-xs text-gray-600 mb-4 line-clamp-2">
                      Get up to 25% off on domestic and international flights
                    </p>
                    <div className="absolute bottom-0 right-0">
                      <Image src="/flights.png" alt="Flights" width={90} height={60} className="object-contain sm:w-[120px] sm:h-[80px]" />
                    </div>
                  </CardContent>
                </Card>

                {/* Hotels Card */}
                <Card className="border rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500 h-auto relative">
                  <CardContent className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold mb-1">Hotels</h3>
                    <p className="text-xs text-gray-600 mb-4">Up to 30% on 10L+ stays</p>
                    <div className="absolute bottom-0 right-0">
                      <Image src="/hotels.png" alt="Hotels" width={90} height={60} className="object-contain sm:w-[120px] sm:h-[80px]" />
                    </div>
                  </CardContent>
                </Card>

                {/* Buses Card */}
                <Card className="border rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500 h-auto relative">
                  <CardContent className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold mb-1">Buses</h3>
                    <p className="text-xs text-gray-600 mb-4">Flat 12% off on first booking</p>
                    <div className="absolute bottom-0 right-0">
                      <Image src="/buses.png" alt="Buses" width={90} height={60} className="object-contain sm:w-[120px] sm:h-[80px]" />
                    </div>
                  </CardContent>
                </Card>

                {/* Trains Card */}
                <Card className="border rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500 h-auto relative">
                  <CardContent className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold mb-1">Trains</h3>
                    <p className="text-xs text-gray-600 mb-4">New on Cleartrip</p>
                    <div className="absolute bottom-0 right-0">
                      <Image src="/trains.png" alt="Trains" width={90} height={60} className="object-contain sm:w-[120px] sm:h-[80px]" />
                    </div>
                  </CardContent>
                </Card>

                {/* Packages Card */}
                <Card className="border rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500 h-auto relative">
                  <CardContent className="p-3 sm:p-4 pb-16 sm:pb-20">
                    <h3 className="text-base sm:text-lg font-semibold mb-1">Packages</h3>
                    <p className="text-xs text-gray-600 mb-4 line-clamp-2">
                      Thailand, Dubai, Kashmir and more starting ₹3999
                    </p>
                    <div className="absolute bottom-0 right-0">
                      <Image src="/packages.png" alt="Packages" width={90} height={60} className="object-contain sm:w-[120px] sm:h-[80px]" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-4">POPULAR SEARCHES</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {/* Search Cards */}
                  {searchCards.map(({ icon, title, date, href }, i) => (
                    <Link href={href || "#"} key={i}>
                      <div className="flex items-center gap-3 border rounded-lg p-3 sm:p-4 cursor-pointer hover:shadow-xl transition-shadow duration-300">
                        <div className="text-gray-600">{icon}</div>
                        <div>
                          <div className="font-medium text-sm sm:text-base">{title}</div>
                          <div className="text-xs text-gray-500">{date}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          {/* Right Sidebar */}
        <div className="w-full lg:w-1/4 space-y-6">
  <div className="bg-blue-50 p-4 rounded-lg cursor-pointer border relative mb-2">
    <div className="flex items-center justify-between mb-0">
      <div className="text-base font-semibold">Cleartrip for work</div>
    </div>
    <div className="text-sm text-[#11A670]">20% extra off for flight bookings</div>

    <img
      src="arrow-right.png"
      alt="arrow"
      className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6"
    />
  </div>
              {/* Discount Card */}
              <DiscountCard />
            </div>
          </div>
        </div>

        {/* Offers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 sm:mb-14 cursor-pointer">
          <Card className="p-0 shadow-none border-none">
            <img src="/c1.png" alt="Offer 1" className="w-full h-auto rounded-lg" />
          </Card>

          <Card className="p-0 shadow-none border-none">
            <img src="/c2.png" alt="Offer 2" className="w-full h-auto rounded-lg" />
          </Card>

          <Card className="p-0 shadow-none border-none">
            <img src="/c3.png" alt="Offer 3" className="w-full h-auto rounded-lg" />
          </Card>

          <Card className="p-0 shadow-none border-none">
            <img src="/c4.png" alt="Offer 4" className="w-full h-auto rounded-lg" />
          </Card>
        </div>

        {/* HSBC Banner */}
        <div className="relative rounded-lg overflow-hidden mb-8 sm:mb-12 h-24 sm:h-32 md:h-40 lg:h-83 w-full cursor-pointer">
          <Image
            src="/hsbc.png"
            alt="HSBC Card"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1460px"
          />
        </div>

        {/* Popular Destinations */}
        <div className="mb-8 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-8">Popular destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 cursor-pointer">
            {popularDestinations.map(({ city, img, properties }, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden h-48 sm:h-64 md:h-72 lg:h-80 p-0 border-none shadow-none"
              >
                <Image
                  src={img}
                  alt={city}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-3 text-white">
                  <div className="font-bold">{city}</div>
                  <div className="text-xs">{properties} Properties</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Cleartrip */}
        <About />
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  )
}