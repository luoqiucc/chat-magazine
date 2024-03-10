import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { uid } from 'uid'
import md5 from 'md5'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const UID_LENGTH = 16
export function getUid(): string {
  return uid(UID_LENGTH)
}

export function passwordEncoding(password: string): string {
  return md5(password)
}
