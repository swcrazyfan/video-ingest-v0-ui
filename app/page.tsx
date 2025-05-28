"use client"

import { useEffect } from "react"

export default function HomePage() {
  useEffect(() => {
    // Redirect to login page
    window.location.href = "/login"
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Video Ingest Tool</h1>
        <p>Redirecting to login...</p>
      </div>
    </div>
  )
}
