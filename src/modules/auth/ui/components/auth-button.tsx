'use client';

import { Button } from '@/components/ui/button';
import { UserCircleIcon } from 'lucide-react';
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import React from 'react';

function AuthButton() {
  return (
    <>
      <SignedOut>
        <SignInButton mode='modal'>
          <Button>
            <UserCircleIcon /> Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
        {/* TODO: Add menu items for studio and user profile */}
      </SignedIn>
    </>
  );
}

export default AuthButton;
