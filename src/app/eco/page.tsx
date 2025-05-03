'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { CheckCheck } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
  'Slept in a tent',
  'Tried street food',
  'Visited a UNESCO site',
  'Flew solo',
  'Watched the northern lights',
  'Climbed a mountain',
  'Visited a new country',
  'Took a road trip',
  'Sailed on a boat',
  'Went scuba diving',
]

const STORAGE_KEY = 'travel-bingo-checklist'

export default function TravelBingo() {
  const [checked, setChecked] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setChecked(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
  }, [checked])

  const toggle = (item: string) => {
    setChecked((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 pb-16">
        <Navbar />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-3xl mx-auto mt-12 px-4"
        >
          <Card className="rounded-3xl shadow-2xl border border-muted backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-bold text-indigo-700">
                <CheckCheck className="text-green-600" size={26} />
                Travel Bingo ✈️
              </CardTitle>
              <p className="text-muted-foreground text-sm mt-1">
                Check off experiences you’ve had — your personal adventure tracker!
              </p>
            </CardHeader>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <AnimatePresence>
                {categories.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all transform duration-300 border ${
                        checked.includes(item)
                          ? 'bg-green-100 border-green-300 scale-95'
                          : 'bg-gradient-to-r from-pink-100 to-blue-100 hover:scale-105 border-transparent'
                      }`}
                      onClick={() => toggle(item)}
                    >
                      <Checkbox
                        id={item}
                        checked={checked.includes(item)}
                        onCheckedChange={() => toggle(item)}
                      />
                      <label
                        htmlFor={item}
                        className={`text-sm font-medium ${
                          checked.includes(item) ? 'line-through text-muted-foreground' : ''
                        }`}
                      >
                        {item}
                      </label>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div className="col-span-full mt-6 text-center">
                <Badge variant="outline" className="text-sm px-4 py-2 bg-white/70 backdrop-blur-sm">
                  🎯 {checked.length} / {categories.length} completed
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </>
  )
}
