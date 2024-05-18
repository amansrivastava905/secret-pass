import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isExpired(createdDate: Date, ageInMinutes: number) {
  const startDate = new Date(createdDate);
  const expirationTime = new Date(startDate.getTime() + ageInMinutes * 60000);
  const currentTime = new Date();
  return currentTime > expirationTime;
}
