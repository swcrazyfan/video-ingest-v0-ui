"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Check } from "lucide-react"

interface ReferenceVideoSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (video: any) => void
}

const mockVideos = [
  {
    id: 1,
    filename: "MVI_0481.MP4",
    thumbnail: "/placeholder.svg?height=120&width=200",
    duration: "0:25",
    project: "Summer Campaign 2024",
    tags: ["Performance", "Acting Test", "Talking Head"],
  },
  {
    id: 2,
    filename: "interview_setup.mov",
    thumbnail: "/placeholder.svg?height=120&width=200",
    duration: "15:22",
    project: "Product Launch",
    tags: ["interview", "indoor", "talking head"],
  },
  {
    id: 3,
    filename: "product_demo.mp4",
    thumbnail: "/placeholder.svg?height=120&width=200",
    duration: "3:45",
    project: "Product Launch",
    tags: ["product", "demo", "tech"],
  },
  {
    id: 4,
    filename: "wide_landscape.mp4",
    thumbnail: "/placeholder.svg?height=120&width=200",
    duration: "2:15",
    project: "Nature Documentary",
    tags: ["landscape", "wide shot", "outdoor"],
  },
  {
    id: 5,
    filename: "close_up_portrait.mp4",
    thumbnail: "/placeholder.svg?height=120&width=200",
    duration: "1:30",
    project: "Portrait Series",
    tags: ["portrait", "close-up", "indoor"],
  },
]

export function ReferenceVideoSelector({ isOpen, onClose, onSelect }: ReferenceVideoSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVideo, setSelectedVideo] = useState<any>(null)

  const filteredVideos = mockVideos.filter(
    (video) =>
      video.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      video.project.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelect = () => {
    if (selectedVideo) {
      onSelect(selectedVideo)
      onClose()
      setSelectedVideo(null)
      setSearchQuery("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select Reference Video</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search videos by name, tags, or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {filteredVideos.map((video) => (
              <Card
                key={video.id}
                className={`cursor-pointer transition-all ${
                  selectedVideo?.id === video.id
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : "hover:shadow-md hover:bg-gray-50"
                }`}
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.filename}
                    className="w-full h-24 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs">
                      {video.duration}
                    </Badge>
                  </div>
                  {selectedVideo?.id === video.id && (
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-20 rounded-t-lg flex items-center justify-center">
                      <div className="bg-blue-500 text-white rounded-full p-1">
                        <Check className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm truncate mb-1">{video.filename}</h3>
                  <div className="text-xs text-gray-500 mb-2">Project: {video.project}</div>
                  <div className="flex flex-wrap gap-1">
                    {video.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {video.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{video.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedVideo && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium mb-1">Selected Reference Video</div>
              <div className="flex items-center gap-3">
                <img
                  src={selectedVideo.thumbnail || "/placeholder.svg"}
                  alt={selectedVideo.filename}
                  className="w-12 h-8 object-cover rounded"
                />
                <div>
                  <div className="text-sm font-medium">{selectedVideo.filename}</div>
                  <div className="text-xs text-gray-600">
                    {selectedVideo.duration} • {selectedVideo.project}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSelect} disabled={!selectedVideo}>
              Use as Reference
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
