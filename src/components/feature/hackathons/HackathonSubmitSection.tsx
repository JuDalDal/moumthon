"use client"

import { forwardRef } from "react"
import { useRouter } from "next/navigation"
import { Upload } from "lucide-react"
import { formatDate } from "@/lib/formatDate"
import type { HackathonDetail } from "@/types/hackathonDetail"
import HackathonSectionHeading from "./HackathonSectionHeading"

interface Props {
  submit: HackathonDetail["sections"]["submit"]
  milestones: HackathonDetail["sections"]["schedule"]["milestones"]
  timezone: string
  slug: string
}

const HackathonSubmitSection = forwardRef<HTMLElement, Props>(({ submit, milestones, timezone, slug }, ref) => {
  const router = useRouter()
  return (
    <section ref={ref} id="submit">
      <HackathonSectionHeading icon={Upload}>제출</HackathonSectionHeading>
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {submit.allowedArtifactTypes.map((type) => (
            <span
              key={type}
              className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground"
            >
              {type}
            </span>
          ))}
        </div>

        <div className="rounded-lg border border-border bg-card px-5 py-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">제출 가이드</p>
          <ul className="space-y-2">
            {submit.guide.map((g, i) => (
              <li key={i} className="flex gap-2 text-sm text-foreground">
                <span className="text-primary-400 shrink-0 mt-0.5">{i + 1}.</span>
                {g}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">제출 마일스톤</p>
          {milestones.map((milestone, i) => (
            <button
              key={milestone.at}
              onClick={() => router.push(`/hackathons/${slug}/submit/${i}`)}
              className="w-full flex items-center justify-between rounded-lg border border-border bg-card px-5 py-3.5 hover:border-primary-200 hover:bg-primary-50/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-primary-400 w-5 shrink-0">{i + 1}</span>
                <span className="text-sm font-medium text-foreground">{milestone.name}</span>
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-primary-600 transition-colors">
                {formatDate(milestone.at, timezone)} →
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
})
HackathonSubmitSection.displayName = "HackathonSubmitSection"
export default HackathonSubmitSection
