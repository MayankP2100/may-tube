import { Alexandria } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

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
    <html lang="en" className={alexandria.variable} suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
