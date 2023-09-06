// TODO:
// import { listChains, polygon } from './constants/chains';

export const appConfig = {
  publicUrl: process.env.NEXT_PUBLIC_URL,
  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 1,
  includeTestnet:
    (process.env.NEXT_PUBLIC_INCLUDE_TESTNET ?? "false") === "true",
  cdnUrl: process.env.NEXT_PUBLIC_CDN_URL,
  walletconnectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID
    ? process.env.NEXT_PUBLIC_WALLETCONNECT_ID
    : "",
};

// TODO:
// export const targetChainId = appConfig.chainId;

// TODO:
// export const targetNetwork = listChains.find((chain) => chain.id === targetChainId) ?? polygon;
