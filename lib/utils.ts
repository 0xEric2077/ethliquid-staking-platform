// 通用工具函数，可根据需要将更多工具函数拆分到 lib/hooks、lib/api 等子目录
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
