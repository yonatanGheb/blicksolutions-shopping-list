import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { PAGE_SHELL } from "@/lib/page-shell";
import { cn } from "@/lib/utils";

export function AppHeader() {
  return (
    <header className="w-full bg-transparent">
      <div
        className={cn(
          PAGE_SHELL,
          "flex items-center justify-between gap-3 py-3 sm:py-6",
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex min-w-0 flex-1 items-center">
          <BrandLogo />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
