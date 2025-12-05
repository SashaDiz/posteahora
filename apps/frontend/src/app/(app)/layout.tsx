import { ReactNode } from 'react';

export const dynamic = 'force-dynamic';

// This layout is now just a pass-through since the root layout handles everything
// Route groups like (app) don't create URL segments but can have their own layouts
export default function AppLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
