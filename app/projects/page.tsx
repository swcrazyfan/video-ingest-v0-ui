"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  FolderOpen,
  Plus,
  Settings,
  MoreHorizontal,
  Search,
  Calendar,
  HardDrive,
  Video,
  Clock,
  Trash2,
  Edit,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const projects = [
  {
    id: "summer-2024",
    name: "Summer Campaign 2024",
    description: "Marketing campaign footage for summer product launch",
    directory: "/Users/editor/Projects/Summer-Campaign-2024",
    videoCount: 456,
    totalSize: "890 GB",
    lastActivity: "2 hours ago",
    created: "2024-05-01",
    status: "active",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "product-launch",
    name: "Product Launch",
    description: "Product demonstration and launch event footage",
    directory: "/Users/editor/Projects/Product-Launch",
    videoCount: 234,
    totalSize: "567 GB",
    lastActivity: "1 day ago",
    created: "2024-04-15",
    status: "active",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "corporate-training",
    name: "Corporate Training",
    description: "Internal training videos and presentations",
    directory: "/Users/editor/Projects/Corporate-Training",
    videoCount: 189,
    totalSize: "345 GB",
    lastActivity: "3 days ago",
    created: "2024-03-20",
    status: "active",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    id: "event-coverage",
    name: "Event Coverage",
    description: "Conference and event documentation",
    directory: "/Users/editor/Projects/Event-Coverage",
    videoCount: 167,
    totalSize: "423 GB",
    lastActivity: "1 week ago",
    created: "2024-02-10",
    status: "archived",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)
  const [newProjectName, setNewProjectName] = useState("")
  const [newProjectDescription, setNewProjectDescription] = useState("")
  const [newProjectDirectory, setNewProjectDirectory] = useState("")

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateProject = () => {
    console.log("Creating project:", {
      name: newProjectName,
      description: newProjectDescription,
      directory: newProjectDirectory,
    })
    setShowNewProjectDialog(false)
    setNewProjectName("")
    setNewProjectDescription("")
    setNewProjectDirectory("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Projects</h1>
              <p className="text-gray-600">Manage your video projects and organize footage by location</p>
            </div>

            <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input
                      id="project-name"
                      placeholder="Enter project name"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-description">Description</Label>
                    <Input
                      id="project-description"
                      placeholder="Brief description of the project"
                      value={newProjectDescription}
                      onChange={(e) => setNewProjectDescription(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-directory">Footage Directory</Label>
                    <div className="flex gap-2">
                      <Input
                        id="project-directory"
                        placeholder="Select folder containing project footage"
                        value={newProjectDirectory}
                        onChange={(e) => setNewProjectDirectory(e.target.value)}
                      />
                      <Button variant="outline">
                        <FolderOpen className="w-4 h-4 mr-2" />
                        Browse
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowNewProjectDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateProject} disabled={!newProjectName || !newProjectDirectory}>
                      Create Project
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={project.thumbnail || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{project.name}</CardTitle>
                      <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Project Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-gray-400" />
                      <span>{project.videoCount} videos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-gray-400" />
                      <span>{project.totalSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{project.created}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{project.lastActivity}</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">{project.directory}</div>

                  <div className="flex gap-2">
                    <Link href={`/library?project=${project.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Browse Videos
                      </Button>
                    </Link>
                    <Link href={`/ingest?project=${project.id}`}>
                      <Button size="sm">Ingest</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
