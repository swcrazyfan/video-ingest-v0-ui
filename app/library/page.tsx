"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Search,
  Grid,
  List,
  Filter,
  Tag,
  MapPin,
  Camera,
  Star,
  Eye,
  Shuffle,
  Globe,
  Info,
  Mic,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Bookmark,
  Plus,
  Settings,
} from "lucide-react"
import { SimilaritySearchModal } from "@/components/similarity-search-modal"
import { VideoDetailsModal } from "@/components/video-details-modal"
import { CreateCollectionModal } from "@/components/create-collection-modal"
import { CollectionManagerModal } from "@/components/collection-manager-modal"

const mockVideos = [
  {
    id: 1,
    filename: "MVI_0481.MP4",
    thumbnail: "/placeholder.svg?height=120&width=200",
    duration: "0:25",
    size: "372 MB",
    quality: "excellent",
    focalLength: "40mm",
    fStop: "f/5.0",
    camera: "Canon EOS RP",
    lens: "RF24-105mm F4-7.1 IS STM",
    location: "Studio with Green Screen",
    tags: ["Performance", "Acting Test", "Talking Head"],
    category: "Performance",
    project: "Summer Campaign 2024",
    views: 23,
    starred: true,
    exposureStatus: "good",
    hasTranscript: true,
    metadata: {
      resolution: "3840×2160",
      frameRate: "23.976 fps",
      codec: "H.264 (High)",
      iso: 800,
      aperture: "f/5.0",
      exposureMode: "Manual",
      speakers: 2,
      transcript: "Oh Action Pay no attention to the man behind the curtain...",
      contentSummary:
        "A young man performs lines in front of a green screen, receiving direction from an off-camera individual.",
      focusQuality: "Excellent",
      stability: "Very Stable",
      audioClarity: "Good",
      usabilityRating: "Excellent",
    },
  },
  {
    id: 2,
    filename: "interview_setup.mov",
    thumbnail: "/placeholder.svg?height=120&width=200",
    duration: "15:22",
    size: "3.8 GB",
    quality: "good",
    focalLength: "50mm",
    fStop: "f/2.8",
    camera: "Sony FX3",
    lens: "Sony FE 24-70mm",
    location: "Studio A",
    tags: ["interview", "indoor", "talking head"],
    category: "Interviews",
    project: "Product Launch",
    views: 45,
    starred: false,
    exposureStatus: "good",
    hasTranscript: true,
    metadata: {
      resolution: "1920×1080",
      frameRate: "24 fps",
      codec: "ProRes 422",
      iso: 400,
      aperture: "f/2.8",
      exposureMode: "Manual",
      speakers: 2,
      transcript: "Welcome to our product interview series...",
      contentSummary: "Professional interview setup with two speakers discussing product features.",
      focusQuality: "Good",
      stability: "Stable",
      audioClarity: "Excellent",
      usabilityRating: "Good",
    },
  },
  {
    id: 3,
    filename: "product_demo.mp4",
    thumbnail: "/placeholder.svg?height=120&width=200",
    duration: "3:45",
    size: "890 MB",
    quality: "excellent",
    focalLength: "35mm",
    fStop: "f/4.0",
    camera: "Canon R5",
    lens: "Canon RF 24-70mm",
    location: "Office",
    tags: ["product", "demo", "tech"],
    category: "Marketing",
    project: "Product Launch",
    views: 67,
    starred: true,
    exposureStatus: "warning",
    hasTranscript: false,
    metadata: {
      resolution: "4096×2160",
      frameRate: "30 fps",
      codec: "H.265 (Main)",
      iso: 200,
      aperture: "f/4.0",
      exposureMode: "Aperture Priority",
      speakers: 1,
      transcript: "Today I'll be demonstrating our new product features...",
      contentSummary: "Detailed product demonstration showing key features and functionality.",
      focusQuality: "Excellent",
      stability: "Very Stable",
      audioClarity: "Very Clear",
      usabilityRating: "Excellent",
    },
  },
]

const categories = [
  { name: "All Videos", count: 1247, color: "bg-gray-100" },
  { name: "Performance", count: 456, color: "bg-blue-100" },
  { name: "Interviews", count: 234, color: "bg-green-100" },
  { name: "Marketing", count: 189, color: "bg-purple-100" },
  { name: "Events", count: 167, color: "bg-yellow-100" },
  { name: "Tutorials", count: 123, color: "bg-red-100" },
]

const searchExamples = ["sunset drone footage", "people talking indoors", "wide angle b-roll", "action sequences"]

