"use client";

import React, { JSX, useState } from "react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Heart, Sparkles } from "lucide-react";

// Type for a single destination card
interface Destination {
  id: number;
  title: string;
  description: string;
  image: string;
}

// Type for form fields
interface FormData {
  mood: string;
  timePeriod: string;
  groupType: string;
  occasion: string;
  budget: string;
  expectations: string;
}


// Custom information for each destination
const destinationInfo = [
  {
    id: 1,
    seasonInfo: "❄️ Perfect for winter sports and snow activities",
    safetyInfo: "🔒 Very Safe - Tourist-friendly mountain town"
  },
  {
    id: 2,
    seasonInfo: "🌸 Cherry blossoms in spring, cultural festivals year-round",
    safetyInfo: "🛡️ Safe - Excellent public transportation and low crime"
  },
  {
    id: 3,
    seasonInfo: "☀️ Best between October-March, avoid monsoon season",
    safetyInfo: "🛡️ Safe - Popular tourist destination with beach patrols"
  },
  {
    id: 4,
    seasonInfo: "🌦️ Tropical climate, November-April is ideal",
    safetyInfo: "⚠️ Moderate - Follow local guidance in remote areas"
  },
  {
    id: 5,
    seasonInfo: "🌴 Year-round destination with slight rainy season",
    safetyInfo: "🔒 Very Safe - Family-friendly island environment"
  }
];

// Sample data for destinations
const dummyDestinations: Destination[] = [
  {
    id: 1,
    title: "Manali Adventure",
    description: "A cozy mountain escape with snow, adventure sports and cafes.",
    image: "/manali.jpg",
  },
  {
    id: 2,
    title: "Tokyo Tour",
    description: "Explore buildings, culture, and traditional Tokyo cuisine.",
    image: "/tokyo.jpg",
  },
  {
    id: 3,
    title: "Goa Beach Vibes",
    description: "Relax on beaches, enjoy water sports and party scenes.",
    image: "/goa.jpg",
  },
  {
    id: 4,
    title: "Thailand Retreat",
    description: "Yoga, river rafting and peaceful surroundings.",
    image: "/thailand.jpg",
  },
  {
    id: 5,
    title: "Bali Bliss",
    description: "Explore valleys, monasteries and peaceful landscapes.",
    image: "/bali.jpg",
  },
];

