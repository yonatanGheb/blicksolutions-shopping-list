import { useCallback, useState, type ChangeEvent, type FormEvent } from "react";
import { Plus } from "lucide-react";
import { Button, Input } from "@/components/retroui";

export type AddItemFormProps = {
  disabled?: boolean;
  onSubmit: (name: string) => Promise<void>;
};

const EMPTY_NAME_MESSAGE = "Bitte gib einen Artikelnamen ein.";

export function AddItemForm({ disabled = false, onSubmit }: AddItemFormProps) {
  const [nameInput, setNameInput] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
    setFieldError(null);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const name = nameInput.trim();
      if (!name) {
        setFieldError(EMPTY_NAME_MESSAGE);
        return;
      }
      setFieldError(null);
      setSubmitting(true);
      try {
        await onSubmit(name);
        setNameInput("");
      } catch {
        console.error("Error adding item");
      } finally {
        setSubmitting(false);
      }
    },
    [nameInput, onSubmit],
  );

  const busy = disabled || submitting;

  return (
    <form
      onSubmit={(e) => void handleSubmit(e)}
      className="flex flex-col gap-1.5 sm:gap-2"
    >
      <div className="flex flex-row items-start gap-2">
        <div className="grid min-w-0 flex-1 gap-1.5">
          <Input
            id="item-name"
            className="bg-background text-base sm:text-sm"
            placeholder="Füge ein Produkt hinzu..."
            value={nameInput}
            onChange={handleNameChange}
            disabled={busy}
            autoComplete="off"
            aria-invalid={fieldError ? true : undefined}
            aria-describedby={fieldError ? "item-name-error" : undefined}
          />
          {fieldError ? (
            <p id="item-name-error" className="text-sm text-destructive" role="alert">
              {fieldError}
            </p>
          ) : null}
        </div>
        <Button
          type="submit"
          variant="default"
          size="icon"
          className="size-11 min-h-11 min-w-11 shrink-0"
          disabled={busy}
          aria-label="Eintrag hinzufügen"
          aria-busy={submitting}
        >
          <Plus className="size-5" aria-hidden />
        </Button>
      </div>
    </form>
  );
}
