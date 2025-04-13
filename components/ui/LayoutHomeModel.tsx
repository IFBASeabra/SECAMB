import HeaderAuth from '@/components/header-auth';
import HeaderGreeting from '../header-greeting';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOutAction } from '@/app/actions';
import { LogOutIcon } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type NavItem = {
  name: string;
  href: string;
};

type LayoutProps = {
  children: React.ReactNode;
  navItems: NavItem[];
};

export default async function LayoutHomeModel({
  children,
  navItems,
}: LayoutProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  return (
    <>
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-green-700 text-green-100 sticky top-0 z-40">
        <div className="w-full md:w-4/5 flex justify-between items-center p-3 px-0 text-sm">
          <Image
            src="/logo-header.png"
            className="logo"
            alt="logo"
            width={180}
            height={60}
          />

          <ul className="flex justify-start gap-4 hidden md:flex">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="text-sm cursor-pointer hover:text-green-300"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <HeaderAuth />
          </div>
        </div>

        {/* Menu responsivo (mobile) */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="btn-mobile md:hidden">
              {' '}
              <Menu />{' '}
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="bg-green-100">
            <SheetHeader>
              <SheetTitle className="text-green-900">
                <strong>SECAMB</strong>
              </SheetTitle>

              <SheetDescription className="text-black">
                <HeaderGreeting />
              </SheetDescription>

              <SheetDescription>Selecione o que deseja</SheetDescription>
            </SheetHeader>{' '}
            <br />
            <ul className="flex flex-col justify-center gap-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="text-sm hover:text-green-700">
                    {item.name}
                  </a>
                  <hr className="p-0.5" />
                </li>
              ))}
            </ul>
            <form action={signOutAction}>
              <Button
                type="submit"
                variant={'outline'}
                className="flex gap-1 bg-red-500 text-white absolute bottom-4 left-3 hover:bg-red-600 hover:text-white"
                title="Sair"
              >
                <LogOutIcon size={16} />
                Sair
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </nav>

      <div className="flex flex-col w-4/5 items-center">{children}</div>
    </>
  );
}
