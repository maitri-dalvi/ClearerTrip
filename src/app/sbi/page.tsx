import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default function SBIOfferPage() {
  return (
    <div className="font-sans bg-white text-[#1d1d1f]">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <Image
          src="/sbi.jpg"
          alt="SBI Card Logo"
          width={130}
          height={60}
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">
          Get up to 12% off on Flights with SBI Credit Cards & EMI transactions
        </h1>
        <p className="text-md mb-4">
          Applicable on Domestic & International Flights
        </p>
        <p className="text-md mb-6 flex items-center justify-center gap-1">
          <span className="text-sm">⏳</span> Expires on <span className="text-[#ff5a1f] font-semibold">10th May</span>
        </p>

        {/* Promo Codes */}
        <div className="flex justify-center gap-4 mb-6">
          <Card className="border-dashed border-2 border-[#00bcd4] px-4 py-2 flex items-center gap-2 cursor-pointer">
            <span className="font-semibold">SBICC</span>
            <Copy size={16} className="text-[#00bcd4]" />
          </Card>
          <Card className="border-dashed border-2 border-[#00bcd4] px-4 py-2 flex items-center gap-2 cursor-pointer">
            <span className="font-semibold">SBIEMI</span>
            <Copy size={16} className="text-[#00bcd4]" />
          </Card>
        </div>

        <Button className="bg-[#ff5a1f] hover:bg-[#e0480f] text-white px-6 py-2 rounded-md">
          BOOK NOW
        </Button>
      </div>

      {/* Offer Table Section */}
      <div className="bg-[#b2e5ec] py-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold mb-3">
            Offer Details
          </h2>
          <p className="text-md mb-8">
            Unlock Maximum Discounts with SBI Credit Cards
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden">
              <thead>
                <tr className="bg-white border border-[#00bcd4] text-sm">
                  <th className="p-3 border border-[#00bcd4]">Product</th>
                  <th className="p-3 border border-[#00bcd4]">Offer</th>
                  <th className="p-3 border border-[#00bcd4]">Max. Discount</th>
                  <th className="p-3 border border-[#00bcd4]">Min. booking value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white text-sm">
                  <td className="p-3 border border-[#00bcd4]">Domestic Flights</td>
                  <td className="p-3 border border-[#00bcd4]">Flat 12% off</td>
                  <td className="p-3 border border-[#00bcd4]">₹1,800
                  </td>
                  <td className="p-3 border border-[#00bcd4]">₹7,500
                  </td>
                </tr>
                <tr className="bg-white text-sm">
                  <td className="p-3 border border-[#00bcd4]">International Flights</td>
                  <td className="p-3 border border-[#00bcd4]">Flat 10% off</td>
                  <td className="p-3 border border-[#00bcd4]">₹2,000
                  </td>
                  <td className="p-3 border border-[#00bcd4]">₹20,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      

      {/* Footer accordion placeholder */}
      <div className="max-w-4xl mx-auto px-4 py-6 text-sm text-[#1d1d1f] pt-20">
      <Accordion type="multiple" className="w-full text-sm">
      {/* How to avail offer */}
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-black font-semibold text-lg border-b">
          How to avail offer
        </AccordionTrigger>
        <AccordionContent className="text-slate-700 px-4 pt-2">
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              Visit <a href="https://www.cleartrip.com" className="text-blue-600 underline">www.cleartrip.com</a> or download the <a href="#" className="text-blue-600 underline">Cleartrip Mobile App</a>
            </li>
            <li>Book any Domestic / International One-way or Roundtrip Flight of your choice.</li>
            <li>Simply enter coupon code SBICC / SBIEMI before making the payment with your SBI Credit Cards</li>
            <li>The applicable discount amount as per the above table will be instantly deducted from the total amount payable.</li>
            <li>Valid for transactions made between 1 May (12 AM) & 10 May (11:59 PM).</li>
            <li>Offer is valid once per user, per product during the offer period.</li>
            <li>Offer not valid on corporate, cashback, Paytm co-branded & Rupay Credit Cards via UPI.</li>
            <li>Note: SBI Credit Cards can be used only once in each phase:
              <ul className="list-disc pl-6 mt-1">
                <li>Phase 1: 1 May – 5 May</li>
                <li>Phase 2: 6 May – 10 May</li>
              </ul>
            </li>
          </ol>
        </AccordionContent>
      </AccordionItem>

      {/* Terms & Conditions */}
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-black font-semibold text-lg border-b">
          **Terms & Conditions
        </AccordionTrigger>
        <AccordionContent className="text-slate-700 px-4 pt-2">
          <ol className="list-decimal pl-5 space-y-1">
            <li>The discount can only be availed on Cleartrip.com desktop website, Android and iOS apps, and mobile website</li>
            <li>In case of cancellations of booking, the instant savings amount will not be refunded</li>
            <li>In case of rescheduling, fare difference and standards apply</li>
            <li>Cleartrip reserves the right to change, withdraw or modify the offer without notice</li>
            <li>Cleartrip is the sole authority for the interpretation of these terms</li>
            <li>Cleartrip is not liable for loss or damage due to a force majeure event</li>
            <li>Cleartrip reserves the right to cancel a booking in case of misuse</li>
            <li>No liability shall exceed the amount paid by the customer</li>
            <li>Offer governed by laws of India and courts at Bangalore</li>
            <li>These terms are in addition to Cleartrip.com T&Cs</li>
            <li>User agrees to terms by availing the discount</li>
            <li>Discount is user-chosen and voluntary</li>
            <li>Product governed by Cleartrip’s terms</li>
            <li>www.cleartrip.com is subject to updates</li>
            <li>Disputes subject to Bangalore jurisdiction</li>
          </ol>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
      </div>
    </div>
    </div>
  );
}
