import { Alexandria } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';

const alexandria = Alexandria({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl={'/'}>
      <html
        lang='en'
        className={alexandria.variable}
        suppressHydrationWarning
      >
        <head />
        <body>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
