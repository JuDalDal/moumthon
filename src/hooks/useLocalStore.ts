"use client"

import { useState, useEffect } from "react"
import { createLocalStore } from "@/lib/storage"

/**
 * createLocalStoreHook
 *
 * createLocalStore를 React state와 연결한 hook 팩토리.
 * 반환된 hook은 items 상태와 CRUD 함수를 제공합니다.
 *
 * 사용 예시 — hook 정의:
 *   export const useTeamStore = createLocalStoreHook<Team>("teams", "teamCode")
 *
 * 컴포넌트에서 사용:
 *   const { items, create, update, remove, get } = useTeamStore()
 */
export function createLocalStoreHook<T extends Record<string, unknown>>(
  key: string,
  idField: keyof T,
  options?: { initialData?: T[] },
) {
  const store = createLocalStore<T>(key, idField)

  return function useLocalStore() {
    const [items, setItems] = useState<T[]>([])

    useEffect(() => {
      if (options?.initialData) store.seed(options.initialData)
      const { data } = store.getAll()
      if (data) setItems(data)
    }, [])

    function create(item: T) {
      const result = store.create(item)
      if (result.data) setItems((prev) => [...prev, result.data!])
      return result
    }

    function update(id: string, patch: Partial<T>) {
      const result = store.update(id, patch)
      if (result.data) {
        setItems((prev) =>
          prev.map((i) => (String(i[idField]) === id ? result.data! : i)),
        )
      }
      return result
    }

    function remove(id: string) {
      const result = store.remove(id)
      if (!result.error) {
        setItems((prev) => prev.filter((i) => String(i[idField]) !== id))
      }
      return result
    }

    function get(id: string) {
      return store.getById(id)
    }

    return { items, create, update, remove, get }
  }
}
