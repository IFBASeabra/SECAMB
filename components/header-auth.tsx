import { signOutAction } from '@/app/actions';
import Link from 'next/link';
import { Button } from './ui/button';
import { createClient } from '@/utils/supabase/server';

import { LogOut } from 'lucide-react';

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex flex-col md:flex-row items-center gap-4">
      Olá, {user.email}!
      <form action={signOutAction}>
        <Button
          type="submit"
          variant={'outline'}
          className="text-red-700 bg-green-500 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm px-1.5 py-1 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-green-400 dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          <LogOut /> Sair
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={'outline'}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={'default'}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
