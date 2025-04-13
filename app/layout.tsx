import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.scss';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Toaster } from '@/components/ui/sonner';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
};

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background bg-green-200 text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col">
            <div className="flex-1 w-full flex flex-col items-center">
              {children}
            </div>

            <footer className="w-full flex bg-green-100 items-center justify-center border-t mx-auto text-center text-xs gap-2 py-4 mt-auto">
              <p>
                Por{' '}
                <a
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noreferrer"
                >
                  SECAMB
                </a>
              </p>
              <ThemeSwitcher />
            </footer>
          </main>
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
