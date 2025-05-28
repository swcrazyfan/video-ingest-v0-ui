"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Star, Shuffle, X } from "lucide-react"

interface SimilaritySearchModalProps {
  isOpen: boolean
  onClose: () => void
  referenceVideo: {
    id: number
    filename: string
    thumbnail: string
    duration: string
    project: string
  } | null
}

const mockSimilarVideos = [
  {
    id: 10,
    filename: "golden_hour_drone.mp4",
    thumbnail: "/placeholder.svg?height=120&width=200",
    duration: "1:45",
    similarity: 0.94,
    matchType: "visual",
    project: "Summer Campaign 2024",
  },
  {
    id: 11,
    filename: "beach_aerial_wide.mov",
    thumbnail: "/placeholder.svg?height=120&width=200",
    duration: "3:12",
    similarity: 0.87,
    matchType: "content",
    project: "Travel Documentary",
  },
  {
    id: 12,
    filename: "sunset_timelapse.mp4",
    thumbnail: "/placeholder.svg?height=120&width=200",
    duration: "0:30",
    similarity: 0.82,
    matchType: "technical",
    project: "Summer Campaign 2024",
  },
]

export function SimilaritySearchModal({ isOpen, onClose, referenceVideo }: SimilaritySearchModalProps) {
  const [similarityType, setSimilarityType] = useState("visual")
  const [threshold, setThreshold] = useState("0.8")

  if (!referenceVideo) return null

  const getMatchTypeColor = (type: string) => {
    switch (type) {
      case "visual":
        return "bg-purple-100 text-purple-800"
      case "content":
        return "bg-blue-100 text-blue-800"
      case "technical":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Shuffle className="w-5 h-5" />
              Find Similar Videos
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Reference Video */}
          <div>
            <h3 className="font-medium mb-3">Reference Video</h3>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <img
                  src={referenceVideo.thumbnail || "/placeholder.svg"}
                  alt={referenceVideo.filename}
                  className="w-24 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-medium">{referenceVideo.filename}</h4>
                  <div className="text-sm text-gray-500">
                    {referenceVideo.duration} • Project: {referenceVideo.project}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search Configuration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Similarity Type</label>
              <Select value={similarityType} onValueChange={setSimilarityType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visual">Visual Similarity</SelectItem>
                  <SelectItem value="content">Content Similarity</SelectItem>
                  <SelectItem value="technical">Technical Similarity</SelectItem>
                  <SelectItem value="combined">Combined Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Similarity Threshold</label>
              <Select value={threshold} onValueChange={setThreshold}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.9">Very Similar (90%+)</SelectItem>
                  <SelectItem value="0.8">Similar (80%+)</SelectItem>
                  <SelectItem value="0.7">Somewhat Similar (70%+)</SelectItem>
                  <SelectItem value="0.6">Loosely Similar (60%+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Similar Videos ({mockSimilarVideos.length} found)</h3>
              <div className="text-sm text-gray-500">Sorted by similarity score</div>
            </div>

            <Tabs defaultValue="grid">
              <TabsList className="mb-4">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>

              <TabsContent value="grid">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockSimilarVideos.map((video) => (
                    <Card key={video.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.filename}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className={getMatchTypeColor(video.matchType)}>{video.matchType}</Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-xs">
                            {video.duration}
                          </Badge>
                        </div>
                        <div className="absolute bottom-2 left-2 flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-white bg-black bg-opacity-50 px-1 rounded">
                            {Math.round(video.similarity * 100)}%
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        <h4 className="font-medium text-sm truncate mb-1">{video.filename}</h4>
                        <div className="text-xs text-gray-500">Project: {video.project}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="list">
                <div className="space-y-2">
                  {mockSimilarVideos.map((video) => (
                    <Card key={video.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex items-center gap-4">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.filename}
                          className="w-16 h-10 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{video.filename}</h4>
                          <div className="text-sm text-gray-500">
                            {video.duration} • Project: {video.project}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getMatchTypeColor(video.matchType)}>{video.matchType}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{Math.round(video.similarity * 100)}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              <Eye className="w-4 h-4 mr-2" />
              View Selected
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
