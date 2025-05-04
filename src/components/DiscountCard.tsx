"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SavingsCard() {
  return (
    <div className="w-full max-w-[360px] bg-blue-50 p-3 rounded-xl shadow-md border mb-0">
      <div className="flex flex-col items-center">
        <div className="rounded-full bg-gray-200 p-2 mb-2">
          <Image src="/unlock.png" alt="lock" width={22} height={22} />
        </div>
        <h2 className="text-base font-semibold mb-3 text-center">
          Never miss a saving
        </h2>

        <div className="grid grid-cols-2 gap-2 mb-3 cursor-pointer">
          {/* Card 1 */}
          <Card className="border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-[110px] w-full">
            <CardContent className="p-2 relative h-full">
              <p className="text-xs text-gray-700 leading-snug pr-6">
                Discounts up to ₹1000 with SuperCoins
              </p>
              <div className="absolute bottom-2 right-2">
                <Image src="/spark.png" alt="SuperCoins" width={20} height={20} />
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-[110px] w-full">
            <CardContent className="p-2 relative h-full">
              <p className="text-xs text-gray-700 leading-snug pr-6">
                Up to 10% discount as Cleartrip loyalty benefit
              </p>
              <div className="absolute bottom-2 right-2">
                <Image src="/CT_loyalty_icon.png" alt="Cleartrip Loyalty" width={20} height={20} />
              </div>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-[110px] w-full">
            <CardContent className="p-2 relative h-full">
              <p className="text-xs text-gray-700 leading-snug pr-6">
                Up to 10% extra discount for Flipkart & Myntra shoppers
              </p>
              <div className="absolute bottom-2 right-2">
                <Image src="/loyaltyLoggedoutLogo.png" alt="Flipkart Myntra" width={20} height={20} />
              </div>
            </CardContent>
          </Card>

          {/* Card 4 */}
          <Card className="border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-[110px] w-full">
            <CardContent className="p-2 relative h-full">
              <p className="text-xs text-gray-700 leading-snug pr-6">
                Exclusive sign-in coupons
              </p>
              <div className="absolute bottom-2 right-2">
                <Image src="/CouponLogo.png" alt="Sign-in Coupons" width={20} height={20} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Button className="w-full text-sm py-2">Log in now</Button>
      </div>
    </div>
  );
}
