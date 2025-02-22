"use client"

import React from 'react'
import { Layout } from "@/app/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronRight, Trophy, Flame, LogOut } from "lucide-react"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import supabase from '@/lib/utils/supabase'

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-1 text-gray-white">Good afternoon, Christopher</h2>
            <p className="text-gray-medium">Hold down fn and speak into any textbox</p>
          </div>
          <Button 
            variant="outline" 
            className="border-gray-dark-4 text-gray-white hover:bg-gray-dark-3 flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-dark-2 border-gray-dark-4">
            <CardContent className="p-6">
              <h3 className="font-medium text-gray-medium mb-1">Weekly streak</h3>
              <div className="text-xl font-semibold mb-1 text-gray-white">1st week</div>
              <div className="text-sm text-gray-medium">You&apos;re off to a great start!</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-dark-2 border-gray-dark-4">
            <CardContent className="p-6">
              <h3 className="font-medium text-gray-medium mb-1">Average Flowing speed</h3>
              <div className="text-xl font-semibold mb-1 flex items-center gap-2 text-gray-white">
                153 WPM <Trophy className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="text-sm text-gray-medium">Top 1% of all Flow users</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-dark-2 border-gray-dark-4">
            <CardContent className="p-6">
              <h3 className="font-medium text-gray-medium mb-1">Total words dictated</h3>
              <div className="text-xl font-semibold mb-1 flex items-center gap-2 text-gray-white">
                2,685 <Flame className="w-4 h-4 text-orange-500" />
              </div>
              <div className="text-sm text-gray-medium">You&apos;ve written 13 wedding vows!</div>
            </CardContent>
          </Card>
        </div>

        {/* To Do and Product Hunt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gray-dark-2 border-gray-dark-4">
            <CardContent className="p-6">
              <h3 className="font-medium mb-4 text-gray-white">To do items</h3>
              <Progress value={80} className="h-2 mb-6 bg-gray-dark-4" />
              <div className="text-sm text-gray-medium mb-4">4/5 steps completed</div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked
                    className="border-gray-dark-4 data-[state=checked]:bg-gray-white data-[state=checked]:text-gray-black"
                  />
                  <div className="text-gray-medium">Use Flow hands-free for longer dictations</div>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked
                    className="border-gray-dark-4 data-[state=checked]:bg-gray-white data-[state=checked]:text-gray-black"
                  />
                  <div className="text-gray-medium">Send a message</div>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked
                    className="border-gray-dark-4 data-[state=checked]:bg-gray-white data-[state=checked]:text-gray-black"
                  />
                  <div className="text-gray-medium">Respond to an email</div>
                </div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked
                    className="border-gray-dark-4 data-[state=checked]:bg-gray-white data-[state=checked]:text-gray-black"
                  />
                  <div className="text-gray-medium">Chat with AI</div>
                </div>
                <div className="flex items-center justify-between hover:bg-gray-dark-3 -mx-2 px-2 py-1 rounded-lg cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Checkbox className="border-gray-dark-4" />
                    <div className="text-gray-white">Add words to dictionary</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-medium" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-b from-red-950/50 to-gray-dark-2 border-gray-dark-4">
            <CardContent className="p-6 text-center">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-gray-white mx-auto mb-4">
                P
              </div>
              <h3 className="font-medium mb-2 text-gray-white">Support us on Product Hunt!</h3>
              <p className="text-sm text-gray-light mb-6">
                We just launched on Product Hunt. Please support our journey
              </p>
              <div className="flex justify-center mb-4">
                <div className="bg-glass-light backdrop-blur-sm rounded-full px-6 py-2 flex items-center gap-2 text-gray-white">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Home-j6OwzblHzPz3019M67p8r7qCX7kaKN.png"
                    alt="Product Hunt Badge"
                    width={24}
                    height={24}
                    className="opacity-0"
                  />
                  <span className="text-sm font-medium">Product of the day</span>
                  <span className="text-sm font-medium">1st</span>
                </div>
              </div>
              <div className="text-sm text-gray-light mb-4">1.4k+ upvotes and counting!</div>
              <Button variant="outline" className="w-full border-gray-dark-4 text-gray-white hover:bg-gray-dark-3">
                Support us on Product Hunt
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

