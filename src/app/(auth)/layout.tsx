interface AuthLayoutProps {
  children: React.ReactNode;
}

import React from 'react';

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      {children}
    </div>
  );
}
