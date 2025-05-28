"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RefreshCw, AlertCircle, Clock } from "lucide-react"

interface SmartCollectionRefreshProps {
  collections: any[]
  onRefresh: (collectionId: string) => void
}

export function SmartCollectionRefresh({ collections, onRefresh }: SmartCollectionRefreshProps) {
  const [refreshingCollections, setRefreshingCollections] = useState<Set<string>>(new Set())
  const [refreshProgress, setRefreshProgress] = useState<Record<string, number>>({})

  const handleRefresh = async (collectionId: string) => {
    setRefreshingCollections((prev) => new Set(prev).add(collectionId))
    setRefreshProgress((prev) => ({ ...prev, [collectionId]: 0 }))

    // Simulate refresh progress
    const interval = setInterval(() => {
      setRefreshProgress((prev) => {
        const current = prev[collectionId] || 0
        if (current >= 100) {
          clearInterval(interval)
          setRefreshingCollections((prev) => {
            const newSet = new Set(prev)
            newSet.delete(collectionId)
            return newSet
          })
          onRefresh(collectionId)
          return prev
        }
        return { ...prev, [collectionId]: current + 10 }
      })
    }, 200)
  }

  const getRefreshStatus = (collection: any) => {
    if (refreshingCollections.has(collection.id)) {
      return "refreshing"
    }
    if (collection.status === "error") {
      return "error"
    }
    return "idle"
  }

  return (
    <div className="space-y-2">
      {collections
        .filter((c) => c.auto)
        .map((collection) => {
          const status = getRefreshStatus(collection)
          const progress = refreshProgress[collection.id] || 0

          return (
            <Card key={collection.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{collection.icon}</span>
                    <span className="text-sm font-medium">{collection.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {collection.count}
                    </Badge>
                    {status === "error" && <AlertCircle className="w-4 h-4 text-red-500" />}
                    {status === "refreshing" && <Clock className="w-4 h-4 text-blue-500" />}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRefresh(collection.id)}
                    disabled={status === "refreshing"}
                  >
                    <RefreshCw className={`w-4 h-4 ${status === "refreshing" ? "animate-spin" : ""}`} />
                  </Button>
                </div>

                {status === "refreshing" && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Updating collection...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-1" />
                  </div>
                )}

                {status === "error" && (
                  <div className="mt-2 text-xs text-red-600">
                    Collection criteria may be invalid. Click refresh to fix.
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
    </div>
  )
}
