"use client";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { CommandInput, CommandEmpty, CommandGroup, CommandItem } from "cmdk";
import { ChevronsUpDown, Command, Check } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { CollectionCardStyle1, CollectionCardStyle2 } from "@/components/CollectionCard";
import Image from "next/image";
const InventoryView = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("All");
    const frameworks = [
        {
            value: "All",
            label: "All",
        },
    ];
    const onSelectHandler = useCallback((currentValue: string) => {
        setValue(currentValue === value ? "" : currentValue);
        setOpen(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="py-[40px]">
            <div className="flex items-center justify-between mx-[20px]">
                <h2 className="text-white text-[18px]">Inventory</h2>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[91px] justify-between bg-[#121418] text-[#8F8F8F]"
                        >
                            {value
                                ? frameworks.find((framework) => framework.value === value)?.label
                                : "All"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search framework..." />
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {frameworks.map((framework) => (
                                    <CommandItem key={framework.value} onSelect={onSelectHandler}>
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === framework.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {framework.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>

            </div>
            <div>
                <LandItem src={'/images/land.png'} name={'Rose Garden'} position={'Cau Giay, Hanoi'} piecesOwners={12} />
                <LandItem src={'/images/land.png'} name={'Sandy Villas'} position={'Cau Giay, Hanoi'} piecesOwners={24} />
            </div>
        </div>
    )
}

export default InventoryView;

const LandItem = ({ src, name, position, piecesOwners }: any) => {
    const widthPiece = {
        width: piecesOwners + '%'
    }
    console.log('widthPiece :>> ', widthPiece);
    return (
        <div className="bg-[#121418] group relative my-4 rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-lg mx-[20px]">
            <div className="overflow-hidden h-[240px] relative">
                <Image
                    src={src}
                    objectFit="cover"
                    loading="lazy"
                    layout="fill"
                    alt="#"
                />
                {/* <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/40">
                </div> */}
            </div>
            <div className="w-20 h-20 absolute left-[10%] -ml-10 rounded-xl p-[5px] top-[5%] overflow-hidden">
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-md">
                    <Image
                        src='/images/piece.png'
                        objectFit="cover"
                        loading="lazy"
                        layout="fill"
                        alt="#"
                    />
                </div>
            </div>
            <div className="w-full absolute  rounded-xl p-[5px] top-[41%] px-[40px]">
                <div className="bg-[#121418] p-2 rounded-md pb-4">
                    <p className="text-[#F4F4F4] py-2">Pieces owners</p>
                    <div className="relative w-full h-full rounded-xl shadow-md">
                        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                            <div className="bg-[#E53903] h-4 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={widthPiece}></div>
                        </div>
                        <p className="absolute top-[-4px] left-[43%] font-bold">{piecesOwners}/100</p>

                    </div>
                </div>
            </div>
            <div className="pt-2 pb-4">
                <div className="p-2 relative mx-2">
                    <p className="text-left text-primary text-white text-lg font-bold break-all truncate">
                        <span className="cursor-pointer">{name}</span>
                    </p>
                    <p className="pt-1 text-left text-primary text-[#8F8F8F] text-lg font-bold break-all truncate flex items-center gap-2">
                        <Image
                            src='/images/position.png'
                            loading="lazy"
                            alt="#"
                            width={16}
                            height={9}
                        />
                        <span className="cursor-pointer">{position}</span>
                    </p>

                </div>
            </div>
        </div>
    );
}