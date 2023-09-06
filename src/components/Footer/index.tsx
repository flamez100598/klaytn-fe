"use client";

import { formatAddress } from "@/lib/utils";
import { useAccount } from "wagmi";
import Image from "next/image";
const Footer = () => {
  const { isConnected, address } = useAccount();
  if (!isConnected) {
    return <></>
  }
  return (
    <footer className="p-4 bg-[#121418] md:p-8 lg:p-10 dark:bg-gray-800">
      <div className="container text-center">
        <ul className="flex flex-wrap justify-center items-center mb-6 text-white gap-2">
          <li>
            <a href="#" className="mw-[190px] flex gap-2 mr-4 py-2 px-[40px] border-[#F4F4F4] border rounded-md">
              {formatAddress(address)} 
              <Image
         src="/images/IconsWallet/info.png"
         width={14}
         height={14}
         alt="Picture of the author"
       />
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 items-center flex">
              <Image
         src="/images/IconsWallet/bell.png"
         width={14}
         height={14}
         alt="Picture of the author"
       />
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 flex gap-2 ">
            <Image
         src="/images/IconsWallet/avatar.png"
         width={49}
         height={49}
         alt="Picture of the author"
       />
                  
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
