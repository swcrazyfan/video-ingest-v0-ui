"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  FolderOpen,
  Upload,
  Settings,
  Play,
  Pause,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  Info,
} from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockIngestQueue = [
  {
    id: 1,
    filename: "beach_sunset_4k.mp4",
    size: "1.2 GB",
    status: "processing",
    currentStep: "AI Analysis",
    progress: 65,
    addedAt: "2 min ago",
    path: "/Users/editor/Projects/Summer-Campaign-2024/Day1/beach_sunset_4k.mp4",
  },
  {
    id: 2,
    filename: "conference_talk.mov",
    size: "3.8 GB",
    status: "processing",
    currentStep: "Thumbnail Generation",
    progress: 30,
    addedAt: "5 min ago",
    path: "/Users/editor/Projects/Summer-Campaign-2024/Interviews/conference_talk.mov",
  },
  {
    id: 3,
    filename: "product_demo.mp4",
    size: "890 MB",
    status: "queued",
    currentStep: "Waiting",
    progress: 0,
    addedAt: "8 min ago",
    path: "/Users/editor/Projects/Summer-Campaign-2024/B-Roll/product_demo.mp4",
  },
]

export default function IngestPage() {
  const [currentProject, setCurrentProject] = useState("summer-2024")
  const [processingProfile, setProcessingProfile] = useState("standard")
  const [isProcessing, setIsProcessing] = useState(true)
  const [isScanning, setIsScanning] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "queued":
        return <Pause className="w-4 h-4 text-gray-500" />
      case "complete":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-red-500" />
    }
  }

  const handleScanProject = () => {
    setIsScanning(true)
    // Simulate scanning
    setTimeout(() => setIsScanning(false), 3000)
  }

  const currentProjectData = {
    name: "Summer Campaign 2024",
    directory: "/Users/editor/Projects/Summer-Campaign-2024",
    videoCount: 456,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentProject={currentProject} onProjectChange={setCurrentProject} />

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Video Ingest</h1>
            <p className="text-gray-600">
              {currentProject === "all"
                ? "Select a project to ingest videos"
                : `Scan and process videos in ${currentProjectData.name}`}
            </p>
          </div>

          {currentProject === "all" ? (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Please select a specific project to ingest videos. Videos are organized by project directories.
              </AlertDescription>
            </Alert>
          ) : (
            <Tabs defaultValue="add" className="w-full">
              <TabsList>
                <TabsTrigger value="add">Add Videos</TabsTrigger>
                <TabsTrigger value="queue">Processing Queue</TabsTrigger>
              </TabsList>
              <TabsContent value="add">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Ingest Controls */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Project Directory Scan */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FolderOpen className="w-5 h-5" />
                          Project Directory Scan
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Current Project Directory</Label>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="font-mono text-sm">{currentProjectData.directory}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              All video files in this directory and subdirectories will be scanned
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="processing-profile">Processing Profile</Label>
                          <Select value={processingProfile} onValueChange={setProcessingProfile}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">Basic - Metadata + Thumbnails</SelectItem>
                              <SelectItem value="standard">Standard - + Exposure + AI Focal Length</SelectItem>
                              <SelectItem value="premium">Premium - All Features</SelectItem>
                              <SelectItem value="custom">Custom Configuration</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Settings className="w-4 h-4" />
                            <Link href="/settings" className="hover:text-blue-600">
                              Configure processing steps
                            </Link>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1" onClick={handleScanProject} disabled={isScanning}>
                            {isScanning ? (
                              <>
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                Scanning Directory...
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4 mr-2" />
                                Scan & Add New Videos
                              </>
                            )}
                          </Button>
                          <Button variant="outline">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Rescan All
                          </Button>
                        </div>

                        {isScanning && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Scanning for new videos...</span>
                              <span>23 found</span>
                            </div>
                            <Progress value={67} className="h-2" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sidebar Stats */}
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Project Status</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Total Videos</span>
                          <Badge>{currentProjectData.videoCount}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Processing Status</span>
                          <Badge>Active</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Processing Rate</span>
                          <span className="text-sm text-gray-600">~2.3/min</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Directory Structure</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm font-mono">
                        <div className="text-gray-600">Summer-Campaign-2024/</div>
                        <div className="ml-4 text-gray-600">
                          ├── Day1/{" "}
                          <Badge variant="outline" className="ml-2 text-xs">
                            45 videos
                          </Badge>
                        </div>
                        <div className="ml-4 text-gray-600">
                          ├── Day2/{" "}
                          <Badge variant="outline" className="ml-2 text-xs">
                            67 videos
                          </Badge>
                        </div>
                        <div className="ml-4 text-gray-600">
                          ├── Interviews/{" "}
                          <Badge variant="outline" className="ml-2 text-xs">
                            23 videos
                          </Badge>
                        </div>
                        <div className="ml-4 text-gray-600">
                          ├── B-Roll/{" "}
                          <Badge variant="outline" className="ml-2 text-xs">
                            156 videos
                          </Badge>
                        </div>
                        <div className="ml-4 text-gray-600">
                          └── Raw/{" "}
                          <Badge variant="outline" className="ml-2 text-xs">
                            165 videos
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Today's Activity</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Videos Scanned</span>
                          <span className="font-medium">47</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Completed</span>
                          <span className="font-medium text-green-600">42</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Failed</span>
                          <span className="font-medium text-red-600">2</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Data Processed</span>
                          <span className="font-medium">156 GB</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Processing Profile</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Current Profile</span>
                            <Badge>{processingProfile}</Badge>
                          </div>
                          <div className="text-sm text-gray-500">
                            {processingProfile === "standard" &&
                              "Metadata, thumbnails, exposure analysis, AI focal length detection"}
                            {processingProfile === "basic" && "Metadata extraction and thumbnail generation only"}
                            {processingProfile === "premium" &&
                              "All processing steps including AI analysis and embeddings"}
                          </div>
                          <Link href="/settings">
                            <Button variant="outline" size="sm" className="w-full mt-2">
                              <Settings className="w-4 h-4 mr-2" />
                              Configure Steps
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="queue">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Processing Queue</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          {isProcessing ? (
                            <>
                              <Pause className="w-4 h-4 mr-2" />
                              Pause All
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Resume All
                            </>
                          )}
                        </Button>
                        <Link href="/queue">
                          <Button variant="outline" size="sm">
                            View Full Queue
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockIngestQueue.map((item) => (
                        <Card key={item.id} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                {getStatusIcon(item.status)}
                                <div>
                                  <h3 className="font-medium">{item.filename}</h3>
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span>{item.size}</span>
                                    <span>•</span>
                                    <span>{item.addedAt}</span>
                                  </div>
                                  <div className="text-xs text-gray-400 font-mono mt-1">
                                    {item.path.replace(currentProjectData.directory, ".")}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Pause className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{item.currentStep}</span>
                                <span>{item.progress}%</span>
                              </div>
                              <Progress value={item.progress} className="h-2" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  )
}
