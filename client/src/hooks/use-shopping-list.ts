import { useCallback, useEffect, useRef, useState } from "react"
import {
  createItem,
  deleteItem,
  getItems,
  updateItemBought,
} from "@/lib/api"
import {
  type ShoppingListSortMode,
  sortShoppingItems,
} from "@/lib/sort-shopping-items"
import type { ShoppingItem } from "@/types/shoppingItem"

export type UseShoppingListResult = {
  items: ShoppingItem[]
  loading: boolean
  error: string | null
  sortMode: ShoppingListSortMode
  addItem: (name: string) => Promise<void>
  toggleBought: (id: string, bought: boolean) => Promise<void>
  deleteListItem: (id: string) => Promise<void>
  changeSortMode: (mode: ShoppingListSortMode) => void
  clearError: () => void
}

export function useShoppingList(): UseShoppingListResult {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortMode, setSortMode] =
    useState<ShoppingListSortMode>("created-desc")
  const sortModeRef = useRef<ShoppingListSortMode>(sortMode)

  useEffect(() => {
    sortModeRef.current = sortMode
  }, [sortMode])

  useEffect(() => {
    let stale = false

    // eslint-disable-next-line react-hooks/set-state-in-effect -- Mount-Datenladen
    setLoading(true)
    setError(null)

    getItems()
      .then((data) => {
        if (stale) return
        setItems(sortShoppingItems(data, sortModeRef.current))
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

  const changeSortMode = useCallback((mode: ShoppingListSortMode) => {
    setSortMode(mode)
    setItems((prev) => sortShoppingItems(prev, mode))
  }, [])

  const addItem = useCallback(async (name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return
    setError(null)
    try {
      const created = await createItem(trimmed)
      setItems((prev) =>
        sortShoppingItems([...prev, created], sortModeRef.current),
      )
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
      setItems((prev) =>
        sortShoppingItems(
          prev.map((x) => (x._id === id ? updated : x)),
          sortModeRef.current,
        ),
      )
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
    sortMode,
    addItem,
    toggleBought,
    deleteListItem,
    changeSortMode,
    clearError,
  }
}
