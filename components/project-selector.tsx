"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { FolderOpen, Plus, Settings } from "lucide-react"

const projects = [
  { id: "all", name: "All Projects", videoCount: 1247, directory: null },
  {
    id: "summer-2024",
    name: "Summer Campaign 2024",
    videoCount: 456,
    directory: "/Users/editor/Projects/Summer-Campaign-2024",
  },
  { id: "product-launch", name: "Product Launch", videoCount: 234, directory: "/Users/editor/Projects/Product-Launch" },
  {
    id: "corporate-training",
    name: "Corporate Training",
    videoCount: 189,
    directory: "/Users/editor/Projects/Corporate-Training",
  },
  { id: "event-coverage", name: "Event Coverage", videoCount: 167, directory: "/Users/editor/Projects/Event-Coverage" },
  { id: "abc-corp", name: "Client Work - ABC Corp", videoCount: 123, directory: "/Users/editor/Projects/ABC-Corp" },
]

interface ProjectSelectorProps {
  currentProject: string
  onProjectChange: (projectId: string) => void
}

export function ProjectSelector({ currentProject, onProjectChange }: ProjectSelectorProps) {
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)
  const [newProjectName, setNewProjectName] = useState("")
  const [newProjectDirectory, setNewProjectDirectory] = useState("")

  const selectedProject = projects.find((p) => p.id === currentProject) || projects[0]

  const handleCreateProject = () => {
    // In a real app, this would create the project directory and initialize it
    console.log("Creating project:", { name: newProjectName, directory: newProjectDirectory })
    setShowNewProjectDialog(false)
    setNewProjectName("")
    setNewProjectDirectory("")
  }

  const handleBrowseDirectory = () => {
    // In Electron, this would open a directory picker
    console.log("Opening directory picker...")
  }

  return (
    <div className="border-b bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-600">Project:</span>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <h2 className="font-semibold text-lg">{selectedProject.name}</h2>
              </div>

              <Badge variant="secondary" className="ml-2">
                {selectedProject.videoCount.toLocaleString()} videos
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Select value={currentProject} onValueChange={onProjectChange}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{project.name}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {project.videoCount}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
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
                    <Label htmlFor="project-directory">Footage Directory</Label>
                    <div className="flex gap-2">
                      <Input
                        id="project-directory"
                        placeholder="Select folder containing all project footage"
                        value={newProjectDirectory}
                        onChange={(e) => setNewProjectDirectory(e.target.value)}
                      />
                      <Button variant="outline" onClick={handleBrowseDirectory}>
                        <FolderOpen className="w-4 h-4 mr-2" />
                        Browse
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      This folder will contain all video files for this project. Subfolders will be scanned
                      automatically.
                    </p>
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

            {currentProject !== "all" && (
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