export default function LibraryPage() {
  const [currentProject, setCurrentProject] = useState("summer-2024")
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("recent")
  const [selectedCategory, setSelectedCategory] = useState("All Videos")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState("hybrid")
  const [searchAllProjects, setSearchAllProjects] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

  // Collections data
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [showCreateCollection, setShowCreateCollection] = useState(false)
  const [showCollectionManager, setShowCollectionManager] = useState(false)

  const smartCollections = [
    {
      id: "today",
      name: "Today's Footage",
      type: "temporal",
      count: 23,
      description: "Videos added today",
      icon: "📅",
      auto: true,
    },
    {
      id: "this-week",
      name: "This Week",
      type: "temporal",
      count: 89,
      description: "Videos from the past 7 days",
      icon: "📆",
      auto: true,
    },
    {
      id: "canon-eos-rp",
      name: "Canon EOS RP",
      type: "camera",
      count: 156,
      description: "All footage from Canon EOS RP",
      icon: "📷",
      auto: true,
    },
    {
      id: "sony-fx3",
      name: "Sony FX3",
      type: "camera",
      count: 234,
      description: "All footage from Sony FX3",
      icon: "📹",
      auto: true,
    },
    {
      id: "talking-heads",
      name: "Talking Heads",
      type: "similarity",
      count: 67,
      description: "Interview and talking head shots",
      icon: "🗣️",
      auto: true,
    },
    {
      id: "wide-shots",
      name: "Wide Shots",
      type: "similarity",
      count: 89,
      description: "Wide angle and establishing shots",
      icon: "🌅",
      auto: true,
    },
  ]

  const userCollections = [
    {
      id: "hero-shots",
      name: "Hero Shots",
      type: "manual",
      count: 12,
      description: "Best shots for marketing",
      icon: "⭐",
      auto: false,
    },
    {
      id: "b-roll-nature",
      name: "Nature B-Roll",
      type: "manual",
      count: 34,
      description: "Natural environment footage",
      icon: "🌿",
      auto: false,
    },
  ]

  const [showSimilarityModal, setShowSimilarityModal] = useState(false)
  const [selectedVideoForSimilarity, setSelectedVideoForSimilarity] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedVideoForDetails, setSelectedVideoForDetails] = useState<any>(null)

  const isSearchMode = searchQuery.length > 0

  const toggleCardExpansion = (cardId: number) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId)
    } else {
      newExpanded.add(cardId)
    }
    setExpandedCards(newExpanded)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentProject={currentProject} onProjectChange={setCurrentProject} />

      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-80 space-y-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Video Library</h1>
              <p className="text-gray-600 text-sm">
                {currentProject === "all"
                  ? "Search and explore your entire video collection"
                  : "Search and explore videos in the current project"}
              </p>
            </div>

            {/* Search Interface */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search content, transcripts, metadata..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Search Examples */}
              {!isSearchMode && (
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs text-gray-500">Try:</span>
                  {searchExamples.map((example) => (
                    <Button
                      key={example}
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs"
                      onClick={() => setSearchQuery(example)}
                    >
                      {example}
                    </Button>
                  ))}
                </div>
              )}

              {/* Search Controls */}
              {isSearchMode && (
                <div className="space-y-2">
                  <Select value={searchType} onValueChange={setSearchType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hybrid">Hybrid Search</SelectItem>
                      <SelectItem value="semantic">Semantic Search</SelectItem>
                      <SelectItem value="fulltext">Full-text Search</SelectItem>
                      <SelectItem value="transcripts">Transcript Search</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Cross-project search toggle */}
              {currentProject !== "all" && (
                <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <div className="flex-1">
                    <Label htmlFor="search-all" className="text-sm font-medium">
                      Search all projects
                    </Label>
                  </div>
                  <Switch id="search-all" checked={searchAllProjects} onCheckedChange={setSearchAllProjects} />
                </div>
              )}
            </div>

            {/* Filters */}
            <div className="space-y-4">
              {!isSearchMode && (
                <div>
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Categories
                  </h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <div
                        key={category.name}
                        className={`p-2 rounded cursor-pointer transition-colors ${
                          selectedCategory === category.name ? "bg-blue-100 border-blue-300" : "hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedCategory(category.name)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded ${category.color}`} />
                            <span className="text-sm font-medium">{category.name}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Smart Collections */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Smart Collections
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCollectionManager(true)}
                    className="h-6 w-6 p-0"
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {smartCollections.map((collection) => (
                    <div
                      key={collection.id}
                      className={`p-2 rounded cursor-pointer transition-colors ${
                        selectedCollection === collection.id ? "bg-blue-100 border-blue-300" : "hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedCollection(collection.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{collection.icon}</span>
                          <span className="text-sm font-medium">{collection.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {collection.count}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{collection.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* User Collections */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Bookmark className="w-4 h-4" />
                    My Collections
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCreateCollection(true)}
                    className="h-6 w-6 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {userCollections.map((collection) => (
                    <div
                      key={collection.id}
                      className={`p-2 rounded cursor-pointer transition-colors ${
                        selectedCollection === collection.id ? "bg-blue-100 border-blue-300" : "hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedCollection(collection.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{collection.icon}</span>
                          <span className="text-sm font-medium">{collection.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {collection.count}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{collection.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="w-full"
              >
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
                {showAdvancedFilters ? (
                  <ChevronUp className="w-4 h-4 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-2" />
                )}
              </Button>

              {showAdvancedFilters && (
                <div className="space-y-3 p-3 border rounded-lg">
                  <div>
                    <Label className="text-sm font-medium">Quality</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All qualities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Camera</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All cameras" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="canon-eos-rp">Canon EOS RP</SelectItem>
                        <SelectItem value="sony-fx3">Sony FX3</SelectItem>
                        <SelectItem value="canon-r5">Canon R5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">
                  {selectedCollection
                    ? [...smartCollections, ...userCollections].find((c) => c.id === selectedCollection)?.name
                    : isSearchMode
                      ? `Search Results`
                      : selectedCategory}
                </h2>
                <Badge variant="secondary">{mockVideos.length} videos</Badge>
                {selectedCollection && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Bookmark className="w-3 h-3" />
                    Collection
                  </Badge>
                )}
                {searchAllProjects && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    All Projects
                  </Badge>
                )}
                {isSearchMode && <Badge variant="outline">{searchType} search</Badge>}
              </div>

              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recently Added</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                    <SelectItem value="quality">Quality</SelectItem>
                    <SelectItem value="relevance">Relevance</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Video Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "space-y-2"
              }
            >
              {mockVideos.map((video) => (
                <Card key={video.id} className="cursor-pointer hover:shadow-md transition-shadow group">
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.filename}
                          className="w-full h-32 object-cover rounded-t-lg"
                          onClick={() => {
                            setSelectedVideoForDetails(video)
                            setShowDetailsModal(true)
                          }}
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          {video.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                          <Badge variant="secondary" className="text-xs">
                            {video.duration}
                          </Badge>
                        </div>
                        <div className="absolute bottom-2 left-2 flex gap-1">
                          <Badge
                            className={`text-xs ${video.exposureStatus === "warning" ? "bg-yellow-500" : "bg-green-500"} text-white`}
                          >
                            {video.exposureStatus === "warning" ? "Warning" : "Good"}
                          </Badge>
                          {video.hasTranscript && (
                            <Badge className="text-xs bg-blue-500 text-white">
                              <Mic className="w-3 h-3" />
                            </Badge>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-t-lg flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedVideoForSimilarity(video)
                                setShowSimilarityModal(true)
                              }}
                            >
                              <Shuffle className="w-4 h-4 mr-1" />
                              Similar
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedVideoForDetails(video)
                                setShowDetailsModal(true)
                              }}
                            >
                              <Info className="w-4 h-4 mr-1" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-3">
                        {/* Main Section */}
                        <div className="space-y-2">
                          <h3 className="font-medium text-sm truncate">{video.filename}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Project: {video.project}</span>
                            <Badge className="text-xs bg-green-100 text-green-800">{video.quality}</Badge>
                          </div>

                          {/* Key Technical Specs */}
                          <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                            <span>{video.focalLength}</span>
                            <span>{video.fStop}</span>
                            <span>{video.metadata.resolution}</span>
                            <span>{video.metadata.frameRate}</span>
                          </div>
                        </div>

                        {/* Advanced Section Toggle */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full mt-2 h-6 text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleCardExpansion(video.id)
                          }}
                        >
                          {expandedCards.has(video.id) ? (
                            <>
                              Less <ChevronUp className="w-3 h-3 ml-1" />
                            </>
                          ) : (
                            <>
                              More <ChevronDown className="w-3 h-3 ml-1" />
                            </>
                          )}
                        </Button>

                        {/* Advanced Section */}
                        {expandedCards.has(video.id) && (
                          <div className="mt-2 pt-2 border-t space-y-2">
                            <div className="flex items-center gap-1">
                              <Camera className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{video.camera}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{video.location}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {video.size} • {video.metadata.codec}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {video.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {video.views}
                              </span>
                              <div className="flex gap-1">
                                <Badge className="text-xs bg-green-100 text-green-800">
                                  {video.metadata.focusQuality}
                                </Badge>
                                <Badge className="text-xs bg-blue-100 text-blue-800">
                                  {video.metadata.audioClarity}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </>
                  ) : (
                    <CardContent className="p-4 flex items-center gap-4">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.filename}
                        className="w-16 h-10 object-cover rounded cursor-pointer"
                        onClick={() => {
                          setSelectedVideoForDetails(video)
                          setShowDetailsModal(true)
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{video.filename}</h3>
                          {video.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{video.duration}</span>
                          <span>{video.focalLength}</span>
                          <span>{video.fStop}</span>
                          <span>{video.camera}</span>
                          <span>Project: {video.project}</span>
                          <Badge
                            className={`text-xs ${video.exposureStatus === "warning" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                          >
                            {video.exposureStatus === "warning" ? "Warning" : "Good"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedVideoForSimilarity(video)
                            setShowSimilarityModal(true)
                          }}
                        >
                          <Shuffle className="w-4 h-4 mr-1" />
                          Similar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedVideoForDetails(video)
                            setShowDetailsModal(true)
                          }}
                        >
                          <Info className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <SimilaritySearchModal
        isOpen={showSimilarityModal}
        onClose={() => setShowSimilarityModal(false)}
        referenceVideo={selectedVideoForSimilarity}
      />

      <VideoDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        video={selectedVideoForDetails}
      />

      <CreateCollectionModal isOpen={showCreateCollection} onClose={() => setShowCreateCollection(false)} />
      <CollectionManagerModal isOpen={showCollectionManager} onClose={() => setShowCollectionManager(false)} />
    </div>
  )
}
