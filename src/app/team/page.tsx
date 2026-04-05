"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TeamCard } from "@/components/feature/team/TeamCard";
import { MyTeamCard, MyTeam } from "@/components/feature/team/MyTeamCard";
import teamsData from "@/assets/data/public_teams.json";
import teamMembersData from "@/assets/data/public_team_members.json";
import sessionData from "@/assets/data/my.json";
import hackathonsData from "@/assets/data/public_hackathons.json";

type StatusFilter = "all" | "recruiting" | "closed";
type TypeFilter = "all" | "hackathon" | "open";

type RawTeam = {
  teamCode: string;
  hackathonSlug: string;
  name: string;
  isOpen: boolean;
  memberCount: number;
  lookingFor: string[];
  intro: string;
  contact: { type: string; url: string };
  createdAt: string;
};

type RawMember = {
  userId: string;
  displayName: string;
  avatarUrl: string;
  role: string;
  joinedAt: string;
};

type RawTeamMembers = {
  teamCode: string;
  hackathonSlug: string;
  members: RawMember[];
};

type RawHackathon = {
  slug: string;
  title: string;
  status: string;
};

export default function TeamPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 해커톤 슬러그 읽기
  const hackathonFilter = searchParams.get("hackathon");

  const session = (sessionData as any[])[0];
  const myTeamCodes = session?.myTeams?.map((t: any) => t.teamCode) ?? [];

  // 진행 중인 해커톤만 필터 옵션으로 표시
  const activeHackathons = (hackathonsData as RawHackathon[]).filter(
    (h) => h.status === "ongoing" || h.status === "upcoming"
  );

  const getMembersForTeam = (teamCode: string) => {
    const found = (teamMembersData as RawTeamMembers[]).find(
      (tm) => tm.teamCode === teamCode
    );
    return found?.members ?? [];
  };

  const myTeams: MyTeam[] = session?.myTeams?.map((myTeam: any) => {
    const raw = (teamsData as RawTeam[]).find(
      (t) => t.teamCode === myTeam.teamCode
    );
    const members = getMembersForTeam(myTeam.teamCode);
    return {
      teamCode: myTeam.teamCode,
      title: raw?.name ?? myTeam.teamName,
      description: raw?.intro ?? "",
      teamType: "hackathon" as const,
      status: raw?.isOpen ? ("recruiting" as const) : ("closed" as const),
      positions: raw?.lookingFor ?? [],
      members: members.map((m) => ({
        id: m.userId,
        image: m.avatarUrl,
        name: m.displayName,
      })),
      maxMembers: 5,
      contactUrl: raw?.contact?.url ?? "",
    };
  }) ?? [];

  const otherTeams = (teamsData as RawTeam[]).filter(
    (t) => !myTeamCodes.includes(t.teamCode)
  );

  const filteredTeams = useMemo(() => {
    return otherTeams.filter((team) => {
      const statusMatch =
        statusFilter === "all" ||
        (statusFilter === "recruiting" && team.isOpen) ||
        (statusFilter === "closed" && !team.isOpen);
      const typeMatch = typeFilter === "all" || typeFilter === "hackathon";
      const hackathonMatch =
        !hackathonFilter || team.hackathonSlug === hackathonFilter;
      return statusMatch && typeMatch && hackathonMatch;
    });
  }, [otherTeams, statusFilter, typeFilter, hackathonFilter]);

  // 해커톤 필터 변경 — URL 쿼리 업데이트
  const handleHackathonFilter = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("hackathon", slug);
    } else {
      params.delete("hackathon");
    }
    router.push(`/camp?${params.toString()}`);
  };

  const selectedHackathon = activeHackathons.find(
    (h) => h.slug === hackathonFilter
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-green-50 px-4 py-16">
      <div className="mx-auto w-full max-w-6xl">

        {/* 헤더 */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-400">팀 / 탐색</p>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">팀 탐색</h1>
            <p className="mt-2 max-w-xl text-sm text-gray-500">
              다양한 팀을 탐색하고, 원하는 팀에 참여하거나 직접 팀을 만들어보세요.
            </p>
          </div>
          <button
            onClick={() => router.push("/camp/new")}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-green-400 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:scale-105"
          >
            + 팀 만들기
          </button>
        </div>

        {/* My Team 섹션 */}
        {myTeams.length > 0 && (
          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
              My Team
            </p>
            <div className="flex flex-col gap-4">
              {myTeams.map((team) => (
                <MyTeamCard
                  key={team.teamCode}
                  team={team}
                  onUpdate={(updated) => console.log("update", updated)}
                  onDelete={() => console.log("delete", team.teamCode)}
                />
              ))}
            </div>
          </div>
        )}



        {/* 모집 여부 필터 */}
        <div className="mb-3 flex gap-2 text-sm">
          {(["all", "recruiting", "closed"] as const).map((f) => (
            <button
              key={f}
              className={`rounded-full px-4 py-1 font-medium transition-colors ${
                statusFilter === f
                  ? "bg-green-100 text-green-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => setStatusFilter(f)}
            >
              {f === "all" ? "전체" : f === "recruiting" ? "모집 중" : "마감"}
            </button>
          ))}
        </div>

        {/* 팀 유형 필터 */}
        <div className="mb-8 flex gap-2 text-sm">
          {(["all", "hackathon", "open"] as const).map((t) => (
            <button
              key={t}
              className={`rounded-full px-4 py-1 font-medium transition-colors ${
                typeFilter === t
                  ? t === "hackathon"
                    ? "bg-orange-100 text-orange-600"
                    : t === "open"
                    ? "bg-amber-100 text-amber-600"
                    : "bg-gray-200 text-gray-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
              onClick={() => setTypeFilter(t)}
            >
              {t === "all" ? "전체 유형" : t === "hackathon" ? "🏆 해커톤팀" : "🔓 오픈팀"}
            </button>
          ))}
        </div>

               {/* 해커톤 필터 */}
{activeHackathons.length > 0 && (
  <div className="mb-6 flex flex-col gap-2">
    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
      해커톤
    </p>

    <div className="relative w-full max-w-xs">
      <select
        value={hackathonFilter ?? ""}
        onChange={(e) =>
          handleHackathonFilter(e.target.value || null)
        }
        className="w-full appearance-none rounded-xl border border-gray-200 bg-white/80 backdrop-blur px-4 py-2 pr-10 text-sm text-gray-700 shadow-sm transition focus:border-blue-400 focus:outline-none hover:border-blue-300"
      >
        <option value="">전체</option>
        {activeHackathons.map((h) => (
          <option key={h.slug} value={h.slug}>
            {h.title}
          </option>
        ))}
      </select>

      {/* 드롭다운 화살표 */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
        ▼
      </div>
    </div>
  </div>
)}

        {/* 선택된 해커톤 표시 */}
        {selectedHackathon && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5">
            <span className="text-xs font-semibold text-blue-600">🏆 {selectedHackathon.title}</span>
            <span className="text-xs text-blue-400">해커톤의 팀 목록</span>
            <button
              onClick={() => handleHackathonFilter(null)}
              className="ml-auto text-xs text-blue-400 hover:text-blue-600 transition-colors"
            >
              ✕ 필터 해제
            </button>
          </div>
        )}

        {/* 카드 리스트 */}
        {filteredTeams.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTeams.map((team) => {
              const members = getMembersForTeam(team.teamCode);
              return (
                <TeamCard
                  key={team.teamCode}
                  teamCode={team.teamCode}
                  title={team.name}
                  description={team.intro}
                  status={team.isOpen ? "recruiting" : "closed"}
                  teamType="hackathon"
                  positions={team.lookingFor}
                  members={members.map((m) => ({
                    id: Number(m.userId.replace("U-", "")),
                    image: m.avatarUrl,
                    name: m.displayName,
                  }))}
                  maxMembers={5}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-sm">조건에 맞는 팀이 없어요.</p>
          </div>
        )}
      </div>
    </main>
  );
}
