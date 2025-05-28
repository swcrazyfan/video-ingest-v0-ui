"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Save, HardDrive } from "lucide-react"

const processingSteps = [
  {
    id: "checksum",
    name: "MD5 Checksum",
    description: "Calculate file checksum for duplicate detection",
    enabled: true,
    required: true,
  },
  {
    id: "metadata",
    name: "FFmpeg Metadata",
    description: "Extract technical metadata (duration, codec, resolution)",
    enabled: true,
    required: false,
  },
  {
    id: "thumbnails",
    name: "Thumbnail Generation",
    description: "Generate 5 preview frames from video",
    enabled: true,
    required: false,
  },
  {
    id: "exposure",
    name: "Exposure Analysis",
    description: "Analyze video exposure and quality metrics",
    enabled: true,
    required: false,
  },
  {
    id: "focal_length",
    name: "AI Focal Length Detection",
    description: "Detect camera focal length using AI analysis",
    enabled: false,
    required: false,
  },
  {
    id: "compression",
    name: "Video Compression",
    description: "Generate compressed versions for web playback",
    enabled: false,
    required: false,
  },
  {
    id: "ai_analysis",
    name: "AI Content Analysis",
    description: "Comprehensive AI analysis of video content",
    enabled: false,
    required: false,
  },
  {
    id: "embeddings",
    name: "Vector Embeddings",
    description: "Generate embeddings for semantic search",
    enabled: false,
    required: false,
  },
]

const profileConfigurations = {
  basic: ["checksum", "metadata", "thumbnails"],
  standard: ["checksum", "metadata", "thumbnails", "exposure", "focal_length"],
  premium: [
    "checksum",
    "metadata",
    "thumbnails",
    "exposure",
    "focal_length",
    "compression",
    "ai_analysis",
    "embeddings",
  ],
  custom: [],
}

export default function SettingsPage() {
  const [currentProject, setCurrentProject] = useState("all")
  const [steps, setSteps] = useState(processingSteps)
  const [selectedProfile, setSelectedProfile] = useState("custom")

  const toggleStep = (stepId: string) => {
    setSteps(steps.map((step) => (step.id === stepId ? { ...step, enabled: !step.enabled } : step)))
    setSelectedProfile("custom") // Mark as custom if user manually changes steps
  }

  const applyProfile = (profileName: string) => {
    setSelectedProfile(profileName)
    setSteps(
      steps.map((step) => ({
        ...step,
        enabled: profileConfigurations[profileName as keyof typeof profileConfigurations].includes(step.id),
      })),
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentProject={currentProject} onProjectChange={setCurrentProject} />

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Processing Settings</h1>
            <p className="text-gray-600">Configure which processing steps to run on your videos</p>
          </div>

          {/* Processing Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="w-5 h-5" />
                Processing Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{steps.filter((s) => s.enabled).length}</div>
                  <p className="text-sm text-gray-500">enabled steps</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">Active</div>
                  <p className="text-sm text-gray-500">processing status</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {
                      steps.filter(
                        (s) =>
                          s.enabled && (s.id === "ai_analysis" || s.id === "embeddings" || s.id === "focal_length"),
                      ).length
                    }
                  </div>
                  <p className="text-sm text-gray-500">AI processing steps</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processing Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Processing Steps</CardTitle>
              <CardDescription>Enable or disable processing steps. Required steps cannot be disabled.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <Switch
                          checked={step.enabled}
                          onCheckedChange={() => toggleStep(step.id)}
                          disabled={step.required}
                        />
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            {step.name}
                            {step.required && (
                              <Badge variant="outline" className="text-xs">
                                Required
                              </Badge>
                            )}
                          </h3>
                          <p className="text-sm text-gray-500">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Processing Profiles */}
          <Card>
            <CardHeader>
              <CardTitle>Processing Profiles</CardTitle>
              <CardDescription>Choose a processing profile to quickly configure your settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Select value={selectedProfile} onValueChange={applyProfile}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a profile" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="custom">Custom Configuration</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">Basic</h4>
                  <p className="text-gray-500">Fast processing for quick previews.</p>
                  <Badge variant="secondary" className="mt-1">
                    {profileConfigurations.basic.length} steps
                  </Badge>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">Standard</h4>
                  <p className="text-gray-500">Balanced processing for most use cases.</p>
                  <Badge className="mt-1">{profileConfigurations.standard.length} steps</Badge>
                </div>
                <div className="p-3 border rounded-lg">
                  <h4 className="font-medium">Premium</h4>
                  <p className="text-gray-500">Comprehensive processing with all features enabled.</p>
                  <Badge className="mt-1">{profileConfigurations.premium.length} steps</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Configuration
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
