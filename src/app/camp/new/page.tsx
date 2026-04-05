"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const HACKATHONS = [
  { slug: "aimers-8-model-lite", title: "Aimers 8기 : 모델 경량화 온라인 해커톤" },
  { slug: "monthly-vibe-coding-2026-02", title: "월간 해커톤 : 바이브 코딩 개선 AI 아이디어 공모전 (2026.02)" },
  { slug: "daker-handover-2026-03", title: "긴급 인수인계 해커톤: 명세서만 보고 구현하라" },
];

function CampNewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedHackathon = searchParams.get("hackathon") ?? "";

  const [teamType, setTeamType] = useState<"hackathon" | "open">(
    preselectedHackathon ? "hackathon" : "hackathon"
  );
  const [hackathonSlug, setHackathonSlug] = useState(preselectedHackathon);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [positionInput, setPositionInput] = useState("");
  const [positions, setPositions] = useState<string[]>([]);
  const [contactUrl, setContactUrl] = useState("");
  const [maxMembers, setMaxMembers] = useState(4);

  const handleAddPosition = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && positionInput.trim()) {
      setPositions((prev) => [...prev, positionInput.trim()]);
      setPositionInput("");
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    if (teamType === "hackathon" && !hackathonSlug) return;
    router.push("/camp");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-green-50 px-4 py-16">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-8">
          <p className="text-sm text-gray-400">캠프 / 팀 만들기</p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">새 팀 만들기</h1>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm flex flex-col gap-6">

          {/* 팀 유형 */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">팀 유형</label>
            <div className="flex gap-2">
              <button
                data-testid="camp-new-team-hackathon-btn"
                type="button"
                onClick={() => setTeamType("hackathon")}
                className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  teamType === "hackathon"
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                🏆 해커톤팀
              </button>
              <button
                data-testid="camp-new-team-open-btn"
                type="button"
                onClick={() => setTeamType("open")}
                className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  teamType === "open"
                    ? "border-amber-400 bg-amber-50 text-amber-600"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                🔓 오픈팀
              </button>
            </div>
          </div>

          {/* 해커톤 선택 (해커톤팀인 경우) */}
          {teamType === "hackathon" && (
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">해커톤</label>
              <select
                data-testid="camp-new-team-hackathon-select"
                value={hackathonSlug}
                onChange={(e) => setHackathonSlug(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">해커톤 선택</option>
                {HACKATHONS.map((h) => (
                  <option key={h.slug} value={h.slug}>
                    {h.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 팀명 */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">팀명</label>
            <input
              data-testid="camp-new-team-name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="팀 이름을 입력하세요"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* 팀 소개 */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">팀 소개</label>
            <textarea
              data-testid="camp-new-team-description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="팀을 소개해주세요"
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* 모집 포지션 */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">모집 포지션</label>
            <input
              data-testid="camp-new-team-position-input"
              type="text"
              value={positionInput}
              onChange={(e) => setPositionInput(e.target.value)}
              onKeyDown={handleAddPosition}
              placeholder="포지션 입력 후 Enter"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            {positions.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {positions.map((pos) => (
                  <span
                    key={pos}
                    className="flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                  >
                    {pos}
                    <button
                      type="button"
                      onClick={() => setPositions((prev) => prev.filter((p) => p !== pos))}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 연락처 URL */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">연락처 URL</label>
            <input
              data-testid="camp-new-team-contact-input"
              type="url"
              value={contactUrl}
              onChange={(e) => setContactUrl(e.target.value)}
              placeholder="https://open.kakao.com/..."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* 최대 인원 */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-gray-500">최대 인원</label>
            <div className="flex items-center gap-3">
              <button
                data-testid="camp-new-team-members-decrease-btn"
                type="button"
                onClick={() => setMaxMembers((v) => Math.max(1, v - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                −
              </button>
              <span data-testid="camp-new-team-members-count" className="w-8 text-center text-sm font-semibold text-gray-800">
                {maxMembers}
              </span>
              <button
                data-testid="camp-new-team-members-increase-btn"
                type="button"
                onClick={() => setMaxMembers((v) => Math.min(10, v + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-2 pt-2">
            <button
              data-testid="camp-new-team-cancel-btn"
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-xl border-2 border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              data-testid="camp-new-team-submit-btn"
              type="button"
              onClick={handleSubmit}
              disabled={!name.trim() || (teamType === "hackathon" && !hackathonSlug)}
              className="flex-1 rounded-xl bg-gradient-to-r from-blue-500 to-green-400 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              팀 만들기
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CampNewPage() {
  return (
    <Suspense>
      <CampNewContent />
    </Suspense>
  );
}
