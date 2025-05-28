"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { User, Settings, Minimize2, Square, X, FolderOpen } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  isProcessing?: boolean
  currentProject?: string
  onProjectChange?: (projectId: string) => void
}

const projects = [
  { id: "all", name: "All Projects", videoCount: 1247 },
  { id: "summer-2024", name: "Summer Campaign 2024", videoCount: 456 },
  { id: "product-launch", name: "Product Launch", videoCount: 234 },
  { id: "corporate-training", name: "Corporate Training", videoCount: 189 },
]

export function Header({ isProcessing = true, currentProject = "all", onProjectChange }: HeaderProps) {
  const selectedProject = projects.find((p) => p.id === currentProject) || projects[0]

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="text-xl font-bold">Video Ingest Tool</div>

          {/* Compact Project Selector */}
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-gray-500" />
            <Select value={currentProject} onValueChange={onProjectChange}>
              <SelectTrigger className="w-48 h-8">
                <SelectValue>
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate">{selectedProject.name}</span>
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {selectedProject.videoCount}
                    </Badge>
                  </div>
                </SelectValue>
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
          </div>
        </div>

        <nav className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600">
            Dashboard
          </Link>
          <Link href="/projects" className="text-sm font-medium hover:text-blue-600">
            Projects
          </Link>
          <Link href="/ingest" className="text-sm font-medium hover:text-blue-600">
            Ingest
          </Link>
          <Link href="/library" className="text-sm font-medium hover:text-blue-600">
            Library
          </Link>
          <Link href="/settings" className="text-sm font-medium hover:text-blue-600">
            Settings
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Local User
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Preferences
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Window controls for Electron */}
          <div className="flex items-center gap-1 ml-4">
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <Square className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-red-500 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
