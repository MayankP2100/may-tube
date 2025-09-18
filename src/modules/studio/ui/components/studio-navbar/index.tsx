import { SidebarTrigger } from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AuthButton from '@/modules/auth/ui/components/auth-button';
import StudioUploadModal from '../studio-upload-modal';

export default function StudioNavbar() {
  return (
    <nav className='fixed top-0 right-0 left-0 z-50 flex h-16 items-center border-b px-2 pr-5 shadow-md'>
      <div className='flex w-full items-center gap-4'>
        {/* Menu and Logo */}
        <div className='flex items-center'>
          <SidebarTrigger />
          <Link href={'/studio'}>
            <Image
              src='/maytube-studio.svg'
              alt='MayTube Studio Logo'
              width={150}
              height={64}
            />
          </Link>
        </div>

        {/* Spacer */}
        <div className='flex-1' />

        <div className='flex flex-shrink-0 items-center gap-4'>
          <StudioUploadModal />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
