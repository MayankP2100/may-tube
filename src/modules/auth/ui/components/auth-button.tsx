import { Button } from '@/components/ui/button';
import { UserCircleIcon } from 'lucide-react';
import React from 'react';

function AuthButton() {
  // TODO: Add different Auth states
  return (
    <Button>
      <UserCircleIcon /> Sign In
    </Button>
  );
}

export default AuthButton;
