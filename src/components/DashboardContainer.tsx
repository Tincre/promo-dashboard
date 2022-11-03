import { ReactNode } from 'react';

export function DashboardContainer({ children }: { children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-2 py-2 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      {children}
    </div>
  );
}
