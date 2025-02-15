"use client"

import { Layout } from "@/app/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreVertical, RefreshCcw, Copy, Play, Search, Lock } from "lucide-react"

interface HistoryEntry {
  time: string
  content: string
  date?: string
}

const historyData: { [key: string]: HistoryEntry[] } = {
  Today: [
    {
      time: "02:26 PM",
      content: "The transcription was dismissed.",
    },
  ],
  "October 5, 2024": [
    {
      time: "05:03 PM",
      content:
        "Hey TenEight, let me know when you get a chance to check over the scripts. Hoping to film as soon as possible. Thank you!",
    },
  ],
  "October 4, 2024": [
    {
      time: "11:28 AM",
      content: "Sounds good. Let's meet at 4pm if that works for you.",
    },
    {
      time: "11:28 AM",
      content:
        "That sounds great. We can meet at 4pm if that works for you. Please let me know if 4pm works, and I will see you then.",
    },
    {
      time: "11:21 AM",
      content:
        "Either/or, download it for free. Give it a shot, you have nothing to lose. Hope you guys enjoyed the video, so make sure to like and subscribe!",
    },
  ],
}

export default function History() {
  return (
    <Layout currentPage="history">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-medium">
            <Lock className="w-4 h-4" />
            <p className="text-sm">All transcripts are private and stored locally on your device.</p>
          </div>
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-medium" />
            <Input
              placeholder="Search"
              className="pl-9 bg-gray-dark-2 border-gray-dark-4 text-gray-white placeholder:text-gray-medium focus-visible:ring-gray-dark-4"
            />
          </div>
        </div>

        <div className="space-y-8">
          {Object.entries(historyData).map(([date, entries]) => (
            <div key={date}>
              <h2 className="text-sm font-medium text-gray-medium mb-4">{date}</h2>
              <div className="space-y-2">
                {entries.map((entry, index) => (
                  <div
                    key={`${date}-${index}`}
                    className="flex items-start gap-4 p-4 bg-gray-dark-2 rounded-lg border border-gray-dark-4 group"
                  >
                    <div className="w-20 flex-shrink-0">
                      <span className="text-sm text-gray-medium">{entry.time}</span>
                    </div>
                    <div className="flex-1 text-gray-white">{entry.content}</div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-medium hover:text-gray-white hover:bg-gray-dark-3"
                      >
                        <RefreshCcw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-medium hover:text-gray-white hover:bg-gray-dark-3"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-medium hover:text-gray-white hover:bg-gray-dark-3"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-medium hover:text-gray-white hover:bg-gray-dark-3"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

