'use client'

import { useEffect, useState, FormEvent, ChangeEvent } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { CheckCheck, Award, MapPin, Calendar, Camera, Heart, Plus, AlertCircle, Share2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import confetti from 'canvas-confetti'
import { JSX } from 'react/jsx-runtime'

// Type definitions
interface TravelCategory {
  id: string;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'custom';
  points: number;
  emoji: string;
  isCustom?: boolean;
}

interface Memory {
  text: string;
  location: string;
  date: string;
  liked: boolean;
}

interface Achievement {
  id: string;
  name: string;
  requirement: number;
  badge: string;
}

interface Level {
  level: number;
  name: string;
  points: number;
}

interface UserData {
  checkedItems: string[];
  memories: Record<string, Memory | null>;
  customCategories: TravelCategory[];
  name: string;
  totalPoints: number;
  unlockedAchievements: string[];
  level: number;
  showWelcome: boolean;
}

interface ActiveMemoryItem extends TravelCategory {
  memoryData?: Memory;
}

const categoryData: TravelCategory[] = [
  { id: 'tent', text: 'Slept in a tent', difficulty: 'easy', points: 10, emoji: '⛺' },
  { id: 'street-food', text: 'Tried street food', difficulty: 'easy', points: 10, emoji: '🍜' },
  { id: 'unesco', text: 'Visited a UNESCO site', difficulty: 'medium', points: 15, emoji: '🏛️' },
  { id: 'solo', text: 'Flew solo', difficulty: 'medium', points: 15, emoji: '✈️' },
  { id: 'northern-lights', text: 'Watched the northern lights', difficulty: 'hard', points: 25, emoji: '✨' },
  { id: 'mountain', text: 'Climbed a mountain', difficulty: 'hard', points: 25, emoji: '🏔️' },
  { id: 'country', text: 'Visited a new country', difficulty: 'medium', points: 15, emoji: '🌍' },
  { id: 'road-trip', text: 'Took a road trip', difficulty: 'easy', points: 10, emoji: '🚗' },
  { id: 'boat', text: 'Sailed on a boat', difficulty: 'medium', points: 15, emoji: '⛵' },
  { id: 'scuba', text: 'Went scuba diving', difficulty: 'hard', points: 25, emoji: '🤿' },
]

// Achievement definitions
const achievements: Achievement[] = [
  { id: 'beginner', name: 'Novice Explorer', requirement: 3, badge: '🥉' },
  { id: 'intermediate', name: 'Seasoned Traveler', requirement: 6, badge: '🥈' },
  { id: 'advanced', name: 'Global Adventurer', requirement: 9, badge: '🥇' },
  { id: 'complete', name: 'Legendary Journeyer', requirement: 10, badge: '👑' }
]

// Travel levels
const levels: Level[] = [
  { level: 1, name: 'Backpacker', points: 0 },
  { level: 2, name: 'Weekender', points: 30 },
  { level: 3, name: 'Explorer', points: 60 },
  { level: 4, name: 'Adventurer', points: 100 },
  { level: 5, name: 'Globetrotter', points: 150 }
]

const STORAGE_KEY = 'travel-bingo-data'

type ViewType = 'main' | 'addMemory' | 'viewMemory' | 'addCategory';

export default function TravelBingo(): JSX.Element {
  const [userData, setUserData] = useState<UserData>({
    checkedItems: [],
    memories: {},
    customCategories: [],
    name: '',
    totalPoints: 0,
    unlockedAchievements: [],
    level: 1,
    showWelcome: true
  })
  
  const [view, setView] = useState<ViewType>('main')
  const [activeMemory, setActiveMemory] = useState<ActiveMemoryItem | null>(null)
  const [newCustomCategory, setNewCustomCategory] = useState<string>('')
  const [showNamePrompt, setShowNamePrompt] = useState<boolean>(false)
  const [showAchievementModal, setShowAchievementModal] = useState<boolean>(false)
  const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null)

  const allCategories: TravelCategory[] = [...categoryData, ...userData.customCategories]

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData) as UserData
        setUserData(parsed)
        if (!parsed.name) {
          setShowNamePrompt(true)
        }
      } catch (e) {
        console.error("Failed to parse saved data:", e)
        setShowNamePrompt(true)
      }
    } else {
      setShowNamePrompt(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
  }, [userData])

  useEffect(() => {
    // Check for new achievements
    achievements.forEach(achievement => {
      const completed = userData.checkedItems.length >= achievement.requirement
      const alreadyUnlocked = userData.unlockedAchievements.includes(achievement.id)
      
      if (completed && !alreadyUnlocked) {
        setRecentAchievement(achievement)
        setShowAchievementModal(true)
        setUserData(prev => ({
          ...prev,
          unlockedAchievements: [...prev.unlockedAchievements, achievement.id]
        }))
        
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
    })
    
    // Update user level
    const currentLevel = levels.reduce((highest, level) => {
      return userData.totalPoints >= level.points ? level : highest
    }, levels[0])
    
    if (currentLevel.level !== userData.level) {
      setUserData(prev => ({
        ...prev,
        level: currentLevel.level
      }))
    }
  }, [userData.checkedItems, userData.totalPoints])

  const toggleChecked = (item: TravelCategory): void => {
    const isCurrentlyChecked = userData.checkedItems.includes(item.id)
    
    if (isCurrentlyChecked) {
      // Unchecking - remove points and memory
      setUserData(prev => ({
        ...prev,
        checkedItems: prev.checkedItems.filter(id => id !== item.id),
        memories: { ...prev.memories, [item.id]: null },
        totalPoints: prev.totalPoints - item.points
      }))
    } else {
      // Checking - add points and prompt for memory
      setUserData(prev => ({
        ...prev,
        checkedItems: [...prev.checkedItems, item.id],
        totalPoints: prev.totalPoints + item.points
      }))
      setActiveMemory(item)
      setView('addMemory')
    }
  }

  const saveMemory = (itemId: string, memory: { text: string; location: string; date: string }): void => {
    setUserData(prev => ({
      ...prev,
      memories: {
        ...prev.memories,
        [itemId]: {
          text: memory.text,
          location: memory.location,
          date: memory.date,
          liked: false
        }
      }
    }))
    setView('main')
  }

  const toggleLike = (itemId: string): void => {
    setUserData(prev => {
      const currentMemory = prev.memories[itemId]
      if (!currentMemory) return prev
      
      return {
        ...prev,
        memories: {
          ...prev.memories,
          [itemId]: {
            ...currentMemory,
            liked: !currentMemory.liked
          }
        }
      }
    })
  }

  const addCustomCategory = (): void => {
    if (!newCustomCategory.trim()) return
    
    const customId = `custom-${Date.now()}`
    const newCategory: TravelCategory = {
      id: customId,
      text: newCustomCategory,
      difficulty: 'custom',
      points: 15,
      emoji: '🎯',
      isCustom: true
    }
    
    setUserData(prev => ({
      ...prev,
      customCategories: [...prev.customCategories, newCategory]
    }))
    
    setNewCustomCategory('')
    setView('main')
  }

  const saveName = (name: string): void => {
    setUserData(prev => ({
      ...prev,
      name: name,
      showWelcome: false
    }))
    setShowNamePrompt(false)
  }

  const resetProgress = (): void => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY)
      setUserData({
        checkedItems: [],
        memories: {},
        customCategories: [],
        name: '',
        totalPoints: 0,
        unlockedAchievements: [],
        level: 1,
        showWelcome: true
      })
      setShowNamePrompt(true)
    }
  }

  const shareProgress = (): void => {
    const completedCount = userData.checkedItems.length
    const totalCount = allCategories.length
    const percentage = Math.round((completedCount / totalCount) * 100)
    
    const text = `I've completed ${completedCount}/${totalCount} (${percentage}%) of my Travel Bingo challenges and reached Level ${userData.level}: ${levels.find(l => l.level === userData.level)?.name}! #TravelBingo`
    
    if (navigator.share) {
      navigator.share({
        title: 'My Travel Bingo Progress',
        text: text,
      }).catch(err => {
        console.error('Error sharing:', err)
        // Fallback
        navigator.clipboard.writeText(text)
        alert('Copied to clipboard! Paste to share.')
      })
    } else {
      navigator.clipboard.writeText(text)
      alert('Copied to clipboard! Paste to share.')
    }
  }

  // Calculate current user level data
  const currentLevel = levels.find(l => l.level === userData.level) || levels[0]
  const nextLevel = levels.find(l => l.level === userData.level + 1)
  const progressToNextLevel = nextLevel ? 
    Math.min(100, ((userData.totalPoints - currentLevel.points) / (nextLevel.points - currentLevel.points)) * 100) : 
    100

  // Welcome/Name prompt view
  if (showNamePrompt) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <Navbar />
        <div className='flex items-center justify-center pt-30'>
          {/* Welcome Card */}
        <Card className="w-full max-w-md rounded-3xl shadow-2xl border border-muted">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-purple-500">
              Welcome to Travel Bingo ✈️
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-6">Track your travel adventures and earn rewards!</p>
            <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault()
              const target = e.target as typeof e.target & {
                name: { value: string }
              }
              saveName(target.name.value)
            }}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">What should we call you?</label>
                <input 
                  type="text" 
                  name="name"
                  className="w-full p-2 border rounded-lg" 
                  placeholder="Your name or nickname"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                Start My Adventure
              </Button>
            </form>
          </CardContent>
        </Card>
        </div>
        
      </main>
    )
  }

  // Main app views
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 pb-16">
      <Navbar />
      
      {/* Achievement Modal */}
      {showAchievementModal && recentAchievement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl"
          >
            <div className="text-5xl mb-2">{recentAchievement.badge}</div>
            <h3 className="text-xl font-bold text-indigo-700 mb-1">Achievement Unlocked!</h3>
            <p className="text-lg mb-4">{recentAchievement.name}</p>
            <p className="text-sm text-gray-600 mb-6">You've completed {recentAchievement.requirement} travel experiences!</p>
            <Button onClick={() => setShowAchievementModal(false)}>
              Awesome!
            </Button>
          </motion.div>
        </div>
      )}

      {/* App Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl mx-auto mt-8 px-4"
      >
        {/* User Profile Card */}
        <Card className="rounded-2xl shadow-lg border border-muted mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-bold text-lg">{userData.name || 'Traveler'}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium">Level {userData.level}:</span> 
                  <span>{levels.find(l => l.level === userData.level)?.name}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {userData.unlockedAchievements.map(id => {
                    const achievement = achievements.find(a => a.id === id)
                    if (!achievement) return null
                    return (
                      <Badge key={id} variant="outline" className="bg-amber-50 text-amber-700">
                        {achievement.badge} {achievement.name}
                      </Badge>
                    )
                  })}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{userData.totalPoints}</div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>

            {/* Level Progress Bar */}
            {nextLevel && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{currentLevel.points} pts</span>
                  <span>{nextLevel.points} pts</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${progressToNextLevel}%` }}
                  ></div>
                </div>
                <div className="text-xs text-center mt-1 text-gray-500">
                  {nextLevel.points - userData.totalPoints} points to Level {nextLevel.level}: {nextLevel.name}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Content Card */}
        <Card className="rounded-3xl shadow-2xl border border-muted backdrop-blur-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2 text-2xl font-bold text-indigo-700">
                <CheckCheck className="text-green-600" size={26} />
                Travel Bingo
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setView('addCategory')}
                  className="flex items-center gap-1"
                >
                  <Plus size={16} /> Add Goal
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={shareProgress}
                  className="flex items-center gap-1"
                >
                  <Share2 size={16} /> Share
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-1">
              Check off experiences you've had — your personal adventure tracker!
            </p>
          </CardHeader>

          {view === 'main' && (
            <>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <AnimatePresence>
                  {allCategories.map((item, index) => {
                    const isChecked = userData.checkedItems.includes(item.id)
                    const memory = userData.memories[item.id]
                    
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div
                          className={`flex flex-col rounded-xl border transition-all transform duration-300 overflow-hidden ${
                            isChecked
                              ? 'bg-green-50 border-green-300'
                              : item.difficulty === 'easy' 
                                ? 'bg-gradient-to-r from-blue-50 to-cyan-50 hover:scale-[1.02] border-transparent' 
                                : item.difficulty === 'medium'
                                  ? 'bg-gradient-to-r from-purple-50 to-pink-50 hover:scale-[1.02] border-transparent'
                                  : 'bg-gradient-to-r from-amber-50 to-orange-50 hover:scale-[1.02] border-transparent'
                          }`}
                        >
                          <div 
                            className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                            onClick={() => toggleChecked(item)}
                          >
                            <div className="flex-shrink-0">
                              <Checkbox
                                id={item.id}
                                checked={isChecked}
                                onCheckedChange={() => toggleChecked(item)}
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{item.emoji}</span>
                                <label
                                  htmlFor={item.id}
                                  className={`text-sm font-medium ${
                                    isChecked ? 'line-through text-muted-foreground' : ''
                                  }`}
                                >
                                  {item.text}
                                </label>
                              </div>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline" className="text-xs px-2 py-0">
                                  {item.difficulty === 'easy' ? 'Easy' : item.difficulty === 'medium' ? 'Medium' : item.difficulty === 'custom' ? 'Custom' : 'Hard'}
                                </Badge>
                                <Badge variant="outline" className="text-xs px-2 py-0 bg-indigo-50 text-indigo-700">
                                  +{item.points} pts
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          {isChecked && memory && (
                            <div className="border-t border-green-200 px-4 py-2 bg-green-50/50">
                              <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Calendar size={12} /> {memory.date}
                                </div>
                                <div className="flex gap-2">
                                  <button 
                                    onClick={() => {
                                      setActiveMemory({...item, memoryData: memory})
                                      setView('viewMemory')
                                    }}
                                    className="text-xs text-blue-600 hover:underline"
                                  >
                                    View
                                  </button>
                                  <button 
                                    onClick={() => toggleLike(item.id)}
                                    className={`${memory.liked ? 'text-red-500' : 'text-gray-400'}`}
                                  >
                                    <Heart size={14} fill={memory.liked ? 'currentColor' : 'none'} />
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin size={12} /> {memory.location || 'Unknown location'}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
                <div className="col-span-full mt-6 text-center">
                  <div className="flex flex-wrap justify-center gap-3">
                    <Badge variant="outline" className="text-sm px-4 py-2 bg-white/70 backdrop-blur-sm">
                      🎯 {userData.checkedItems.length} / {allCategories.length} completed
                    </Badge>
                    <Badge variant="outline" className="text-sm px-4 py-2 bg-white/70 backdrop-blur-sm">
                      🏆 {userData.totalPoints} points earned
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Button variant="ghost" size="sm" onClick={resetProgress} className="text-red-600">
                  Reset Progress
                </Button>
              </CardFooter>
            </>
          )}

          {view === 'addMemory' && activeMemory && (
            <CardContent>
              <h3 className="font-medium mb-4">Add a memory for "{activeMemory.text}"</h3>
              <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                const target = e.target as typeof e.target & {
                  memoryText: { value: string };
                  location: { value: string };
                  date: { value: string };
                }
                saveMemory(activeMemory.id, {
                  text: target.memoryText.value,
                  location: target.location.value,
                  date: target.date.value || format(new Date(), 'yyyy-MM-dd')
                })
              }}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Where did this happen?</label>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <span className="px-3 text-gray-500"><MapPin size={18} /></span>
                    <input 
                      type="text" 
                      name="location"
                      className="flex-grow p-2 outline-none" 
                      placeholder="e.g., Paris, France"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">When did this happen?</label>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <span className="px-3 text-gray-500"><Calendar size={18} /></span>
                    <input 
                      type="date" 
                      name="date"
                      className="flex-grow p-2 outline-none"
                      defaultValue={format(new Date(), 'yyyy-MM-dd')}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Your memory</label>
                  <textarea
                    name="memoryText"
                    className="w-full p-3 border rounded-lg resize-none"
                    rows={3}
                    placeholder="Write about your experience..."
                  ></textarea>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      toggleChecked(activeMemory) // Uncheck it
                      setView('main')
                    }}
                  >
                    Skip
                  </Button>
                  <Button type="submit">
                    Save Memory
                  </Button>
                </div>
              </form>
            </CardContent>
          )}

          {view === 'viewMemory' && activeMemory && activeMemory.memoryData && (
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg flex items-center gap-2">
                  <span>{activeMemory.emoji}</span>
                  {activeMemory.text}
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setView('main')}
                >
                  Back
                </Button>
              </div>
              
              <div className="bg-white/80 rounded-lg p-4 mb-4">
                <div className="text-sm mb-4">{activeMemory.memoryData.text || 'No details added'}</div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} className="text-gray-400" />
                    {activeMemory.memoryData.location || 'Unknown location'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} className="text-gray-400" />
                    {activeMemory.memoryData.date || 'Unknown date'}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    // Set up for edit mode
                    setView('addMemory')
                  }}
                >
                  Edit Memory
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => toggleLike(activeMemory.id)}
                  className={activeMemory.memoryData.liked ? 'text-red-500' : ''}
                >
                  <Heart size={16} fill={activeMemory.memoryData.liked ? 'currentColor' : 'none'} className="mr-1" />
                  {activeMemory.memoryData.liked ? 'Favorite' : 'Add to Favorites'}
                </Button>
              </div>
            </CardContent>
          )}

          {view === 'addCategory' && (
            <CardContent>
              <h3 className="font-medium mb-4">Add a Custom Travel Goal</h3>
              <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault()
                addCustomCategory()
              }}>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">What travel experience do you want to track?</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg" 
                    placeholder="e.g., Hiked a volcano"
                    value={newCustomCategory}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCustomCategory(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setView('main')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Add Goal
                  </Button>
                </div>
              </form>
            </CardContent>
          )}
        </Card>
      </motion.div>
    </main>
  )
}