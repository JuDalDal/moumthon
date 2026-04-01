"use client"

import type React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Clock, Zap, CheckCircle, BookOpen, HelpCircle } from "lucide-react"

type Hackathon = {
  slug: string
  title: string
  status: "upcoming" | "ongoing" | "ended"
  tags: string[]
  thumbnailUrl: string
  period: { timezone: string; submissionDeadlineAt: string; endAt: string }
  links: { detail: string; rules: string; faq: string }
}

const STATUS_LABEL: Record<Hackathon["status"], string> = {
  upcoming: "예정",
  ongoing:  "진행 중",
  ended:    "종료",
}

const STATUS_ICON: Record<Hackathon["status"], React.ReactNode> = {
  upcoming: <Clock size={11} />,
  ongoing:  <Zap size={11} />,
  ended:    <CheckCircle size={11} />,
}

const STATUS_BADGE_CLASS: Record<Hackathon["status"], string> = {
  upcoming: "bg-primary text-white border-transparent",
  ongoing:  "bg-emerald-500 text-white border-transparent",
  ended:    "bg-zinc-500 text-white border-transparent",
}

function formatDate(iso: string, timezone: string) {
  return new Date(iso).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: timezone,
  })
}

interface HackathonCardProps {
  hackathon: Hackathon
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const router = useRouter()
  const { period, links } = hackathon

  return (
    <div
      className="group relative aspect-[3/4] overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] cursor-pointer"
      onClick={() => router.push(links.detail)}
    >
      {/* Background image */}
      <Image
        src={hackathon.thumbnailUrl}
        alt={hackathon.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        unoptimized
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-black/40 to-black/10" />

      {/* Top row: status badge (left) + participant count (right) */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <span
          className={[
            "inline-flex items-center gap-1 rounded-lg border px-3 py-1 text-sm font-semibold backdrop-blur-sm",
            STATUS_BADGE_CLASS[hackathon.status],
          ].join(" ")}
        >
          {STATUS_ICON[hackathon.status]}
          {STATUS_LABEL[hackathon.status]}
        </span>
        <span className="inline-flex items-center rounded-lg bg-primary px-3 py-1 text-sm font-bold text-white shadow-md">
          - 명 참여중!
        </span>
      </div>

      {/* Content — pinned to bottom */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 gap-2">
        {/* Title */}
        <h3 className="text-lg font-bold leading-snug line-clamp-2 text-white drop-shadow">
          {hackathon.title}
        </h3>

        {/* Tags */}
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

        {/* Date */}
        <div className="text-xs text-white/70">
          {formatDate(period.submissionDeadlineAt, period.timezone)}
          <span className="mx-1.5 opacity-50">~</span>
          {formatDate(period.endAt, period.timezone)}
        </div>

        {/* Rules / FAQ — stopPropagation to prevent card navigation */}
        <div className="flex gap-3">
          <a
            href={links.rules}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 rounded-md bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1.5 text-sm text-white/80 hover:bg-white/25 hover:text-white transition-colors flex-1 justify-center"
          >
            <BookOpen size={13} />
            규칙
          </a>
          <a
            href={links.faq}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 rounded-md bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1.5 text-sm text-white/80 hover:bg-white/25 hover:text-white transition-colors flex-1 justify-center"
          >
            <HelpCircle size={13} />
            FAQ
          </a>
        </div>
      </div>
    </div>
  )
}
