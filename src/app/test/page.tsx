"use client"

import { useState } from "react"
import { Agentation, type Annotation } from "agentation"
import { Button } from "@/components/common"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/common"
import { Badge } from "@/components/common"
import { Avatar } from "@/components/common"
import { Input } from "@/components/common"

export default function AgentationTestPage() {
  const [log, setLog] = useState<Annotation[]>([])

  function handleAdd(annotation: Annotation) {
    setLog((prev) => [annotation, ...prev])
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold">Agentation 테스트</h1>
      <p className="mb-8 text-muted-foreground text-sm">
        우측 하단 툴바로 요소를 클릭해 어노테이션을 추가해보세요.
      </p>

      <div className="grid gap-8">

        {/* Buttons */}
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Buttons</h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Badges */}
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </section>

        {/* Avatars */}
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Avatars</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Avatar size="sm" fallback="AB" />
            <Avatar size="default" fallback="LJ" />
            <Avatar size="lg" fallback="CD" />
            <Avatar
              size="default"
              src="https://github.com/shadcn.png"
              alt="shadcn"
            />
          </div>
        </section>

        {/* Inputs */}
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Inputs</h2>
          <div className="grid gap-4 max-w-sm">
            <Input label="닉네임" placeholder="닉네임을 입력하세요" />
            <Input label="이메일" hint="팀원 초대에 사용됩니다" placeholder="example@email.com" />
            <Input label="에러 예시" error="필수 항목입니다" placeholder="입력해주세요" />
          </div>
        </section>

        {/* Cards */}
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-muted-foreground">Cards</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>해커톤 제목</CardTitle>
                <CardDescription>2026.03.01 ~ 2026.04.01</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1.5">
                  <Badge variant="default">진행중</Badge>
                  <Badge variant="outline">LLM</Badge>
                  <Badge variant="outline">GenAI</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm">자세히 보기</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>팀 카드</CardTitle>
                <CardDescription>팀원 모집 중</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Avatar size="sm" fallback="LJ" />
                  <Avatar size="sm" fallback="AB" />
                  <Avatar size="sm" fallback="CD" />
                  <span className="text-xs text-muted-foreground">3 / 5명</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline">팀 참가</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Annotation log */}
        {log.length > 0 && (
          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-muted-foreground">Annotation log</h2>
            <div className="flex flex-col gap-2">
              {log.map((a) => (
                <Card key={a.id} size="sm">
                  <CardContent className="py-3 font-mono text-xs">
                    <p><span className="text-muted-foreground">element:</span> {a.element}</p>
                    <p><span className="text-muted-foreground">path:</span> {a.elementPath}</p>
                    {a.comment && <p><span className="text-muted-foreground">comment:</span> {a.comment}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

      </div>

      <Agentation onAnnotationAdd={handleAdd} />
    </main>
  )
}
