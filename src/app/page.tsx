import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Building2 } from "lucide-react"
import DiscountCard from "../components/DiscountCard"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import About from "@/components/About"


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
<div className="w-full max-w-[1460px] mx-auto p-4">
  {/* Hero Section */}
  <div className="mb-8">
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-1">So, where to?</h1>
      <p className="text-gray-600">Plan your trip with us</p>
    </div>

    <div className="flex flex-col md:flex-row gap-6">
      {/* Left Content */}
      <div className="w-full md:w-3/4">
        {/* Travel Options Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          {/* Flights Card */}
          <Card className="border rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500 h-55 w-50 relative">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-1">Flights</h3>
              <p className="text-xs text-gray-600 mb-4">
                Get up to 25% off on domestic and international flights
              </p>
              <div className="absolute bottom-0 right-0">
                <Image src="/flights.png" alt="Flights" width={120} height={80} className="object-contain" />
              </div>
            </CardContent>
          </Card>

          {/* Hotels Card */}
          <Card className="border rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500 h-55 w-50 relative">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-1">Hotels</h3>
              <p className="text-xs text-gray-600 mb-4">Up to 30% on 10L+ stays</p>
              <div className="absolute bottom-0 right-0">
                <Image src="/hotels.png" alt="Hotels" width={120} height={80} className="object-contain" />
              </div>
            </CardContent>
          </Card>

          {/* Buses Card */}
          <Card className="border rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500 h-55 w-50 relative">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-1">Buses</h3>
              <p className="text-xs text-gray-600 mb-4">Flat 12% off on first booking</p>
              <div className="absolute bottom-0 right-0">
                <Image src="/buses.png" alt="Buses" width={120} height={80} className="object-contain" />
              </div>
            </CardContent>
          </Card>

          {/* Trains Card */}
          <Card className="border rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500 h-55 w-50 relative">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-1">Trains</h3>
              <p className="text-xs text-gray-600 mb-4">New on Cleartrip</p>
              <div className="absolute bottom-0 right-0">
                <Image src="/trains.png" alt="Trains" width={120} height={80} className="object-contain" />
              </div>
            </CardContent>
          </Card>

          {/* Packages Card */}
          <Card className="border rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500 h-55 w-50 relative">
            <CardContent className="p-4 pb-20">
              <h3 className="text-lg font-semibold mb-1">Packages</h3>
              <p className="text-xs text-gray-600 mb-4">
                Thailand, Dubai, Kashmir and more starting ₹3999
              </p>
              <div className="absolute bottom-0 right-0">
                <Image src="/packages.png" alt="Packages" width={120} height={80} className="object-contain" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Searches */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 mb-4">POPULAR SEARCHES</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Search Cards */}
            {[
              { icon: <Building2 className="h-5 w-5" />, title: 'Hotels in Goa', date: '18 - 19 May · 2 guests' },
              
              { icon: <Plane className="h-5 w-5" />, title: 'New Delhi → Mumbai', date: 'Next week · 1 traveller' },
              { icon: <Plane className="h-5 w-5" />, title: 'Bengaluru → Mumbai', date: 'Next week · 2 travellers' },
              { icon: <Plane className="h-5 w-5" />, title: 'Mumbai → London', date: 'Next week · 1 traveller' },
              { icon: <Plane className="h-5 w-5" />, title: 'Tokyo → London', date: 'Next week · 3 travellers' },
              { icon: <Plane className="h-5 w-5" />, title: 'Abu Dhabi → Hyderabad', date: 'Next week · 4 travellers' },
              
            ].map(({ icon, title, date }, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-gray-600">{icon}</div>
                <div>
                  <div className="font-medium">{title}</div>
                  <div className="text-xs text-gray-500">{date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-1/4">
        {/* Cleartrip for work */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6 cursor-pointer border-1">
          <div className="flex items-center justify-between mb-0">
            <div className="text-base font-semibold">Cleartrip for work</div>
            <div className="rounded-full flex items-center justify-center">
              {/* Optional arrow image */}
            </div>
          </div>
          <div className="text-sm text-[#11A670]">20% extra off for flight bookings</div>
        </div>

        {/* Discount Card */}
        <DiscountCard />
      </div>
    </div>
  </div>

  {/* Offers */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-14 cursor-pointer">
  <Card className="p-0 shadow-none border-none">
    <img src="c1.png" alt="Offer 1" className="w-full h-auto" />
  </Card>

  <Card className="p-0 shadow-none border-none">
    <img src="/c2.png" alt="Offer 2" className="w-full h-auto" />
  </Card>

  <Card className="p-0 shadow-none border-none">
    <img src="/c3.png" alt="Offer 3" className="w-full h-auto" />
  </Card>

  <Card className="p-0 shadow-none border-none">
    <img src="/c4.png" alt="Offer 4" className="w-full h-auto" />
  </Card>
</div>


    {/* HSBC Banner */}
<div className="relative rounded-lg overflow-hidden mb-12 h-32 md:h-90 w-full max-w-[1460px] mx-auto cursor-pointer">
  <Image
    src="/hsbc.png"
    alt="HSBC Card"
    fill
    className="object-cover"
  />
</div>


{/* Popular Destinations */}
<div className="mb-14">
  <h2 className="text-2xl font-semibold mb-8">Popular destinations</h2>
  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 cursor-pointer">
    {[
      { city: "Goa", img: "/goa.png" },
      { city: "Delhi", img: "/delhi.png" },
      { city: "Bangalore", img: "/bangalore.png" },
      { city: "Jaipur", img: "/jaipur.png" },
      { city: "Pattaya", img: "/pattaya.png" },
    ].map(({ city, img }, index) => (
      <div
        key={index}
        className="relative rounded-lg overflow-hidden h-80 p-0 border-none shadow-none"
      >
        <Image
          src={img}
          alt={city}
          width={200}
          height={200}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-3 text-white">
          <div className="font-bold">{city}</div>
          <div className="text-xs">2000+ Properties</div>
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



