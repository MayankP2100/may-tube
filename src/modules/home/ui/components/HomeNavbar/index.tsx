import { SidebarTrigger } from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SearchInput from './search-input';

export default function HomeNavbar() {
  return (
    <nav className='bg-primary-foreground fixed top-0 right-0 left-0 z-50 flex h-16 items-center px-2 pr-5'>
      <div className='flex w-full items-center gap-4'>
        {/* Menu and Logo */}
        <div className='flex items-center'>
          <SidebarTrigger />
          <Link href={'/'}>
            <Image
              src='/maytube.svg'
              alt='MayTube Logo'
              width={200}
              height={64}
            />
          </Link>
        </div>

        {/* Search bar */}
        <div className='mx-auto flex max-w-[720px] flex-1 justify-center'>
          <SearchInput/>
        </div>
      </div>
    </nav>
  );
}
