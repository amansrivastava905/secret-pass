import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Navbar from '@/components/sections/navbar';
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/sections/footer';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Secret Pass',
  description: 'Simple secret text sharing tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={cn(
          'min-h-screen flex flex-col bg-background font-sans antialiased',
          fontSans.variable,
        )}>
        <div className="flex-1">
          <Navbar />
          <main className="mb-20">{children}</main>
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
