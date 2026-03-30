"use client"

import {
  Avatar as AvatarRoot,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
} from "@/components/ui/avatar"

type AvatarProps = {
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "default" | "lg"
  className?: string
}

function Avatar({ src, alt, fallback, size = "default", className }: AvatarProps) {
  return (
    <AvatarRoot size={size} className={className}>
      {src && <AvatarImage src={src} alt={alt} />}
      <AvatarFallback>{fallback?.slice(0, 2).toUpperCase() ?? "?"}</AvatarFallback>
    </AvatarRoot>
  )
}

export { Avatar, AvatarGroup, AvatarGroupCount, AvatarBadge }
