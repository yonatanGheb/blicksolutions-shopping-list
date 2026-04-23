import { ShoppingListItem } from "@/components/shopping-list-item";
import { ShoppingListSortSelect } from "@/components/shopping-list-sort-select";
import { Empty, Loader } from "@/components/retroui";
import type { ShoppingListSortMode } from "@/lib/sort-shopping-items";
import type { ShoppingItem } from "@/types/shoppingItem";

export type ShoppingListProps = {
  items: ShoppingItem[];
  loading: boolean;
  sortMode: ShoppingListSortMode;
  onSortModeChange: (value: ShoppingListSortMode) => void;
  onToggleBought: (id: string, bought: boolean) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
};

export function ShoppingList({
  loading,
  items,
  sortMode,
  onSortModeChange,
  onToggleBought,
  onDelete,
}: ShoppingListProps) {
  return loading ? (
    <div
      className="flex flex-col items-center gap-4 py-10"
      aria-busy="true"
    >
      <Loader size="lg" className="justify-center" />
      <p className="text-sm text-muted-foreground">Liste wird geladen…</p>
    </div>
  ) : items.length === 0 ? (
    <Empty>
      <Empty.Content>
        <Empty.Icon className="size-10 md:size-12" />
        <Empty.Title>Liste ist leer</Empty.Title>
        <Empty.Separator />
        <Empty.Description>
          Noch keine Einträge — tippe oben einen Namen ein und füge dein
          erstes Produkt hinzu.
        </Empty.Description>
      </Empty.Content>
    </Empty>
  ) : (
    <section
      className="flex w-full flex-col gap-3"
      aria-labelledby="einkaufsliste-heading"
    >
      <div className="flex w-full flex-row items-center justify-between gap-3 sm:gap-4">
        <h2
          id="einkaufsliste-heading"
          className="min-w-0 flex-1 text-xl font-normal leading-tight tracking-tight text-foreground sm:text-2xl"
        >
          Einkaufsliste
        </h2>
        <ShoppingListSortSelect
          value={sortMode}
          onChange={onSortModeChange}
          disabled={loading}
        />
      </div>

      <ul className="flex w-full flex-col gap-3">
        {items.map((item) => (
          <li key={item._id} className="list-none">
            <ShoppingListItem
              item={item}
              onToggleBought={onToggleBought}
              onDelete={onDelete}
              disabled={loading}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
