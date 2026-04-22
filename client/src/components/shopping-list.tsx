import { ShoppingListItem } from "@/components/shopping-list-item";
import { Empty, Loader } from "@/components/retroui";
import type { ShoppingItem } from "@/types/shoppingItem";

export type ShoppingListProps = {
  items: ShoppingItem[];
  loading: boolean;
  onToggleBought: (id: string, bought: boolean) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
};

export function ShoppingList({
  items,
  loading,
  onToggleBought,
  onDelete,
}: ShoppingListProps) {
  if (loading && items.length === 0) {
    return (
      <div className="flex items-center justify-center py-10" aria-busy="true">
        <Loader size="md" variant="default" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <Empty className="w-full">
        <Empty.Content>
          <Empty.Icon className="size-12 text-muted-foreground" />
          <Empty.Title>Noch keine Artikel</Empty.Title>
          <Empty.Description>
            Kurz eintragen — dann hast du alles auf einen Blick.
          </Empty.Description>
        </Empty.Content>
      </Empty>
    );
  }

  return (
    <ul className="flex flex-col gap-2" aria-label="Einkaufsliste">
      {items.map((item) => (
        <ShoppingListItem
          key={item._id}
          item={item}
          onToggleBought={onToggleBought}
          onDelete={onDelete}
          disabled={loading}
        />
      ))}
    </ul>
  );
}
