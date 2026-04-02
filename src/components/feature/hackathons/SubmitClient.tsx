"use client"

import { Upload } from "lucide-react"
import { formatDate } from "@/lib/formatDate"
import type { HackathonDetail } from "@/types/hackathonDetail"

interface Props {
  detail: HackathonDetail
  slug: string
  milestone: string
}

export default function SubmitClient({ detail, milestone }: Props) {
  const milestones = detail.sections.schedule.milestones
  const index = Number(milestone)
  const currentMilestone = milestones[index]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{detail.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {currentMilestone?.name ?? "제출"}
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-primary-50">
              <Upload size={16} className="text-primary-600" />
            </div>
            <h2 className="text-base font-semibold">{currentMilestone?.name ?? "제출"}</h2>
          </div>
          {currentMilestone && (
            <span className="text-xs text-muted-foreground">
              마감: {formatDate(currentMilestone.at, detail.sections.schedule.timezone)}
            </span>
          )}
        </div>

        {/* Guide */}
        {detail.sections.submit.guide.length > 0 && (
          <div className="rounded-lg bg-muted/30 border border-border px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">제출 가이드</p>
            <ul className="space-y-1.5">
              {detail.sections.submit.guide.map((g, i) => (
                <li key={i} className="flex gap-2 text-sm text-foreground">
                  <span className="text-primary-400 shrink-0 mt-0.5">{i + 1}.</span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Allowed types */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">허용 형식</p>
          <div className="flex flex-wrap gap-2">
            {detail.sections.submit.allowedArtifactTypes.map((type) => (
              <span
                key={type}
                className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Placeholder submit form */}
        <div className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-border bg-muted/20 px-5 py-10 text-center">
            <Upload size={24} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">제출 폼이 여기에 표시됩니다.</p>
          </div>

          <button
            disabled
            className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground opacity-50 cursor-not-allowed"
          >
            제출하기
          </button>
        </div>
      </div>
    </div>
  )
}
