import { forwardRef } from "react"
import { Users } from "lucide-react"
import { cn } from "@/lib/utils"
import type { HackathonDetail } from "@/types/hackathonDetail"
import type { Team } from "@/types/team"
import HackathonSectionHeading from "./HackathonSectionHeading"

interface Props {
  teamsSection: HackathonDetail["sections"]["teams"]
  teams: Team[]
}

const HackathonTeamsSection = forwardRef<HTMLElement, Props>(({ teamsSection, teams }, ref) => {
  return (
    <section ref={ref} id="teams">
      <HackathonSectionHeading icon={Users}>팀</HackathonSectionHeading>
      <div className="space-y-3">
        {/* 내 팀 (로그인 시) — placeholder */}
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

        {teamsSection.campEnabled && (
          <a
            href={teamsSection.listUrl}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <Users size={14} />
            팀 목록 전체 보기
          </a>
        )}
      </div>
    </section>
  )
})
HackathonTeamsSection.displayName = "HackathonTeamsSection"
export default HackathonTeamsSection
