import { Trash2 } from "lucide-react";
import { Button, Checkbox } from "@/components/retroui";
import type { ShoppingItem } from "@/types/shoppingItem";
import { cn } from "@/lib/utils";

export type ShoppingListItemProps = {
  item: ShoppingItem;
  onToggleBought: (id: string, bought: boolean) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
  disabled?: boolean;
};

export function ShoppingListItem({
  item,
  onToggleBought,
  onDelete,
  disabled = false,
}: ShoppingListItemProps) {
  const handleCheckedChange = async (checked: boolean | "indeterminate") => {
    await onToggleBought(item._id, checked === true);
  };

  const handleDelete = async () => {
    await onDelete(item._id);
  };

  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded border-2 border-border bg-card px-3 py-2 shadow-sm",
        item.bought && "opacity-80",
      )}
    >
      <Checkbox
        checked={item.bought}
        onCheckedChange={handleCheckedChange}
        disabled={disabled}
        size="md"
        aria-label={
          item.bought
            ? `${item.name} als nicht erledigt markieren`
            : `${item.name} als gekauft markieren`
        }
      />
      <span
        className={cn(
          "min-w-0 flex-1 font-sans text-base text-foreground",
          item.bought && "text-muted-foreground line-through",
        )}
      >
        {item.name}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-10 min-h-10 min-w-10 shrink-0 text-destructive hover:bg-destructive/10"
        disabled={disabled}
        onClick={handleDelete}
        aria-label={`${item.name} löschen`}
      >
        <Trash2 className="size-[1.05rem]" aria-hidden />
      </Button>
    </li>
  );
}
