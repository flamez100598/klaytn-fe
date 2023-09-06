"use client";
import { LinkOfDevice, WalletConfigV2 } from "@/types/wallet.type";
import Link from "next/link";
import { isDesktop, isMobile } from "react-device-detect";
import Image from "next/image";
import { Connector } from "wagmi";
import { Loader2 } from "lucide-react";
export type Login<T> = (connectorId: WalletConfigV2<T>) => void;

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Props<T> {
  loadingConnect: boolean;
  pendingConnector: Connector<any, any> | undefined;
  wallet: WalletConfigV2<T>;
  login: Login<T>;
}

const WalletCard = ({
  wallet,
  login,
  loadingConnect,
  pendingConnector,
}: Props<any>) => {
  const { title, icon, installed, downloadLink } = wallet;
  let linkAction: any = {
    onClick: () => login(wallet),
  };

  if (installed === false && isDesktop && downloadLink) {
    linkAction = {
      as: Link,
      href: getDesktopLink(downloadLink),
      style: {
        textDecoration: "none",
      },
      target: "_blank",
      rel: "noopener noreferrer",
    };
  }

  if (
    typeof window !== "undefined" &&
    !window.ethereum &&
    wallet.deepLink &&
    isMobile
  ) {
    linkAction = {
      style: {
        textDecoration: "none",
      },
      as: Link,
      href: wallet.deepLink,
      target: "_blank",
      rel: "noopener noreferrer",
    };
  }

  if (installed === false && isDesktop && downloadLink) {
    return (
      <a
        href={getDesktopLink(downloadLink)}
        target="_blank"
        className="flex items-center bg-primary mb-4 last:mb-0 p-4 rounded-2xl font-medium text-lg text-primary-foreground hover:bg-primary/90 cursor-pointer"
      >
        <Image src={icon} width={40} height={40} alt="" className="mr-4" />
        <div className="flex items-center">
          <span className="mr-4"> {title}</span>
          {loadingConnect && wallet.connectorId === pendingConnector?.id && (
            <Loader2 className="h-5 w-5 animate-spin" />
          )}
        </div>
      </a>
    );
  }

  if (
    typeof window !== "undefined" &&
    !window.ethereum &&
    wallet.deepLink &&
    isMobile
  ) {
    return (
      <a
        href={wallet.deepLink}
        target="_blank"
        className="flex items-center bg-primary mb-4 last:mb-0 p-4 rounded-2xl font-medium text-lg text-primary-foreground hover:bg-primary/90 cursor-pointer"
      >
        <Image src={icon} width={40} height={40} alt="" className="mr-4" />
        <div className="flex items-center">
          <span className="mr-4"> {title}</span>
          {loadingConnect && wallet.connectorId === pendingConnector?.id && (
            <Loader2 className="h-5 w-5 animate-spin" />
          )}
        </div>
      </a>
    );
  }

  return (
    <div
      {...linkAction}
      className="flex items-center bg-primary mb-4 last:mb-0 p-4 rounded-2xl font-medium text-lg text-primary-foreground hover:bg-primary/90 cursor-pointer"
    >
      <Image src={icon} width={40} height={40} alt="" className="mr-4" />
      <div className="flex items-center">
        <span className="mr-4"> {title}</span>
        {loadingConnect && wallet.connectorId === pendingConnector?.id && (
          <Loader2 className="h-5 w-5 animate-spin" />
        )}
      </div>
    </div>
  );
};

export default WalletCard;

const getDesktopLink = (linkDevice: LinkOfDevice) => {
  if (typeof linkDevice === "string") {
    return linkDevice;
  }
  return typeof linkDevice.desktop === "string"
    ? linkDevice.desktop
    : linkDevice.desktop?.url;
};

export const getDesktopText = (linkDevice: LinkOfDevice, fallback: string) => {
  if (typeof linkDevice === "string") {
    return fallback;
  }

  return typeof linkDevice.desktop === "string"
    ? fallback
    : linkDevice.desktop?.text ?? fallback;
};