const TravelSwipe: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    mood: "",
    timePeriod: "",
    groupType: "",
    occasion: "",
    budget: "",
    expectations: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [cards, setCards] = useState<Destination[]>(dummyDestinations);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [selected, setSelected] = useState<Destination[]>([]);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleSwipe = (liked: boolean) => {
    const currentCard = cards[currentCardIndex];

    setSwipeDirection(liked ? "right" : "left");

    if (liked) {
      setSelected((prev) => [...prev, currentCard]);
    }

    setTimeout(() => {
      setCurrentCardIndex((prev) => prev + 1);
      setSwipeDirection(null);
      setDragPosition({ x: 0, y: 0 });
    }, 300);
  };

  const handleDragStart = () => setIsDragging(true);

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX =
      "touches" in e
        ? (e as React.TouchEvent).touches[0].clientX
        : (e as React.MouseEvent).clientX;

    const screenMiddleX = window.innerWidth / 2;
    const dragX = clientX - screenMiddleX;
    setDragPosition({ x: dragX, y: 0 });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (Math.abs(dragPosition.x) > 100) {
      handleSwipe(dragPosition.x > 0);
    } else {
      setDragPosition({ x: 0, y: 0 });
    }
  };

  const getSwipeClass = (): string => {
    if (swipeDirection === "left") return "translate-x-[-150%] rotate-[-30deg] opacity-0";
    if (swipeDirection === "right") return "translate-x-[150%] rotate-[30deg] opacity-0";
    if (isDragging) {
      const rotate = dragPosition.x * 0.1;
      return `translate-x-[${dragPosition.x}px] rotate-[${rotate}deg]`;
    }
    return "";
  };

  const getDragOverlay = (): JSX.Element | null => {
    if (!isDragging) return null;
    if (dragPosition.x > 50) {
      return (
        <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full rotate-12">
          <Heart size={32} />
        </div>
      );
    } else if (dragPosition.x < -50) {
      return (
        <div className="absolute top-4 left-4 bg-red-500 text-white p-2 rounded-full -rotate-12">
          <X size={32} />
        </div>
      );
    }
    return null;
  };

  function proceedToBooking(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    window.location.href = "/";
  }

  return (
    <main className="h-screen overflow-hidden bg-gradient-to-b from-purple-50 to-blue-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          {!submitted ? (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
              <h2 className="text-2xl font-bold text-center mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Find Your Dream Destination
              </h2>
              
              <div className="grid gap-4">
                <div className="relative">
                  <Input 
                    placeholder="Mood (e.g., Chill, Adventure)" 
                    name="mood" 
                    onChange={handleChange} 
                    className="pl-3 py-5 rounded-xl border-blue-200 focus:border-purple-400 focus:ring-purple-300"
                  />
                </div>
                
                <div className="relative">
                  <Input 
                    placeholder="Time Period (e.g., 4 days)" 
                    name="timePeriod" 
                    onChange={handleChange} 
                    className="pl-3 py-5 rounded-xl border-blue-200 focus:border-purple-400 focus:ring-purple-300"
                  />
                </div>
                
                <div className="relative">
                  <Input 
                    placeholder="Family or Friends?" 
                    name="groupType" 
                    onChange={handleChange} 
                    className="pl-3 py-5 rounded-xl border-blue-200 focus:border-purple-400 focus:ring-purple-300"
                  />
                </div>
                
                <div className="relative">
                  <Input 
                    placeholder="Occasion (e.g., Birthday)" 
                    name="occasion" 
                    onChange={handleChange} 
                    className="pl-3 py-5 rounded-xl border-blue-200 focus:border-purple-400 focus:ring-purple-300"
                  />
                </div>
                
                <div className="relative">
                  <Input 
                    placeholder="Approx Budget (e.g., $500)" 
                    name="budget" 
                    onChange={handleChange} 
                    className="pl-3 py-5 rounded-xl border-blue-200 focus:border-purple-400 focus:ring-purple-300"
                  />
                </div>
                
                <div className="relative">
                  <Input 
                    placeholder="What are your expectations? (e.g., Relaxing)" 
                    name="expectations" 
                    onChange={handleChange} 
                    className="pl-3 py-5 rounded-xl border-blue-200 focus:border-purple-400 focus:ring-purple-300"
                  />
                </div>
                
                <Button 
                  className="w-full mt-2 py-5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl flex items-center justify-center gap-2 text-lg font-medium shadow-md transition-all duration-300 hover:shadow-lg" 
                  onClick={handleSubmit}
                >
                  <Sparkles size={20} />
                  Find Destinations
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              {currentCardIndex < cards.length ? (
                <div className="flex flex-col items-center w-full">
                  <div
                    className={`relative w-full transition-all duration-300 ${getSwipeClass()}`}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                  >
                    <Card className="overflow-hidden shadow-md rounded-2xl border border-blue-200 bg-white">
                      <div className="relative">
                        <div className="w-full h-56">
                          <img
                            src={cards[currentCardIndex].image}
                            alt={cards[currentCardIndex].title}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <h2 className="text-xl font-bold mb-1 text-white">{cards[currentCardIndex].title}</h2>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-700 mb-3">{cards[currentCardIndex].description}</p>
                        <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                          <div className="text-sm text-blue-700 mb-1 font-medium">
                            {destinationInfo[currentCardIndex].seasonInfo}
                          </div>
                          <div className="text-sm text-purple-700 font-medium">
                            {destinationInfo[currentCardIndex].safetyInfo}
                          </div>
                        </div>
                      </div>
                      {getDragOverlay()}
                    </Card>
                  </div>

                  <div className="flex justify-center gap-8 mt-4">
                    <Button
                      onClick={() => handleSwipe(false)}
                      variant="outline"
                      className="rounded-full p-4 h-14 w-14 bg-white shadow-lg border border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
                    >
                      <X size={28} className="text-red-500" />
                    </Button>
                    <Button
                      onClick={() => handleSwipe(true)}
                      variant="outline"
                      className="rounded-full p-4 h-14 w-14 bg-white shadow-lg border border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-300"
                    >
                      <Heart size={28} className="text-green-500" />
                    </Button>
                  </div>

                  <div className="flex gap-2 mt-4">
                    {cards.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === currentCardIndex 
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 w-10" 
                            : "bg-gray-300 w-3"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
                    <h3 className="text-xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                      Your Selected Destinations
                    </h3>
                    {selected.length > 0 ? (
                      <div className="grid gap-3 max-h-96 overflow-y-auto">
                        {selected.map((dest) => (
                          <Card key={dest.id} className="p-3 rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300 bg-white">
                            <div className="flex gap-3 items-center">
                              <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg border-2 border-purple-100">
                                <img
                                  src={dest.image}
                                  alt={dest.title}
                                  className="w-full h-full object-cover object-center"
                                />
                              </div>
                              <div>
                                <h4 className="font-semibold text-base text-blue-900">{dest.title}</h4>
                                <p className="text-xs text-gray-600">{dest.description}</p>
                              </div>
                            </div>
                          </Card>
                        ))}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          <Button 
                            onClick={() => window.location.reload()} 
                            variant="outline"
                            className="py-4 rounded-xl border-blue-300 text-blue-700 hover:bg-blue-50"
                          >
                            Start Over
                          </Button>
                          <Button onClick={proceedToBooking}
                            className="py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl shadow-md"
                          >
                            Proceed to Booking
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-6 bg-blue-50 rounded-xl">
                        <p className="text-gray-700 mb-4">You didn't select any destinations.</p>
                        <Button 
                          onClick={() => window.location.reload()}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl py-4 px-6 shadow-md"
                        >
                          Try Again
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default TravelSwipe;