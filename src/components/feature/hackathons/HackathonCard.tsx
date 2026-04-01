"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { BookOpen, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { STATUS_LABEL, STATUS_ICON, STATUS_BADGE_CLASS } from "@/libs/hackathonStatus"
import { formatDate } from "@/libs/formatDate"
import type { Hackathon } from "@/types/hackathon"

function CardExternalLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center gap-1.5 rounded-md bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1.5 text-sm text-white/80 hover:bg-white/25 hover:text-white transition-colors flex-1 justify-center"
    >
      {children}
    </a>
  )
}

interface HackathonCardProps {
  hackathon: Hackathon
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const router = useRouter()
  const { period, links } = hackathon
  const StatusIcon = STATUS_ICON[hackathon.status]

  return (
    <div
      className="group relative aspect-[3/4] overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] cursor-pointer"
      onClick={() => router.push(links.detail)}
    >
      <Image
        src={hackathon.thumbnailUrl}
        alt={hackathon.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-black/40 to-black/10" />

      {/* Top row: status badge (left) + participant count (right) */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-lg border px-3 py-1 text-sm font-semibold backdrop-blur-sm",
            STATUS_BADGE_CLASS[hackathon.status],
          )}
        >
          <StatusIcon size={11} />
          {STATUS_LABEL[hackathon.status]}
        </span>
        <span className="inline-flex items-center rounded-lg bg-primary px-3 py-1 text-sm font-bold text-white shadow-md">
          - 명 참여중!
        </span>
      </div>

      {/* Content — pinned to bottom */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 gap-2">
        <h3 className="text-lg font-bold leading-snug line-clamp-2 text-white drop-shadow">
          {hackathon.title}
        </h3>

        <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-7">
          {hackathon.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-primary/70 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="border-t border-white/30" />

        <div className="text-xs text-white/70">
          {formatDate(period.submissionDeadlineAt, period.timezone)}
          <span className="mx-1.5 opacity-50">~</span>
          {formatDate(period.endAt, period.timezone)}
        </div>

        <div className="flex gap-3">
          <CardExternalLink href={links.rules}>
            <BookOpen size={13} />
            규칙
          </CardExternalLink>
          <CardExternalLink href={links.faq}>
            <HelpCircle size={13} />
            FAQ
          </CardExternalLink>
        </div>
      </div>
    </div>
  )
}
