import { configureChains, createConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, ...(process.env.NODE_ENV === "development" ? [goerli] : [])],
  [
    // alchemyProvider({ apiKey: 'yourAlchemyApiKey' }),
    // infuraProvider({ apiKey: 'yourInfuraApiKey' }),
    publicProvider(),
  ]
);

export const injectedConnector = new InjectedConnector({
  chains,
  options: {
    name: "Injected",
    shimDisconnect: true,
  },
});

export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: true,
  },
});

// TODO export connector:
// export const coinbaseConnector = new CoinbaseWalletConnector({
//    chains,
//    options: {
//      appName: "wagmi",
//    },
//  });
//  export const walletConnectConnector = new WalletConnectConnector({
//    chains,
//    options: {
//      projectId: appConfig.walletconnectId,
//    },
// });
// TODO

export const config = createConfig({
  autoConnect: true,
  connectors: [
    metaMaskConnector,
    // coinbaseConnector,
    // walletConnectConnector,
    injectedConnector,
  ],
  publicClient,
  webSocketPublicClient,
});
