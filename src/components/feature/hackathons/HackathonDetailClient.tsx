"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { BookOpen, HelpCircle, Users, FileText, Clock, Trophy, Upload, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/formatDate"
import type { HackathonDetail, Leaderboard } from "@/types/hackathonDetail"
import type { Team } from "@/types/team"
import { useHackathonDetailStore } from "@/stores/hackathonDetailStore"

interface Props {
  detail: HackathonDetail
  slug: string
  initialSection?: string
  teams?: Team[]
  leaderboard?: Leaderboard
}

const SECTION_IDS = ["overview", "eval", "schedule", "prize", "teams", "submit"] as const
type SectionId = (typeof SECTION_IDS)[number]

const CONTENT_ID = "hackathon-content"

function SectionHeading({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-border">
      <div className="p-1.5 rounded-md bg-primary-50">
        <Icon size={16} className="text-primary-600" />
      </div>
      <h2 className="text-lg font-bold text-foreground">{children}</h2>
    </div>
  )
}

export default function HackathonDetailClient({ detail, slug, initialSection, teams = [], leaderboard }: Props) {
  const router = useRouter()
  const { activeSection, setActiveSection, scrollTarget, clearScrollTarget } = useHackathonDetailStore()
  const hasPrize = !!detail.sections.prize
  const scrollLockRef = useRef(false)
  const scrollLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const sectionRefs: Record<SectionId, React.RefObject<HTMLElement | null>> = {
    overview: useRef<HTMLElement>(null),
    eval: useRef<HTMLElement>(null),
    schedule: useRef<HTMLElement>(null),
    prize: useRef<HTMLElement>(null),
    teams: useRef<HTMLElement>(null),
    submit: useRef<HTMLElement>(null),
  }

  const getContainer = () => document.getElementById(CONTENT_ID)

  const scrollTo = (sectionId: SectionId) => {
    const container = getContainer()
    const el = sectionRefs[sectionId].current
    if (!container || !el) return
    const containerTop = container.getBoundingClientRect().top
    const elTop = el.getBoundingClientRect().top
    container.scrollTo({ top: container.scrollTop + elTop - containerTop - 32, behavior: "smooth" })
  }

  // Determine initial section on mount (hash takes priority, then prop, then "overview")
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash === "leaderboard") {
      setActiveSection("leaderboard")
      return
    }
    const fromHash = hash && SECTION_IDS.includes(hash as SectionId)
    const section = (
      fromHash ? hash
      : initialSection && SECTION_IDS.includes(initialSection as SectionId) ? initialSection
      : "overview"
    ) as SectionId
    setActiveSection(section)
    window.history.replaceState(null, "", `/hackathons/${slug}#${section}`)
    if (section !== "overview") scrollTo(section)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // React to nav scroll requests from store
  useEffect(() => {
    if (!scrollTarget) return
    if (SECTION_IDS.includes(scrollTarget as SectionId)) {
      scrollLockRef.current = true
      if (scrollLockTimerRef.current) clearTimeout(scrollLockTimerRef.current)
      scrollLockTimerRef.current = setTimeout(() => { scrollLockRef.current = false }, 800)
      scrollTo(scrollTarget as SectionId)
    }
    clearScrollTarget()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollTarget])

  // Detect active section on container scroll
  useEffect(() => {
    const container = getContainer()
    if (!container) return

    const sections = (hasPrize ? SECTION_IDS : SECTION_IDS.filter((s) => s !== "prize")) as SectionId[]

    const handleScroll = () => {
      if (useHackathonDetailStore.getState().activeSection === "leaderboard") return
      if (scrollLockRef.current) return
      const containerRect = container.getBoundingClientRect()
      let maxVisible = 0
      let activeId: SectionId = "overview"
      for (const id of sections) {
        const el = sectionRefs[id].current
        if (!el) continue
        const elRect = el.getBoundingClientRect()
        const visibleHeight = Math.max(
          0,
          Math.min(elRect.bottom, containerRect.bottom) - Math.max(elRect.top, containerRect.top),
        )
        if (visibleHeight > maxVisible) {
          maxVisible = visibleHeight
          activeId = id
        }
      }
      setActiveSection(activeId)
      window.history.replaceState(null, "", `/hackathons/${slug}#${activeId}`)
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, hasPrize])

  const { sections } = detail

  return (
    <div>
      {/* Page header */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold leading-snug">{detail.title}</h1>
        <div className="flex gap-3 mt-3">
          <a
            href={sections.info.links.rules}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <BookOpen size={14} />
            규칙
          </a>
          <a
            href={sections.info.links.faq}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <HelpCircle size={14} />
            FAQ
          </a>
        </div>
      </div>

      {/* 리더보드 뷰 전환 */}
      {activeSection === "leaderboard" ? (
        <div>
          {leaderboard && leaderboard.entries.length > 0 ? (
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3.5 bg-muted/30 border-b border-border">
                <div className="flex items-center gap-2">
                  <Trophy size={14} className="text-primary-600" />
                  <span className="text-sm font-semibold">Public 리더보드</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate(leaderboard.updatedAt, sections.schedule.timezone)} 기준
                </span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/10 text-xs text-muted-foreground uppercase tracking-wide">
                    <th className="text-center py-3 pl-5 pr-3 w-12">순위</th>
                    <th className="text-left py-3 px-3">팀</th>
                    <th className="text-right py-3 pl-3 pr-5">점수</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.entries.map((entry, i) => (
                    <tr
                      key={i}
                      className={cn(
                        "border-b border-border last:border-0",
                        entry.rank <= 3 ? "bg-primary-50/50" : "hover:bg-muted/20",
                      )}
                    >
                      <td className="py-4 pl-5 pr-3 text-center">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold",
                            entry.rank === 1 ? "bg-yellow-400/20 text-yellow-600"
                              : entry.rank === 2 ? "bg-zinc-200 text-zinc-600"
                              : entry.rank === 3 ? "bg-orange-200/60 text-orange-600"
                              : "text-muted-foreground font-normal",
                          )}
                        >
                          {entry.rank}
                        </span>
                      </td>
                      <td className="py-4 px-3 font-medium">{entry.teamName}</td>
                      <td className="py-4 pl-3 pr-5 text-right font-mono font-semibold text-primary-600">
                        {entry.score < 1 ? entry.score.toFixed(4) : entry.score.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-2">아직 제출된 결과가 없습니다.</p>
          )}
          {sections.leaderboard.note && (
            <p className="mt-3 text-xs text-muted-foreground px-1">* {sections.leaderboard.note}</p>
          )}
        </div>
      ) : (
        <div className="space-y-16 pb-48">
          {/* 개요 */}
          <section ref={sectionRefs.overview} id="overview">
            <SectionHeading icon={FileText}>개요</SectionHeading>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-foreground">{sections.overview.summary}</p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3">
                  <Users size={15} className="text-primary-600 shrink-0" />
                  <span className="text-sm text-muted-foreground">팀 구성</span>
                  <span className="text-sm font-medium">
                    {sections.overview.teamPolicy.allowSolo ? "개인 참가 가능" : "팀 참가만 가능"}
                    {" · "}최대 {sections.overview.teamPolicy.maxTeamSize}명
                  </span>
                </div>
              </div>

              {sections.info.notice.length > 0 && (
                <div className="rounded-lg border border-border bg-muted/30 px-5 py-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">공지사항</p>
                  <ul className="space-y-2">
                    {sections.info.notice.map((n, i) => (
                      <li key={i} className="flex gap-2 text-sm text-foreground">
                        <span className="text-primary-400 shrink-0 mt-0.5">•</span>
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* 평가 */}
          <section ref={sectionRefs.eval} id="eval">
            <SectionHeading icon={CheckCircle2}>평가</SectionHeading>
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-card p-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">평가 지표</p>
                <p className="text-lg font-bold text-primary-600">{sections.eval.metricName}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{sections.eval.description}</p>
              </div>

              {sections.eval.scoreDisplay && (
                <div className="rounded-lg border border-border bg-card p-5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">{sections.eval.scoreDisplay.label}</p>
                  <div className="space-y-2">
                    {sections.eval.scoreDisplay.breakdown.map((b) => (
                      <div key={b.key} className="flex items-center gap-3">
                        <span className="text-sm text-foreground w-16 shrink-0">{b.label}</span>
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-primary-400" style={{ width: `${b.weightPercent}%` }} />
                        </div>
                        <span className="text-sm font-semibold text-primary-600 w-10 text-right shrink-0">{b.weightPercent}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {sections.eval.limits && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border bg-card px-4 py-3">
                    <p className="text-xs text-muted-foreground mb-1">최대 실행 시간</p>
                    <p className="text-base font-semibold">
                      {sections.eval.limits.maxRuntimeSec >= 60
                        ? `${Math.round(sections.eval.limits.maxRuntimeSec / 60)}분`
                        : `${sections.eval.limits.maxRuntimeSec}초`}
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-card px-4 py-3">
                    <p className="text-xs text-muted-foreground mb-1">일일 최대 제출</p>
                    <p className="text-base font-semibold">{sections.eval.limits.maxSubmissionsPerDay}회</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 일정 */}
          <section ref={sectionRefs.schedule} id="schedule">
            <SectionHeading icon={Clock}>일정</SectionHeading>
            <div className="space-y-0">
              {sections.schedule.milestones.map((milestone, i) => {
                const isLast = i === sections.schedule.milestones.length - 1
                return (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-primary-400 ring-2 ring-background shrink-0" />
                      {!isLast && <div className="w-px flex-1 bg-border mt-1" />}
                    </div>
                    <div className={cn("flex-1 min-w-0", isLast ? "pb-0" : "pb-5")}>
                      <p className="text-sm font-medium text-foreground">{milestone.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDate(milestone.at, sections.schedule.timezone)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* 상금 */}
          {hasPrize && sections.prize && (
            <section ref={sectionRefs.prize} id="prize">
              <SectionHeading icon={Trophy}>상금</SectionHeading>
              <div className="flex items-end gap-3">
                {sections.prize.items.slice(0, 3).map((item, i) => {
                  const sizes = ["h-56", "h-48", "h-40", "h-32"]
                  const iconSizes = ["text-6xl", "text-5xl", "text-4xl", "text-3xl"]
                  const placeSizes = ["text-base", "text-sm", "text-xs", "text-xs"]
                  const amountSizes = ["text-2xl", "text-xl", "text-base", "text-sm"]
                  const styles = [
                    "bg-gradient-to-b from-yellow-400/20 to-yellow-400/5 border-yellow-300 text-yellow-700",
                    "bg-gradient-to-b from-zinc-200/40 to-zinc-200/10 border-zinc-300 text-zinc-600",
                    "bg-gradient-to-b from-orange-300/20 to-orange-300/5 border-orange-200 text-orange-600",
                  ]
                  const placeIcons = ["🥇", "🥈", "🥉"]
                  return (
                    <div
                      key={i}
                      className={cn(
                        "flex-1 rounded-xl border flex flex-col items-start justify-center gap-2 px-5 transition-transform hover:-translate-y-1",
                        sizes[i] ?? "h-20",
                        styles[i] ?? "bg-muted/30 border-border text-muted-foreground",
                      )}
                    >
                      <span className={iconSizes[i] ?? "text-base"}>{placeIcons[i] ?? "🏅"}</span>
                      <span className={cn("font-semibold opacity-70", placeSizes[i] ?? "text-xs")}>{item.place}</span>
                      <span className={cn("font-bold", amountSizes[i] ?? "text-xs")}>
                        {(item.amountKRW / 10000).toLocaleString("ko-KR")}만원
                      </span>
                    </div>
                  )
                })}
              </div>

              {sections.prize.items.length > 3 && (
                <div className="space-y-2 mt-3">
                  {sections.prize.items.slice(3).map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-border bg-card px-5 py-3.5"
                    >
                      <span className="text-sm font-semibold text-foreground">{item.place}</span>
                      <span className="text-sm font-bold text-foreground">
                        {(item.amountKRW / 10000).toLocaleString("ko-KR")}만원
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* 팀 */}
          <section ref={sectionRefs.teams} id="teams">
            <SectionHeading icon={Users}>팀</SectionHeading>
            <div className="space-y-3">
              {/* 내 팀 (로그인 시) — 뷰 placeholder */}
              <div className="relative rounded-xl overflow-hidden border border-primary-200">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/5" />
                <div className="absolute -bottom-8 -left-4 w-36 h-36 rounded-full bg-white/5" />
                <div className="relative px-5 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-primary-200 uppercase tracking-widest">내 팀</span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium rounded-full bg-white/15 text-white px-2.5 py-1 backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                      참여 중
                    </span>
                  </div>
                  <p className="text-xl font-bold text-white mb-1">404found</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {["Frontend", "Designer"].map((role) => (
                      <span key={role} className="text-xs rounded-md bg-white/15 text-white/80 px-2 py-0.5 backdrop-blur-sm">
                        {role}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary-200">3명 참여 중</span>
                    <button className="text-xs font-medium text-white/80 hover:text-white transition-colors">
                      팀 상세 보기 →
                    </button>
                  </div>
                </div>
              </div>

              {/* 팀 목록 */}
              {teams.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {teams.map((team) => (
                    <div key={team.teamCode} className="rounded-lg border border-border bg-card p-4 flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold leading-snug">{team.name}</span>
                        <span className={cn(
                          "shrink-0 text-xs px-2 py-0.5 rounded-full font-medium",
                          team.isOpen ? "bg-primary-50 text-primary-600" : "bg-muted text-muted-foreground",
                        )}>
                          {team.isOpen ? "모집 중" : "모집 완료"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed flex-1">{team.intro}</p>
                      {team.lookingFor.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {team.lookingFor.map((role) => (
                            <span key={role} className="text-xs border border-border rounded-md px-2 py-0.5 text-muted-foreground">
                              {role}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-1 border-t border-border">
                        <span className="text-xs text-muted-foreground">{team.memberCount}명</span>
                        {team.isOpen && (
                          <a
                            href={team.contact.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs rounded-lg border border-border px-3 py-1 hover:bg-muted transition-colors"
                          >
                            합류하기
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-2">아직 등록된 팀이 없습니다.</p>
              )}

              {sections.teams.campEnabled && (
                <a
                  href={sections.teams.listUrl}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Users size={14} />
                  팀 목록 전체 보기
                </a>
              )}
            </div>
          </section>

          {/* 제출 */}
          <section ref={sectionRefs.submit} id="submit">
            <SectionHeading icon={Upload}>제출</SectionHeading>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {sections.submit.allowedArtifactTypes.map((type) => (
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
                  {sections.submit.guide.map((g, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground">
                      <span className="text-primary-400 shrink-0 mt-0.5">{i + 1}.</span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">제출 마일스톤</p>
                {sections.schedule.milestones.map((milestone, i) => (
                  <button
                    key={i}
                    onClick={() => router.push(`/hackathons/${slug}/submit/${i}`)}
                    className="w-full flex items-center justify-between rounded-lg border border-border bg-card px-5 py-3.5 hover:border-primary-200 hover:bg-primary-50/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-primary-400 w-5 shrink-0">{i + 1}</span>
                      <span className="text-sm font-medium text-foreground">{milestone.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-primary-600 transition-colors">
                      {formatDate(milestone.at, sections.schedule.timezone)} →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
