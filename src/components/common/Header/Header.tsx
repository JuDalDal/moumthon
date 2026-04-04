"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/common";
import { useMemberStore } from "@/stores/memberStore";
import { createLocalStore } from "@/lib/storage";
import myInitialData from "@/assets/data/my.json";
import { Nav } from "./Nav";
import { Breadcrumb } from "./Breadcrumb";

export function Header() {
  const pathname = usePathname();
  const isMain = pathname === "/";

  const { member, setMember, clearMember } = useMemberStore();
  const [open, setOpen] = useState(false);

  const handleLogin = () => {
    const store = createLocalStore<Record<string, unknown>>("my", "userId");
    store.seed(myInitialData as unknown as Record<string, unknown>[]);
    const { data } = store.getAll();
    const session = data?.[0];
    if (session && typeof session.userId === "string") {
      setMember({
        userId: session.userId,
        nickname: typeof session.displayName === "string" ? session.displayName : session.userId,
        avatarUrl: typeof session.avatarUrl === "string" ? session.avatarUrl : undefined,
      });
    }
  };

  const handleLogout = () => {
    clearMember();
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4">

        <div className="flex items-center gap-4">
          <Link href="/" className="text-base font-semibold hover:text-primary">
            MoumThon
          </Link>

          {!isMain && <Breadcrumb pathname={pathname} />}
          {!isMain && <Nav />}
        </div>

        <div className="relative">
          {member ? (
            <>
              <button
                onClick={() => setOpen(!open)}
                className="text-sm hover:text-primary"
                aria-expanded={open}
                aria-haspopup="true"
              >
                {member.nickname}님!
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-32 rounded-md border bg-white shadow-md">
                  <Link
                    href="/mypage"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    마이페이지
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </>
          ) : (
            <Button size="sm" onClick={handleLogin}>
              로그인
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}