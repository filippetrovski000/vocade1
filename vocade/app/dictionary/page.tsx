"use client"

import { Layout } from "@/app/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Trash2 } from "lucide-react"

export default function Dictionary() {
  return (
    <Layout currentPage="dictionary">
      <div className="max-w-3xl mx-auto space-y-6">
        <p className="text-gray-medium">Add words that you want Flow to remember</p>

        <div className="flex gap-2">
          <Input
            placeholder="Add a new word"
            className="bg-gray-dark-2 border-gray-dark-4 text-gray-white placeholder:text-gray-medium focus-visible:ring-gray-dark-4"
          />
          <Button variant="secondary" className="bg-gray-dark-3 text-gray-white hover:bg-gray-dark-4">
            Add to dictionary
          </Button>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-medium mb-4">Your words (2/40)</h2>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-4 bg-gray-dark-2 rounded-lg border border-gray-dark-4 group">
            <span className="text-gray-white">Christopher Lau</span>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-medium hover:text-gray-white hover:bg-gray-dark-3"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-medium hover:text-gray-white hover:bg-gray-dark-3"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-dark-2 rounded-lg border border-gray-dark-4 group">
            <span className="text-gray-white">chlau248@gmail.com</span>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-medium hover:text-gray-white hover:bg-gray-dark-3"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-medium hover:text-gray-white hover:bg-gray-dark-3"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

