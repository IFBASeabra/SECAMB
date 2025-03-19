import HeaderAuth from '@/components/header-auth';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOutAction } from '@/app/actions';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  return (
    <>
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full md:w-4/5 flex justify-between items-center p-3 px-0 text-sm">
          <Image
            src="/logo-header.png"
            className="logo"
            alt="logo"
            width={180}
            height={60}
          />

          {/* Menu normal (pra telas maiores) */}
          <ul className="flex justify-start gap-4 hidden md:flex">
            <li>
              <a href="/home">Página Inicial</a>
            </li>
            <li>
              <a href="/empreendimentos/novo">Nova requisição</a>
            </li>
            <li>
              <a href="#">Minhas requisições</a>
            </li>
            <li>
              <a href="/empreendimentos">Empreendimentos</a>
            </li>
            <li>
              <a href="/processos">Processos</a>
            </li>
          </ul>
          <div className="hidden md:block">{<HeaderAuth />}</div>
        </div>

        {/* Menu responsivo (mobile) */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="btn-mobile md:hidden">
              <Menu />
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="h-full justify-left flex flex-col"
          >
            <SheetHeader>
              <SheetTitle className="text-left">SECAMB</SheetTitle>
              <SheetDescription className="flex flex-col md:flex-row text-left gap-4">
                Hey, {user.email}!
              </SheetDescription>
            </SheetHeader>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="/home" className="text-sm">
                  Página Inicial
                </a>
              </li>
              <li>
                <a href="/empreendimentos/novo" className="text-sm">
                  Nova requisição
                </a>
              </li>
              <li>
                <a href="#" className="text-sm">
                  Minhas requisições
                </a>
              </li>
              <li>
                <a href="/empreendimentos" className="text-sm">
                  Empreendimentos
                </a>
              </li>
            </ul>
            <div className="flex-grow" />

            {/* Botão de sair */}
            <div className="pb-4 text-red-500">
              <form action={signOutAction}>
                <Button type="submit" variant={'outline'} className="border-0">
                  <LogOut />
                  <strong>Sair</strong>
                </Button>
              </form>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
      <div className="flex flex-col w-4/5 items-center">{children}</div>
    </>
  );
}
