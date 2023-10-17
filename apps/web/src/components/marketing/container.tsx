import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  bg = "bg-white",
}: {
  bg?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn(bg, className)}>
      <div className="relative mx-auto w-full px-8 lg:max-w-7xl">
        {children}
      </div>
    </div>
  );
}
