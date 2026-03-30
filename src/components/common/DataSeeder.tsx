"use client"

import { useEffect } from "react"
import { seedAll } from "@/lib/storage/seed"

export function DataSeeder() {
  useEffect(() => {
    seedAll()
  }, [])

  return null
}
