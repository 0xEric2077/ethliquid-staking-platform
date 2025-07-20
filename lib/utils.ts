// General utility functions, can be split into lib/hooks, lib/api, and other subdirectories as needed
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
