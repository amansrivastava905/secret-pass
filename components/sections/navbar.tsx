import { FaGreaterThan } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';
import Container from '../ui/container';
import { route } from '@/constants/route.constant';
import { Button } from '../ui/button';

const Navbar = () => {
  return (
    <nav className="z-50 border-b border-b-border fixed w-full top-0 bg-background backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container className="py-4 sm:py-5 flex items-center justify-between">
        <Link
          href={route.HOME}
          className="flex items-center text-primary text-lg font-bold">
          <FaGreaterThan /> SecretPass
        </Link>
        <div>
          <Link
            href={process.env.PORTFOLIO_LINK || ''}
            className="flex items-center">
            <Button variant="secondary" size="sm">
              Portfolio
            </Button>
          </Link>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
