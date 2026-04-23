import type { ShoppingItem } from "@/types/shoppingItem";

export type ShoppingListSortMode =
  | "name-asc"
  | "name-desc"
  | "created-asc"
  | "created-desc"
  | "open-first"
  | "bought-first";

function timeMs(iso: string | undefined): number {
  if (!iso) return 0;
  const t = Date.parse(iso);
  return Number.isNaN(t) ? 0 : t;
}

function compareId(a: ShoppingItem, b: ShoppingItem): number {
  return a._id.localeCompare(b._id);
}

/** Sortiert eine Kopie der Liste (reine Client-Sortierung fürs Select). */
export function sortShoppingItems(
  items: ShoppingItem[],
  mode: ShoppingListSortMode,
): ShoppingItem[] {
  const copy = [...items];

  switch (mode) {
    case "name-asc":
      return copy.sort(
        (a, b) =>
          a.name.localeCompare(b.name, "de", { sensitivity: "base" }) ||
          compareId(a, b),
      );
    case "name-desc":
      return copy.sort(
        (a, b) =>
          b.name.localeCompare(a.name, "de", { sensitivity: "base" }) ||
          compareId(a, b),
      );
    case "created-asc":
      return copy.sort(
        (a, b) =>
          timeMs(a.createdAt) - timeMs(b.createdAt) || compareId(a, b),
      );
    case "created-desc":
      return copy.sort(
        (a, b) =>
          timeMs(b.createdAt) - timeMs(a.createdAt) || compareId(a, b),
      );
    case "open-first":
      return copy.sort(
        (a, b) =>
          Number(a.bought) - Number(b.bought) ||
          a.name.localeCompare(b.name, "de", { sensitivity: "base" }) ||
          compareId(a, b),
      );
    case "bought-first":
      return copy.sort(
        (a, b) =>
          Number(b.bought) - Number(a.bought) ||
          a.name.localeCompare(b.name, "de", { sensitivity: "base" }) ||
          compareId(a, b),
      );
    default:
      return copy;
  }
}
