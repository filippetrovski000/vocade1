"use client"

import { Layout } from "@/app/components/layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Check, X } from "lucide-react"

export default function Settings() {
  return (
    <Layout currentPage="settings">
      <div className="max-w-4xl mx-auto space-y-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="bg-gray-dark-2 border-b border-gray-dark-4 w-full justify-start rounded-none p-0 h-auto">
            <TabsTrigger
              value="general"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-white data-[state=active]:bg-transparent text-gray-medium data-[state=active]:text-gray-white px-4 py-2"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-white data-[state=active]:bg-transparent text-gray-medium data-[state=active]:text-gray-white px-4 py-2"
            >
              Plan & Billing
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-white data-[state=active]:bg-transparent text-gray-medium data-[state=active]:text-gray-white px-4 py-2"
            >
              Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <div className="bg-gray-dark-2/50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-white mb-6">Flow interactions</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <label className="text-gray-white">Hotkeys</label>
                  <Button variant="secondary" size="sm" className="bg-gray-dark-3 text-gray-white hover:bg-gray-dark-4">
                    Customize
                  </Button>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-white">Set default mic input</label>
                  <Select defaultValue="auto">
                    <SelectTrigger className="w-full bg-gray-dark-2 border-gray-dark-4 text-gray-white">
                      <SelectValue placeholder="Select mic input" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-dark-2 border-gray-dark-4">
                      <SelectItem value="auto" className="text-gray-white">
                        Auto-detect mic (system)
                      </SelectItem>
                      <SelectItem value="recommended" className="text-gray-white">
                        Use recommended mic
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-medium">Mic in use: Auto-detect mic (system)</p>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-white">Output languages</label>
                  <Select defaultValue="auto">
                    <SelectTrigger className="w-full bg-gray-dark-2 border-gray-dark-4 text-gray-white">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-dark-2 border-gray-dark-4">
                      <SelectItem value="auto" className="text-gray-white">
                        Auto-detect
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-gray-white">Mute speakers while using Flow</label>
                  <Switch className="data-[state=checked]:bg-green-500" />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-gray-white">Show Flow bar</label>
                  <Switch className="data-[state=checked]:bg-green-500" />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-gray-white">Sound FX</label>
                  <Switch className="data-[state=checked]:bg-green-500" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="mt-6">
            <div className="bg-gray-dark-2/50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-white mb-6">Plan & Billing</h2>

              <div className="space-y-6">
                <div className="bg-gray-dark-3 p-4 rounded-lg">
                  <h3 className="text-md font-medium text-gray-white mb-2">Current Plan</h3>
                  <p className="text-gray-medium mb-4">You are currently on the Pro plan</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-white font-medium">$15/month</span>
                    <Button variant="outline" className="bg-gray-dark-4 text-gray-white hover:bg-gray-dark-5">
                      Change Plan
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-white">Payment Method</h3>
                  <div className="flex items-center space-x-4 bg-gray-dark-3 p-4 rounded-lg">
                    <CreditCard className="text-gray-medium" />
                    <div>
                      <p className="text-gray-white">Visa ending in 4242</p>
                      <p className="text-gray-medium text-sm">Expires 12/2024</p>
                    </div>
                    <Button variant="ghost" className="ml-auto text-gray-medium hover:text-gray-white">
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-white">Billing History</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-gray-dark-3 p-4 rounded-lg">
                      <div>
                        <p className="text-gray-white">May 1, 2023</p>
                        <p className="text-gray-medium text-sm">Pro Plan - Monthly</p>
                      </div>
                      <span className="text-gray-white">$15.00</span>
                    </div>
                    <div className="flex items-center justify-between bg-gray-dark-3 p-4 rounded-lg">
                      <div>
                        <p className="text-gray-white">April 1, 2023</p>
                        <p className="text-gray-medium text-sm">Pro Plan - Monthly</p>
                      </div>
                      <span className="text-gray-white">$15.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="account" className="mt-6">
            <div className="bg-gray-dark-2/50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-white mb-6">Account Settings</h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-white">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Christopher Lau"
                    className="bg-gray-dark-3 border-gray-dark-4 text-gray-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    defaultValue="christopher@example.com"
                    className="bg-gray-dark-3 border-gray-dark-4 text-gray-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-white">Password</Label>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-gray-dark-3 text-gray-white hover:bg-gray-dark-4"
                  >
                    Change password
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-white">Connected Accounts</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-gray-dark-3 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Check className="text-green-500" />
                        <span className="text-gray-white">Google</span>
                      </div>
                      <Button variant="ghost" className="text-gray-medium hover:text-gray-white">
                        Disconnect
                      </Button>
                    </div>
                    <div className="flex items-center justify-between bg-gray-dark-3 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <X className="text-gray-medium" />
                        <span className="text-gray-white">GitHub</span>
                      </div>
                      <Button variant="ghost" className="text-gray-medium hover:text-gray-white">
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="destructive" className="w-full bg-red-900 text-gray-white hover:bg-red-800">
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

