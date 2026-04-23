import { Select } from "@/components/retroui";
import type { ShoppingListSortMode } from "@/lib/sort-shopping-items";

export type ShoppingListSortSelectProps = {
  value: ShoppingListSortMode;
  onChange: (mode: ShoppingListSortMode) => void;
  disabled?: boolean;
};

export function ShoppingListSortSelect({
  value,
  onChange,
  disabled = false,
}: ShoppingListSortSelectProps) {
  return (
    <div className="w-44 max-w-[32%] shrink-0 sm:max-w-none">
      <Select
        value={value}
        onValueChange={(v) => onChange(v as ShoppingListSortMode)}
        disabled={disabled}
      >
        <Select.Trigger
          id="sort-liste"
          aria-label="Sortierung"
          className="flex h-9 min-h-9 w-full min-w-0 max-w-full flex-nowrap items-center justify-between gap-1.5 overflow-hidden bg-background px-2.5 py-0 text-left text-xs shadow-sm [&_svg]:size-3.5"
        >
          <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-left leading-tight">
            <Select.Value placeholder="Sortieren" />
          </span>
        </Select.Trigger>
        <Select.Content position="popper">
          <Select.Group>
            <Select.Label className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Datum
            </Select.Label>
            <Select.Item value="created-desc">Neueste zuerst</Select.Item>
            <Select.Item value="created-asc">Älteste zuerst</Select.Item>
          </Select.Group>
          <Select.Separator className="my-1 h-px bg-border" />
          <Select.Group>
            <Select.Label className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Name
            </Select.Label>
            <Select.Item value="name-asc">A–Z</Select.Item>
            <Select.Item value="name-desc">Z–A</Select.Item>
          </Select.Group>
          <Select.Separator className="my-1 h-px bg-border" />
          <Select.Group>
            <Select.Label className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Status
            </Select.Label>
            <Select.Item value="open-first">Offen zuerst</Select.Item>
            <Select.Item value="bought-first">Gekauft zuerst</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select>
    </div>
  );
}
