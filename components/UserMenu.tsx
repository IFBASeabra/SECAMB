'use client';

import { useState } from 'react';
import { LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOutAction } from '@/app/actions';
import { useRouter } from 'next/navigation';

export default function UserMenu({ userEmail }: { userEmail: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative">
      {/* Botão para abrir o menu */}
      <button
        className="inline-flex items-center px-2 py-1 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-600"
        type="button"
        onClick={() => setOpen(!open)}
      >
        Olá, {userEmail}!
        <svg
          className="w-2 h-2 ml-2"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Menu dropdown */}
      {open && (
        <div className="absolute items-rightjustify-right right-0 mt-2 w-44 bg-white border border-green-500 bg-green rounded-lg shadow-lg z-10 font-medium">
          {/* Configurações */}
          <button
            onClick={() => router.push('#')}
            className="flex w-full items-right justify-right px-3 py-2 text-sm text-gray-700 hover:bg-green-100  font-sans"
          >
            <Settings className="w-4 h-4 mr-2 items-right justify-right font-medium" />
            Configurações
          </button>

          <hr className="border-gray-200" />

          {/* Sair */}
          <form action={signOutAction}>
            <Button
              type="submit"
              variant="outline"
              className="flex w-full items-center px-3 py-2 text-sm text-red-700 hover:bg-red-50 font-medium"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
