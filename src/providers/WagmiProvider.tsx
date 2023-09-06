import { config } from "@/config/constants/wagmi";
import { WagmiConfig } from "wagmi";

export const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};
