"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import {
  useAccount,
  useBalance,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { useCopyToClipboard, useWindowScroll } from "@uidotdev/usehooks";
import DialogWallet from "../DialogWallet";
import { Button } from "../ui/button";
import clsx from "clsx";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  User,
  Settings,
  LogOut,
  Globe2,
  Copy,
  CheckSquare,
  Wallet,
  Menu,
  ChevronLeft,
} from "lucide-react";

import { shortAddress } from "@/utils/wallet";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ScrollArea } from "../ui/scroll-area";
import useModalStore from "@/store/useModalStore";

const menuGroup1: { title: string; href: string; description: string }[] = [
  {
    title: "1. What is Fra-Art?",
    href: "/",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "2. What is Fra-Art?",
    href: "/",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "3. What is Fra-Art?",
    href: "/",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
];
const menuGroup2: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const Header = () => {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();
  const { disconnect } = useDisconnect();
  const [{ y }] = useWindowScroll();
  const [position, setPosition] = useState("eng");
  const [, copyToClipboard] = useCopyToClipboard();
  const [didCopy, setDidCopy] = useState<boolean>(false);
  const { data: dataBalance } = useBalance({
    address,
    watch: true,
  });

  const { walletModal, setWalletModal } = useModalStore();

  const dialogWalletHandler = useCallback((state: boolean) => {
    setWalletModal(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dialogWalletOpen = useCallback(() => {
    setWalletModal(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDisconnect = useCallback(() => {
    disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSwitchNetwork = useCallback(() => {
    const findNetWork = chains.find((x) => x?.id === chain?.id);
    if (switchNetwork && !findNetWork) {
      switchNetwork(chains[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchNetwork]);

  return (
    <header
      className={clsx(
        "bg-[#121418] px-4 lg:px-6 py-2.5 dark:bg-gray-800 sticky top-0 w-full z-50 flex items-center justify-between",
        y && y > 10 && "shadow-md backdrop-blur"
      )}
    >
      <Link href="/" className="mx-auto">
        <Image
          src="/images/homepage/logo.png"
          width={130}
          height={56} 
          alt="Picture of the author"
        />
      </Link>
      <DialogWallet open={walletModal} onOpenChange={dialogWalletHandler} />
    </header>
  );
};

export default Header;
