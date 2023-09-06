"use client";
import { useEffect, useState } from "react";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { WagmiProvider } from "./WagmiProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <ReactQueryProvider>
      <WagmiProvider>{mounted && children}</WagmiProvider>
    </ReactQueryProvider>
  );
}
