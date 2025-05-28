"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Sparkles, Camera, Calendar, Eye, Video, ImageIcon, Upload, Search, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReferenceVideoSelector } from "./reference-video-selector"

interface CreateCollectionModalProps {
  isOpen: boolean
  onClose: () => void
  editingCollection?: any // Add this for edit mode
}

const collectionTypes = [
  {
    id: "manual",
    name: "Manual Collection",
    description: "Manually curated collection of videos",
    icon: <Bookmark className="w-4 h-4" />,
  },
  {
    id: "smart-camera",
    name: "Smart: Camera-based",
    description: "Automatically group by camera model",
    icon: <Camera className="w-4 h-4" />,
  },
  {
    id: "smart-temporal",
    name: "Smart: Time-based",
    description: "Automatically group by date/time",
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    id: "smart-similarity",
    name: "Smart: Content-based",
    description: "Automatically group by visual similarity",
    icon: <Eye className="w-4 h-4" />,
  },
]

const emojiOptions = ["📁", "⭐", "🎬", "🎥", "📷", "🌟", "🔥", "💎", "🎯", "🚀", "🌅", "🌿", "🏆", "💡", "🎨"]

export function CreateCollectionModal({ isOpen, onClose, editingCollection }: CreateCollectionModalProps) {
  const isEditing = !!editingCollection

  // Initialize state with editing data if available
  const [name, setName] = useState(editingCollection?.name || "")
  const [description, setDescription] = useState(editingCollection?.description || "")
  const [type, setType] = useState(editingCollection?.type || "manual")
  const [selectedEmoji, setSelectedEmoji] = useState(editingCollection?.icon || "📁")
  const [smartCriteria, setSmartCriteria] = useState(editingCollection?.criteria || "")
  const [showReferenceSelector, setShowReferenceSelector] = useState(false)
  const [selectedReferenceVideo, setSelectedReferenceVideo] = useState<any>(null)
  const [criteriaType, setCriteriaType] = useState("keyword")

  // Reset form when modal opens/closes or editing collection changes
  useEffect(() => {
    if (editingCollection) {
      setName(editingCollection.name || "")
      setDescription(editingCollection.description || "")
      setType(editingCollection.type || "manual")
      setSelectedEmoji(editingCollection.icon || "📁")
      setSmartCriteria(editingCollection.criteria || "")
    } else {
      setName("")
      setDescription("")
      setType("manual")
      setSelectedEmoji("📁")
      setSmartCriteria("")
    }
  }, [editingCollection, isOpen])

  const handleCreate = () => {
    console.log(isEditing ? "Updating collection:" : "Creating collection:", {
      id: editingCollection?.id,
      name,
      description,
      type,
      selectedEmoji,
      smartCriteria,
    })
    onClose()
  }

  const selectedType = collectionTypes.find((t) => t.id === type)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            {isEditing ? "Edit Collection" : "Create Collection"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="collection-name">Collection Name</Label>
            <Input
              id="collection-name"
              placeholder="Enter collection name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="collection-description">Description</Label>
            <Textarea
              id="collection-description"
              placeholder="Describe this collection"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label>Collection Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {collectionTypes.map((collectionType) => (
                  <SelectItem key={collectionType.id} value={collectionType.id}>
                    <div className="flex items-center gap-2">
                      {collectionType.icon}
                      <span>{collectionType.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedType && <p className="text-xs text-gray-500">{selectedType.description}</p>}
          </div>

          {type.startsWith("smart-") && (
            <div className="space-y-3">
              <Label>Smart Criteria</Label>

              {type === "smart-camera" && (
                <Select value={smartCriteria} onValueChange={setSmartCriteria}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select camera model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="canon-eos-rp">Canon EOS RP</SelectItem>
                    <SelectItem value="sony-fx3">Sony FX3</SelectItem>
                    <SelectItem value="canon-r5">Canon R5</SelectItem>
                  </SelectContent>
                </Select>
              )}

              {type === "smart-temporal" && (
                <Select value={smartCriteria} onValueChange={setSmartCriteria}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-24h">Last 24 hours</SelectItem>
                    <SelectItem value="last-week">Last week</SelectItem>
                    <SelectItem value="last-month">Last month</SelectItem>
                    <SelectItem value="custom-date">Custom date range</SelectItem>
                  </SelectContent>
                </Select>
              )}

              {type === "smart-similarity" && (
                <Tabs defaultValue="keyword" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="keyword">Keyword</TabsTrigger>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="reference">Reference Video</TabsTrigger>
                    <TabsTrigger value="image">Reference Image</TabsTrigger>
                  </TabsList>

                  <TabsContent value="keyword" className="space-y-2">
                    <Input
                      placeholder="e.g., talking heads, wide shots, outdoor"
                      value={smartCriteria}
                      onChange={(e) => setSmartCriteria(e.target.value)}
                    />
                    <div className="flex flex-wrap gap-1">
                      <span className="text-xs text-gray-500">Suggestions:</span>
                      {[
                        "talking heads",
                        "wide shots",
                        "close-ups",
                        "outdoor scenes",
                        "indoor interviews",
                        "product shots",
                      ].map((keyword) => (
                        <Button
                          key={keyword}
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs"
                          onClick={() => setSmartCriteria(keyword)}
                        >
                          {keyword}
                        </Button>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="description" className="space-y-2">
                    <Textarea
                      placeholder="Describe the type of content you want to collect..."
                      value={smartCriteria}
                      onChange={(e) => setSmartCriteria(e.target.value)}
                      rows={3}
                    />
                    <p className="text-xs text-gray-500">
                      AI will find videos matching your description using semantic search
                    </p>
                  </TabsContent>

                  <TabsContent value="reference" className="space-y-2">
                    {selectedReferenceVideo ? (
                      <div className="border rounded-lg p-3 bg-gray-50">
                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src={selectedReferenceVideo.thumbnail || "/placeholder.svg"}
                            alt={selectedReferenceVideo.filename}
                            className="w-16 h-10 object-cover rounded"
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{selectedReferenceVideo.filename}</div>
                            <div className="text-xs text-gray-500">
                              {selectedReferenceVideo.duration} • {selectedReferenceVideo.project}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedReferenceVideo(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setShowReferenceSelector(true)}>
                          Change Reference
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <div className="space-y-2">
                          <Video className="w-8 h-8 mx-auto text-gray-400" />
                          <p className="text-sm text-gray-500">Select a reference video</p>
                          <Button variant="outline" size="sm" onClick={() => setShowReferenceSelector(true)}>
                            <Search className="w-4 h-4 mr-2" />
                            Browse Videos
                          </Button>
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-gray-500">
                      AI will find videos visually similar to your reference video
                    </p>
                  </TabsContent>

                  <TabsContent value="image" className="space-y-2">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <div className="space-y-2">
                        <ImageIcon className="w-8 h-8 mx-auto text-gray-400" />
                        <p className="text-sm text-gray-500">Upload a reference image</p>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Image
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      AI will find videos that match the visual style of your image
                    </p>
                  </TabsContent>
                </Tabs>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label>Icon</Label>
            <div className="flex flex-wrap gap-2">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className={`w-8 h-8 rounded border text-lg hover:bg-gray-100 ${
                    selectedEmoji === emoji ? "bg-blue-100 border-blue-300" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium mb-1">Preview</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">{selectedEmoji}</span>
                <span className="text-sm font-medium">{name || "Collection Name"}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                0
              </Badge>
            </div>
            <div className="text-xs text-gray-500 mt-1">{description || "Collection description"}</div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!name}>
              {isEditing ? "Update Collection" : "Create Collection"}
            </Button>
          </div>
        </div>
      </DialogContent>
      <ReferenceVideoSelector
        isOpen={showReferenceSelector}
        onClose={() => setShowReferenceSelector(false)}
        onSelect={(video) => {
          setSelectedReferenceVideo(video)
          setSmartCriteria(`reference:${video.id}`)
        }}
      />
    </Dialog>
  )
}
