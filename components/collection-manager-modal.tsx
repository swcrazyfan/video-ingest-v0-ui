"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Settings,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Plus,
  Sparkles,
  Bookmark,
  Camera,
  Calendar,
  Eye,
  AlertTriangle,
  RefreshCw,
} from "lucide-react"
import { CreateCollectionModal } from "./create-collection-modal"

interface CollectionManagerModalProps {
  isOpen: boolean
  onClose: () => void
}

const mockSmartCollections = [
  {
    id: "today",
    name: "Today's Footage",
    type: "smart-temporal",
    count: 23,
    description: "Videos added today",
    icon: "📅",
    auto: true,
    criteria: "last-24h",
    lastUpdated: "2 minutes ago",
    status: "active",
  },
  {
    id: "canon-eos-rp",
    name: "Canon EOS RP",
    type: "smart-camera",
    count: 156,
    description: "All footage from Canon EOS RP",
    icon: "📷",
    auto: true,
    criteria: "canon-eos-rp",
    lastUpdated: "5 minutes ago",
    status: "active",
  },
  {
    id: "talking-heads",
    name: "Talking Heads",
    type: "smart-similarity",
    count: 67,
    description: "Interview and talking head shots",
    icon: "🗣️",
    auto: true,
    criteria: "talking heads",
    lastUpdated: "1 hour ago",
    status: "active",
  },
  {
    id: "broken-collection",
    name: "Broken Collection",
    type: "smart-similarity",
    count: 0,
    description: "Collection with invalid criteria",
    icon: "❌",
    auto: true,
    criteria: "invalid-reference-video",
    lastUpdated: "2 days ago",
    status: "error",
  },
]

const mockUserCollections = [
  {
    id: "hero-shots",
    name: "Hero Shots",
    type: "manual",
    count: 12,
    description: "Best shots for marketing",
    icon: "⭐",
    auto: false,
    lastUpdated: "3 hours ago",
    status: "active",
  },
  {
    id: "b-roll-nature",
    name: "Nature B-Roll",
    type: "manual",
    count: 34,
    description: "Natural environment footage",
    icon: "🌿",
    auto: false,
    lastUpdated: "1 day ago",
    status: "active",
  },
]

export function CollectionManagerModal({ isOpen, onClose }: CollectionManagerModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingCollection, setEditingCollection] = useState<any>(null)
  const [deletingCollection, setDeletingCollection] = useState<any>(null)

  const allCollections = [...mockSmartCollections, ...mockUserCollections]
  const filteredCollections = allCollections.filter(
    (collection) =>
      collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEdit = (collection: any) => {
    setEditingCollection(collection)
    setShowCreateModal(true)
  }

  const handleDelete = (collection: any) => {
    setDeletingCollection(collection)
  }

  const confirmDelete = () => {
    console.log("Deleting collection:", deletingCollection.id)
    setDeletingCollection(null)
  }

  const handleRefresh = (collection: any) => {
    console.log("Refreshing smart collection:", collection.id)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "smart-camera":
        return <Camera className="w-4 h-4" />
      case "smart-temporal":
        return <Calendar className="w-4 h-4" />
      case "smart-similarity":
        return <Eye className="w-4 h-4" />
      case "manual":
        return <Bookmark className="w-4 h-4" />
      default:
        return <Sparkles className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "updating":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Manage Collections
              </DialogTitle>
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Collection
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Collections List */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {/* Smart Collections */}
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Smart Collections ({mockSmartCollections.length})
                </h3>
                <div className="space-y-2">
                  {filteredCollections
                    .filter((c) => c.auto)
                    .map((collection) => (
                      <Card key={collection.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{collection.icon}</span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium">{collection.name}</h4>
                                  {getTypeIcon(collection.type)}
                                  <Badge className={getStatusColor(collection.status)}>{collection.status}</Badge>
                                  <Badge variant="secondary" className="text-xs">
                                    {collection.count} videos
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">{collection.description}</p>
                                <div className="text-xs text-gray-500">
                                  Criteria: {collection.criteria} • Last updated: {collection.lastUpdated}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {collection.status === "error" && (
                                <Button variant="outline" size="sm" onClick={() => handleRefresh(collection)}>
                                  <RefreshCw className="w-4 h-4 mr-1" />
                                  Fix
                                </Button>
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleEdit(collection)}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Criteria
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleRefresh(collection)}>
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Refresh Now
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDelete(collection)} className="text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Collection
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* Manual Collections */}
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  Manual Collections ({mockUserCollections.length})
                </h3>
                <div className="space-y-2">
                  {filteredCollections
                    .filter((c) => !c.auto)
                    .map((collection) => (
                      <Card key={collection.id} className="border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{collection.icon}</span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium">{collection.name}</h4>
                                  <Bookmark className="w-4 h-4" />
                                  <Badge variant="secondary" className="text-xs">
                                    {collection.count} videos
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">{collection.description}</p>
                                <div className="text-xs text-gray-500">Last updated: {collection.lastUpdated}</div>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEdit(collection)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit Collection
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(collection)} className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Collection
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </div>

            {/* Delete Confirmation */}
            {deletingCollection && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong>Delete "{deletingCollection.name}"?</strong>
                      <p className="text-sm mt-1">
                        This action cannot be undone. The collection and its organization will be permanently removed.
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => setDeletingCollection(null)}>
                        Cancel
                      </Button>
                      <Button variant="destructive" size="sm" onClick={confirmDelete}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-end pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CreateCollectionModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false)
          setEditingCollection(null)
        }}
        editingCollection={editingCollection}
      />
    </>
  )
}
