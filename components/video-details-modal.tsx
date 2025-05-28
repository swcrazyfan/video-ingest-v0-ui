"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Eye, FileText, Users, MapPin, Clock, Palette, Monitor, Volume2, Tag } from "lucide-react"

interface VideoDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  video: any // In real app, this would be properly typed
}

// Mock data based on the provided JSON structure
const mockVideoData = {
  id: "6b3ae093-12f1-4a49-a448-a0406867b3a9",
  file_info: {
    file_path: "/Users/developer/Projects/Summer-Campaign-2024/Day1/MVI_0481.MP4",
    file_name: "MVI_0481.MP4",
    file_checksum: "4c7ca8bf93c109904fb1dc0cbeedcb09",
    file_size_bytes: 389663744,
    created_at: "2026-05-21 12:11:43",
    processed_at: "2025-05-22 23:57:53.578968",
  },
  video: {
    duration_seconds: 25.651,
    codec: {
      name: "avc1",
      profile: "High",
      level: "5.1",
      bitrate_kbps: 121210031,
      bit_depth: 8,
      chroma_subsampling: "4:2:0",
      scan_type: "Progressive",
    },
    container: "MPEG-4",
    resolution: {
      width: 3840,
      height: 2160,
      aspect_ratio: "16:9",
    },
    frame_rate: 23.976,
    color: {
      color_space: "YUV",
      color_primaries: "BT.709",
      transfer_characteristics: "BT.709",
      matrix_coefficients: "BT.709",
      color_range: "Full",
    },
    exposure: {
      warning: false,
      stops: 0.0,
      overexposed_percentage: 0.0,
      underexposed_percentage: 1.6527777777777777,
    },
  },
  audio_tracks: [
    {
      track_id: "2",
      codec: "AAC",
      codec_id: "mp4a-40-2",
      channels: 2,
      channel_layout: "L R",
      sample_rate: 48000,
      bit_rate_kbps: 256000,
      language: "en",
      duration_seconds: 25.643,
    },
  ],
  camera: {
    make: "Canon",
    model: "Canon EOS RP",
    lens_model: "RF24-105mm F4-7.1 IS STM",
    focal_length: {
      value_mm: 40.0,
      category: "MEDIUM",
      source: "EXIF",
    },
    settings: {
      iso: 800,
      shutter_speed: "0.00602426103674977",
      f_stop: 5.0,
      exposure_mode: "MANUAL_EXPOSURE",
      white_balance: "MANUAL_WHITE_BALANCE",
    },
  },
  analysis: {
    content_tags: ["Performance / Acting Test", "speakers:2", "quality:excellent", "Talking Head"],
    content_summary:
      "A young man, serving as an actor/subject, performs lines in front of a green screen, receiving direction from an off-camera individual. The video primarily captures his performance and reactions to external cues.",
    ai_analysis: {
      summary: {
        overall:
          "A young man, serving as an actor/subject, performs lines in front of a green screen, receiving direction from an off-camera individual. The video primarily captures his performance and reactions to external cues.",
        key_activities: [
          "Actor delivering lines",
          "Actor reacting to off-screen instructions",
          "Standing still in front of a green screen",
        ],
        content_category: "Performance / Acting Test",
      },
      visual_analysis: {
        shot_types: [
          {
            timestamp: "00:00:00",
            duration_seconds: null,
            shot_type: "Talking Head",
            description:
              "A static shot of a young man from the chest up, facing the camera, against a green screen. He delivers lines and reacts to off-screen cues.",
            confidence: 0.95,
          },
        ],
        technical_quality: {
          overall_focus_quality: "Excellent",
          stability_assessment: "Very Stable",
          usability_rating: "Excellent",
        },
        text_and_graphics: {
          detected_text: [],
          detected_logos_icons: [],
        },
      },
      audio_analysis: {
        transcript: {
          full_text:
            "Oh Action Pay no attention to the man behind the curtain. Curtain, go before I lose my temper. Great. Yeah. Yeah, yeah, yeah. Cool. Cool. Let's do it the same way again. Uh, okay. Yeah. Pay no attention to the man behind the curtain. Go before I lose my temper. Perfect. Yeah.",
          segments: [
            { timestamp: "00:00:428", speaker: null, text: "Oh", confidence: null },
            { timestamp: "00:02:410", speaker: null, text: "Action", confidence: null },
            {
              timestamp: "00:03:240",
              speaker: null,
              text: "Pay no attention to the man behind the curtain. Curtain, go before I lose my temper.",
              confidence: null,
            },
            { timestamp: "00:10:478", speaker: null, text: "Great.", confidence: null },
            { timestamp: "00:11:650", speaker: null, text: "Yeah. Yeah, yeah, yeah. Cool. Cool.", confidence: null },
            { timestamp: "00:13:960", speaker: null, text: "Let's do it the same way again.", confidence: null },
            { timestamp: "00:16:380", speaker: null, text: "Uh, okay.", confidence: null },
            {
              timestamp: "00:18:670",
              speaker: null,
              text: "Pay no attention to the man behind the curtain. Go before I lose my temper.",
              confidence: null,
            },
            { timestamp: "00:25:032", speaker: null, text: "Perfect.", confidence: null },
            { timestamp: "00:25:862", speaker: null, text: "Yeah.", confidence: null },
          ],
        },
        speaker_analysis: {
          speaker_count: 2,
          speakers: [
            { speaker_id: "Speaker_0", speaking_time_seconds: 4.197, segments_count: 6 },
            { speaker_id: "Speaker_1", speaking_time_seconds: 9.42, segments_count: 3 },
          ],
        },
        audio_quality: {
          clarity: "Good",
          background_noise_level: "Minimal",
          dialogue_intelligibility: "Very Clear",
        },
      },
      content_analysis: {
        entities: {
          people_count: 2,
          people_details: [
            {
              description: "Young Asian male with dark, curly hair wearing a black t-shirt.",
              role: "Subject / Actor",
              visibility_duration: "Throughout",
            },
            {
              description: "Unseen individual giving vocal cues.",
              role: "Director / Coach",
              visibility_duration: "Intermittent",
            },
          ],
          locations: [
            {
              name: "Studio with Green Screen",
              type: "Studio",
              description:
                "An indoor setting, likely a professional studio, identified by the large green screen background.",
            },
          ],
          objects_of_interest: [
            {
              object: "Lavalier Microphone",
              significance: "Audio recording equipment, indicating professional setup.",
              timestamp: "00:00:00",
            },
          ],
        },
        activity_summary: [
          {
            activity: "Actor preparing and receiving initial cue",
            timestamp: "00:00:00",
            duration: "0m02s410ms",
            importance: "Low",
          },
          {
            activity: "Actor delivering lines for the first take",
            timestamp: "00:03:240",
            duration: "0m05s050ms",
            importance: "High",
          },
          {
            activity: "Actor listening to feedback and discussing the take",
            timestamp: "00:10:478",
            duration: "0m05s162ms",
            importance: "Medium",
          },
          {
            activity: "Actor awaiting next cue",
            timestamp: "00:15:640",
            duration: "0m03s030ms",
            importance: "Low",
          },
          {
            activity: "Actor delivering lines for the second take",
            timestamp: "00:18:670",
            duration: "0m05s620ms",
            importance: "High",
          },
          {
            activity: "Actor receiving final feedback",
            timestamp: "00:25:032",
            duration: "0m01s140ms",
            importance: "Medium",
          },
        ],
        content_warnings: [],
      },
    },
  },
}

