import React from 'react';
import Container from '../ui/container';
import Link from 'next/link';
import { route } from '@/constants/route.constant';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className=" bg-secondary py-5">
      <Container className="flex flex-col sm:flex-row justify-between sm:items-center sm:space-x-10">
        <div>
          <Link href={route.HOME} className="">
            Create your{' '}
            <span className="font-bold underline decoration-destructive">
              SecretPass
            </span>
          </Link>
        </div>
        <div>
          <p>
            made with <FaHeart className=" inline" /> by{' '}
            <Link
              href={process.env.PORTFOLIO_LINK || ''}
              className="font-semibold hover:underline">
              Aman Srivastava
            </Link>
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
