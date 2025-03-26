import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOutAction } from '@/app/actions';
import UserMenu from '@/components/UserMenu';

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
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-green-700 font-medium">
        <div className="w-full xl:w-4/5 flex justify-between items-center p-3 px-0 text-sm">
          {/* Logo */}
          <Image
            src="/logo-header.png"
            className="logo"
            alt="logo"
            width={180}
            height={60}
          />

          {/* Menu normal (para telas maiores que xl) */}
          <ul className="flex justify-start gap-6 ml-8 xl:flex text-white text-base font-medium hidden xl:flex">
            <li>
              <a
                href="/home"
                className="hover:text-green-300 transition-colors duration-300"
              >
                Página Inicial
              </a>
            </li>
            <li>
              <a
                href="/empreendimentos/novo"
                className="hover:text-green-300 transition-colors duration-300"
              >
                Nova Requisição
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-green-300 transition-colors duration-300"
              >
                Minhas Requisições
              </a>
            </li>
            <li>
              <a
                href="/empreendimentos"
                className="hover:text-green-300 transition-colors duration-300"
              >
                Empreendimentos
              </a>
            </li>
            <li>
              <a
                href="/processos"
                className="hover:text-green-300 transition-colors duration-300"
              >
                Processos
              </a>
            </li>

            {/* Menu do usuário à direita */}
            <div className="ml-auto">
              <UserMenu userEmail={user.email} />
            </div>
          </ul>
        </div>

        {/* Menu responsivo (para telas menores que xl(1040) */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="btn-mobile xl:hidden ">
              <Menu />
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="h-full justify-left flex flex-col font-medium bg-green-100"
          >
            <SheetHeader>
              <SheetTitle className="text-left">
                <strong>SECAMB</strong>
              </SheetTitle>
              <SheetDescription className="flex flex-col md:flex-row text-left gap-4 font-medium">
                Olá, {user.email}!
              </SheetDescription>
            </SheetHeader>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="/home"
                  className="text-sm hover:text-green-500 font-medium"
                >
                  Página Inicial
                </a>
              </li>
              <li>
                <a
                  href="/empreendimentos/novo"
                  className="text-sm hover:text-green-500 font-medium"
                >
                  Nova Requisição
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm hover:text-green-500 font-medium"
                >
                  Minhas Requisições
                </a>
              </li>
              <li>
                <a
                  href="/empreendimentos"
                  className="text-sm hover:text-green-500 font-medium"
                >
                  Empreendimentos
                </a>
              </li>
              <li>
                <a
                  href="/processos"
                  className="text-sm hover:text-green-500 font-medium"
                >
                  Processos
                </a>
              </li>
            </ul>
            <div className="flex-grow" />

            {/* Botão de sair */}
            <div className="pb-4 text-red-500">
              <form action={signOutAction}>
                <Button
                  type="submit"
                  variant={'outline'}
                  className="border-0 bg-green-100 hover:bg-red-200 font-medium"
                >
                  <LogOut />
                  <strong>Sair</strong>
                </Button>
              </form>
            </div>
          </SheetContent>
        </Sheet>
      </nav>

      {/* Conteúdo principal */}
      <div className="flex flex-col w-4/5 items-center">{children}</div>
    </>
  );
}
