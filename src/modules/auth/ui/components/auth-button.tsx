'use client';

import { Button } from '@/components/ui/button';
import { ClapperboardIcon, UserCircleIcon } from 'lucide-react';
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import React from 'react';

function AuthButton() {
  return (
    <>
      <SignedIn>
        <UserButton>
          <UserButton.MenuItems>
            {/* TODO: Add user profile */}
            <UserButton.Link
              label='Studio'
              href='/studio'
              labelIcon={<ClapperboardIcon className='size-4' />}
            />
            <UserButton.Action label='manageAccount' />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode='modal'>
          <Button>
            <UserCircleIcon /> Sign In
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
}

export default AuthButton;
