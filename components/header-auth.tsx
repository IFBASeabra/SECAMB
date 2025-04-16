import { signOutAction } from '@/app/actions';
import Link from 'next/link';
import { Button } from './ui/button';
import { createClient } from '@/utils/supabase/server';
import { LogOutIcon } from 'lucide-react';
import { cookies } from 'next/headers';

export default async function AuthButton() {
  const supabase = await createClient();
  const cookieStore = await cookies();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userCookie = cookieStore.get('user')?.value;
  const userInfo = user && userCookie ? JSON.parse(userCookie) : null;

  console.log('userCookie: ', userCookie);
  console.log('userInfo: ', userInfo);

  const userName = userInfo?.name?.split(' ')[0] ?? user?.email;

  return user ? (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <span>
        Olá, <strong>{userName}!</strong>
      </span>
      <form action={signOutAction}>
        <Button
          type="submit"
          className="flex gap-1 bg-transparent text-black hover:bg-red-500 hover:text-white"
          title="Sair"
        >
          <LogOutIcon size={16} /> Sair
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={'outline'}>
        <Link href="/sign-in">Entrar</Link>
      </Button>
      <Button asChild size="sm" variant={'default'}>
        <Link href="/sign-up">Cadastre-se</Link>
      </Button>
    </div>
  );
}