export function VideoDetailsModal({ isOpen, onClose, video }: VideoDetailsModalProps) {
  const data = mockVideoData // In real app, use the passed video data

  const formatFileSize = (bytes: number) => {
    const sizes = ["Bytes", "KB", "MB", "GB"]
    if (bytes === 0) return "0 Bytes"
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {data.file_info.file_name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="h-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[70vh] mt-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      File Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">File Size</span>
                      <span className="text-sm font-medium">{formatFileSize(data.file_info.file_size_bytes)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Duration</span>
                      <span className="text-sm font-medium">{formatDuration(data.video.duration_seconds)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Resolution</span>
                      <span className="text-sm font-medium">
                        {data.video.resolution.width}×{data.video.resolution.height}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Frame Rate</span>
                      <span className="text-sm font-medium">{data.video.frame_rate} fps</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Camera</span>
                      <span className="text-sm font-medium">
                        {data.camera.make} {data.camera.model}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Lens</span>
                      <span className="text-sm font-medium">{data.camera.lens_model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Focal Length</span>
                      <span className="text-sm font-medium">
                        {data.camera.focal_length.value_mm}mm ({data.camera.focal_length.category})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Aperture</span>
                      <span className="text-sm font-medium">f/{data.camera.settings.f_stop}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Content Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">{data.analysis.content_summary}</p>
                    <div className="flex flex-wrap gap-1">
                      {data.analysis.content_tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      People & Speakers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">People in Video</span>
                      <span className="text-sm font-medium">
                        {data.analysis.ai_analysis.content_analysis.entities.people_count}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Speakers Detected</span>
                      <span className="text-sm font-medium">
                        {data.analysis.ai_analysis.audio_analysis.speaker_analysis.speaker_count}
                      </span>
                    </div>
                    {data.analysis.ai_analysis.content_analysis.entities.people_details.map((person, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded">
                        <div className="text-sm font-medium">{person.role}</div>
                        <div className="text-xs text-gray-600">{person.description}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Quality Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Focus Quality</span>
                      <Badge className="bg-green-100 text-green-800">
                        {data.analysis.ai_analysis.visual_analysis.technical_quality.overall_focus_quality}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Stability</span>
                      <Badge className="bg-green-100 text-green-800">
                        {data.analysis.ai_analysis.visual_analysis.technical_quality.stability_assessment}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Audio Clarity</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        {data.analysis.ai_analysis.audio_analysis.audio_quality.clarity}
                      </Badge>
                    </div>
                    {data.video.exposure.warning && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Exposure</span>
                        <Badge variant="destructive">Warning</Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="technical" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Monitor className="w-4 h-4" />
                      Video Specifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Codec</span>
                      <span className="text-sm font-medium">
                        {data.video.codec.name} ({data.video.codec.profile})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Container</span>
                      <span className="text-sm font-medium">{data.video.container}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Bitrate</span>
                      <span className="text-sm font-medium">
                        {Math.round(data.video.codec.bitrate_kbps / 1000)} Mbps
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Aspect Ratio</span>
                      <span className="text-sm font-medium">{data.video.resolution.aspect_ratio}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Color & Exposure
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Color Space</span>
                      <span className="text-sm font-medium">{data.video.color.color_space}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Color Primaries</span>
                      <span className="text-sm font-medium">{data.video.color.color_primaries}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Overexposed</span>
                      <span className="text-sm font-medium">
                        {data.video.exposure.overexposed_percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Underexposed</span>
                      <span className="text-sm font-medium">
                        {data.video.exposure.underexposed_percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">ISO</span>
                      <span className="text-sm font-medium">{data.camera.settings.iso}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Aperture</span>
                      <span className="text-sm font-medium">f/{data.camera.settings.f_stop}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Exposure Mode</span>
                      <span className="text-sm font-medium">
                        {data.camera.settings.exposure_mode.replace("_", " ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">White Balance</span>
                      <span className="text-sm font-medium">
                        {data.camera.settings.white_balance.replace("_", " ")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Scene & Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {data.analysis.ai_analysis.content_analysis.entities.locations.map((location, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded mb-3">
                      <div className="font-medium">{location.name}</div>
                      <div className="text-sm text-gray-600">{location.type}</div>
                      <div className="text-sm text-gray-700 mt-1">{location.description}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Activity Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.analysis.ai_analysis.content_analysis.activity_summary.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded">
                        <div className="text-xs text-gray-500 min-w-16">{activity.timestamp}</div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{activity.activity}</div>
                          <div className="text-xs text-gray-500">{activity.duration}</div>
                        </div>
                        <Badge
                          variant={
                            activity.importance === "High"
                              ? "default"
                              : activity.importance === "Medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {activity.importance}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    Full Transcript
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-3 bg-gray-50 rounded mb-4">
                    <p className="text-sm">{data.analysis.ai_analysis.audio_analysis.transcript.full_text}</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Timestamped Segments</h4>
                    {data.analysis.ai_analysis.audio_analysis.transcript.segments.map((segment, index) => (
                      <div key={index} className="flex gap-3 p-2 border rounded">
                        <div className="text-xs text-gray-500 min-w-20">{segment.timestamp}</div>
                        <div className="text-sm">{segment.text}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
