import { useCallback, useEffect, useState } from "react"
import {
  createItem,
  deleteItem,
  getItems,
  updateItemBought,
} from "@/lib/api"
import type { ShoppingItem } from "@/types/shoppingItem"

export type UseShoppingListResult = {
  items: ShoppingItem[]
  loading: boolean
  error: string | null
  addItem: (name: string) => Promise<void>
  toggleBought: (id: string, bought: boolean) => Promise<void>
  deleteListItem: (id: string) => Promise<void>
  clearError: () => void
}

export function useShoppingList(): UseShoppingListResult {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let stale = false

    setLoading(true)
    setError(null)

    getItems()
      .then((data) => {
        if (stale) return
        setItems(data)
      })
      .catch((e) => {
        if (stale) return
        setError(e instanceof Error ? e.message : "Could not load list")
      })
      .finally(() => {
        if (stale) return
        setLoading(false)
      })

    return () => {
      stale = true
    }
  }, [])

  const addItem = useCallback(async (name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return
    setError(null)
    try {
      const created = await createItem(trimmed)
      setItems((prev) => [...prev, created])
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not add item"
      setError(message)
      throw err
    }
  }, [])

  const toggleBought = useCallback(async (id: string, bought: boolean) => {
    setError(null)
    try {
      const updated = await updateItemBought(id, bought)
      setItems((prev) => prev.map((x) => (x._id === id ? updated : x)))
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not update item",
      )
    }
  }, [])

  const deleteListItem = useCallback(async (id: string) => {
    setError(null)
    try {
      await deleteItem(id)
      setItems((prev) => prev.filter((x) => x._id !== id))
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not delete item",
      )
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    items,
    loading,
    error,
    addItem,
    toggleBought,
    deleteListItem,
    clearError,
  }
}
