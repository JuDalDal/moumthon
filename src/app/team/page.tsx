"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TeamCard } from "@/components/feature/team/TeamCard";
import { MyTeamCard, MyTeam } from "@/components/feature/team/MyTeamCard";

type StatusFilter = "all" | "recruiting" | "closed";
type TypeFilter = "all" | "hackathon" | "open";

const INITIAL_MY_TEAM: MyTeam = {
  title: "AI 해커톤 팀",
  description: "AI 기반 서비스를 함께 만들 팀원을 모집합니다.",
  teamType: "hackathon",
  status: "recruiting",
  positions: ["프론트엔드", "백엔드", "AI/ML"],
  members: [
    { id: 1, image: "/p1.png", name: "김철수" },
    { id: 2, image: "/p2.png", name: "이영희" },
    { id: 3, image: "/p3.png", name: "박민준" },
    { id: 4, image: "/p4.png", name: "최지수" },
  ],
  maxMembers: 5,
};

export default function TeamPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [myTeam, setMyTeam] = useState<MyTeam | null>(INITIAL_MY_TEAM);
  const router = useRouter();

  const teams = [
    {
      title: "AI 해커톤 팀",
      description: "AI 기반 서비스를 함께 만들 팀원을 모집합니다.",
      status: "recruiting" as const,
      teamType: "hackathon" as const,
      positions: ["프론트엔드", "백엔드", "AI/ML"],
      members: [
        { id: 1, image: "/p1.png" },
        { id: 2, image: "/p2.png" },
        { id: 3, image: "/p3.png" },
        { id: 4, image: "/p4.png" },
      ],
      maxMembers: 5,
    },
    {
      title: "블록체인 팀",
      description: "Web3 기반 프로젝트를 진행한 팀입니다.",
      status: "closed" as const,
      teamType: "hackathon" as const,
      positions: ["블록체인", "프론트엔드"],
      members: [
        { id: 1, image: "/p1.png" },
        { id: 2, image: "/p2.png" },
      ],
      maxMembers: 7,
    },
    {
      title: "헬스케어 앱 팀",
      description: "사용자 맞춤 운동 루틴을 추천하는 앱을 개발합니다.",
      status: "recruiting" as const,
      teamType: "open" as const,
      positions: ["iOS", "Android", "디자이너"],
      members: [
        { id: 1, image: "/p1.png" },
        { id: 2, image: "/p2.png" },
        { id: 3, image: "/p3.png" },
        { id: 4, image: "/p4.png" },
      ],
      maxMembers: 5,
    },
    {
      title: "환경 캠페인 플랫폼",
      description: "친환경 활동을 기록하고 공유하는 서비스를 만들고 있습니다.",
      status: "recruiting" as const,
      teamType: "open" as const,
      positions: ["기획자", "디자이너"],
      members: [
        { id: 1, image: "/p1.png" },
        { id: 2, image: "/p2.png" },
        { id: 3, image: "/p3.png" },
      ],
      maxMembers: 4,
    },
    {
      title: "스터디 매칭 서비스",
      description: "개발자 스터디를 쉽게 찾고 참여할 수 있는 플랫폼입니다.",
      status: "closed" as const,
      teamType: "open" as const,
      positions: ["풀스택"],
      members: [],
      maxMembers: 8,
    },
  ];

  const filteredTeams = teams.filter((team) => {
    const statusMatch = statusFilter === "all" || team.status === statusFilter;
    const typeMatch = typeFilter === "all" || team.teamType === typeFilter;
    return statusMatch && typeMatch;
  });

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
            onClick={() => router.push("/team/new")}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-green-400 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:scale-105"
          >
            + 팀 만들기
          </button>
        </div>

        {/* My Team 섹션 */}
        {myTeam && (
          <div className="mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">My Team</p>
            <MyTeamCard
              team={myTeam}
              onUpdate={(updated) => setMyTeam((prev) => prev ? { ...prev, ...updated } : prev)}
              onDelete={() => setMyTeam(null)}
            />
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

        {/* 카드 리스트 */}
        {filteredTeams.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTeams.map((team, idx) => (
              <TeamCard
                key={idx}
                title={team.title}
                description={team.description}
                status={team.status}
                teamType={team.teamType}
                positions={team.positions}
                members={team.members}
                maxMembers={team.maxMembers}
              />
            ))}
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
