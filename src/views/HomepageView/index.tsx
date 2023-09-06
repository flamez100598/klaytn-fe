"use client";

import { Button } from "@/components/ui/button";
import useModalStore from "@/store/useModalStore";
import { shortAddress } from "@/utils/wallet";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSub,
  DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent, DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useCallback } from "react";

import { useAccount, useBalance, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import Image from "next/image";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
const HomepageView = () => {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();
  const { disconnect } = useDisconnect();
  const { data: dataBalance } = useBalance({
    address,
    watch: true,
  });
  const { walletModal, setWalletModal } = useModalStore();
  const dialogWalletOpen = useCallback(() => {
    setWalletModal(true);
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
    <>
      <div className="bg-[url('/images/background.png')]">
        <div className="mx-auto w-6/12 pt-[15%]">
          {isConnected ? (chain?.unsupported &&
            <div className="mx-auto flex"><Button className="mx-auto" onClick={onSwitchNetwork} variant={"destructive"}>
              Wrong network
            </Button></div>)
            : <div className="mx-auto flex"><Button className="font-bold w-[279px] h-[67px] mx-auto bg-[#FFAA8F] text-black border-none rounded-[6px] font-[16px]" onClick={dialogWalletOpen}>
              <p className="px-2">
                <Image
                  src="/images/IconsWallet/metamask-logo.svg"
                  width={30}
                  height={56}
                  alt="Picture of the author"
                />
              </p>
              Connect Wallet</Button></div>
          }
        </div>
        {isConnected && (<>
          <Command>
            <CommandInput className="border-[#484848] bg-[#121418]" placeholder="Search house, appartment, ect" />
          </Command>
          <div className="h-100 w-100 relative flex items-center justify-center py-[10%]">
            <div className="flex">
              <PolygonMenu title={'History'} link={'/history'} />
            </div>
            <div className="right flex flex-col gap-6">
            <PolygonMenu title={'Inventory'} link={'/inventory'}  />
            <PolygonMenu title={'Market place'} link={'/Market place'} />
            </div>
          </div>
        </>)}
      </div>
    </>
  );
};
export default HomepageView;

const PolygonMenu = ({ title, link, active }: any) => {
  return (
    <div className={`flex items-center justify-center bg-[url('/images/Polygon.png')] 
    hover:bg-[url('/images/Polygon-active.png')] 
    bg-no-repeat bg-[length:100%_100%] w-[160px] h-[160px] text-[#8F8F8F] font-bold`}>
      <Link href={link} className="mx-auto">
     
        {title}
      </Link>
    </div>
  )
}