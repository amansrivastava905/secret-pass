import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isExpired(createdDate: Date, age: number) {
  const expirationDate = new Date(createdDate);
  expirationDate.setFullYear(expirationDate.getFullYear() + age);
  const currentDate = new Date();
  return currentDate > expirationDate;
}
