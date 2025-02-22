"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export default function WebSettings() {
  return (
    <div className="min-h-screen bg-black text-[#ffffff] p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vocade%20(1)-rDsBDORz5XtTDJo3dQO8kIODBBsN4O.png"
            alt="Vocade"
            width={123}
            height={25}
            className="h-8 w-auto"
          />
          <Button variant="ghost" className="text-[#cdcdcd] hover:bg-[#161616]">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold">Welcome to Vocade</h1>
          <p className="text-[#5f5f5f]">You can manage your account here.</p>
        </div>

        <div className="space-y-4">
          {/* Account Section */}
          <Card className="bg-[#1c1c1c] border-[#2b2b2b] rounded-xl">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-lg font-medium">Account</h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[#5f5f5f] text-sm">Name</label>
                  <div className="flex items-center justify-between">
                    <div>Filip</div>
                    <Button variant="ghost" size="sm" className="text-[#cdcdcd] hover:bg-[#161616]">
                      Copy
                    </Button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[#5f5f5f] text-sm">Email</label>
                  <div>filip@filip.lol</div>
                </div>
                <Button variant="ghost" className="w-full justify-between text-[#cdcdcd] hover:bg-[#161616]">
                  Danger
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Billing Section */}
          <Card className="bg-[#1c1c1c] border-[#2b2b2b] rounded-xl">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-lg font-medium">Billing</h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[#5f5f5f] text-sm">Current Plan</label>
                  <div className="flex items-center gap-2">
                    <span>Pro</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#161616] text-[#cdcdcd]">$20/month</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full bg-transparent border-[#2b2b2b] text-[#cdcdcd] hover:bg-[#161616]"
                >
                  Manage billing
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Usage Section */}
          <Card className="bg-[#1c1c1c] border-[#2b2b2b] rounded-xl">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-lg font-medium">Usage</h2>
              <div className="space-y-4">
                <div className="text-sm text-[#5f5f5f]">Resets in 12 days.</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Quota</span>
                    <span>340/1700</span>
                  </div>
                  <Progress value={20} className="h-1 bg-[#161616]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 