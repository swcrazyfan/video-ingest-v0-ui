"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FolderOpen, Grid, Clock, CheckCircle, AlertCircle, Eye, HardDrive, Settings } from "lucide-react"
import Link from "next/link"

// Mock data for overview
const stats = {
  totalVideos: 1247,
  processed: 1189,
  processing: 8,
  failed: 5,
  queuedVideos: 45,
  totalDuration: "847 hours",
  totalSize: "2.4 TB",
  storageTotal: "5 TB",
}

const recentVideos = [
  {
    id: 1,
    filename: "sunset_drone_4k.mp4",
    thumbnail: "/placeholder.svg?height=120&width=200",
    status: "complete",
    addedAt: "2 hours ago",
    duration: "2:34",
    size: "1.2 GB",
    project: "Summer Campaign 2024",
  },
  {
    id: 2,
    filename: "interview_setup.mov",
    thumbnail: "/placeholder.svg?height=120&width=200",
    status: "processing",
    addedAt: "3 hours ago",
    duration: "15:22",
    size: "3.8 GB",
    project: "Product Launch",
  },
  {
    id: 3,
    filename: "product_demo.mp4",
    thumbnail: "/placeholder.svg?height=120&width=200",
    status: "complete",
    addedAt: "5 hours ago",
    duration: "3:45",
    size: "890 MB",
    project: "Product Launch",
  },
  {
    id: 4,
    filename: "conference_talk.mp4",
    thumbnail: "/placeholder.svg?height=120&width=200",
    status: "complete",
    addedAt: "1 day ago",
    duration: "45:12",
    size: "12.3 GB",
    project: "Corporate Training",
  },
]

export default function DashboardPage() {
  const [currentProject, setCurrentProject] = useState("all")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "processing":
        return <Clock className="w-4 h-4 text-blue-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-red-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentProject={currentProject} onProjectChange={setCurrentProject} />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">
            {currentProject === "all"
              ? "Overview of your entire video library and processing status"
              : "Overview of the current project's videos and processing status"}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/ingest">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <FolderOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-semibold">Ingest Videos</h3>
                <p className="text-sm text-gray-500">Add new videos to process</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/library">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Grid className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-semibold">Video Library</h3>
                <p className="text-sm text-gray-500">Browse and search videos</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/settings">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Settings className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-semibold">Settings</h3>
                <p className="text-sm text-gray-500">Configure processing</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVideos.toLocaleString()}</div>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  ✓ {stats.processed}
                </Badge>
                <Badge className="text-xs">⏳ {stats.processing}</Badge>
                <Badge variant="destructive" className="text-xs">
                  ✗ {stats.failed}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDuration}</div>
              <p className="text-sm text-gray-500 mt-1">of video content</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Processing queue</span>
                  <span>{stats.queuedVideos} videos</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <HardDrive className="w-4 h-4" />
                Storage Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSize}</div>
              <p className="text-sm text-gray-500 mt-1">of {stats.storageTotal} available</p>
              <div className="mt-2">
                <Progress value={48} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Processing Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">~2.3</div>
              <p className="text-sm text-gray-500 mt-1">videos per minute</p>
              <div className="flex items-center gap-1 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Processing active</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Stats (only show when not viewing all projects) */}
        {currentProject !== "all" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Videos in project</span>
                  <span className="font-medium">456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total duration</span>
                  <span className="font-medium">127 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Storage used</span>
                  <span className="font-medium">890 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Last updated</span>
                  <span className="font-medium">2 hours ago</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Processing Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Processed</span>
                  <span className="font-medium text-green-600">423</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing</span>
                  <span className="font-medium text-blue-600">5</span>
                </div>
                <div className="flex justify-between">
                  <span>Queued</span>
                  <span className="font-medium text-gray-600">26</span>
                </div>
                <div className="flex justify-between">
                  <span>Failed</span>
                  <span className="font-medium text-red-600">2</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/ingest">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FolderOpen className="w-4 h-4 mr-2" />
                    Ingest Videos
                  </Button>
                </Link>
                <Link href="/library">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Grid className="w-4 h-4 mr-2" />
                    Browse Videos
                  </Button>
                </Link>
                <Link href="/library">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Grid className="w-4 h-4 mr-2" />
                    Search Videos
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Videos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recently Added</CardTitle>
              <Link href="/library">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentVideos.map((video) => (
                <Card key={video.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.filename}
                      className="w-full h-24 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">{getStatusIcon(video.status)}</div>
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary" className="text-xs">
                        {video.duration}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm truncate mb-1">{video.filename}</h3>
                    <div className="text-xs text-gray-500 mb-1">
                      {video.size} • Project: {video.project}
                    </div>
                    <p className="text-xs text-gray-500">{video.addedAt}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
