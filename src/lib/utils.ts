import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatAddress(address?: string) {
  if (!address) return '';
  return address.slice(0, 5) + '...' + address.slice(address.length - 5, address.length)
}