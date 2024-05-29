import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export function MaxContainer({ children }: PropsWithChildren) {
  return <div className="mx-auto max-w-[1440px]">{children}</div>;
}

export function InlinePaddingContainer({
  children,
  className,
}: PropsWithChildren & { className?: string }) {
  return (
    <div className={cn("w-full px-6 md:px-8 lg:px-12 xl:px-20", className)}>
      {children}
    </div>
  );
}
