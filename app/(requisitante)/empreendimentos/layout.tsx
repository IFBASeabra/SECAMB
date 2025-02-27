import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

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
    <main className="flex flex-col justify-start gap-10 w-full">
      <header className="flex justify-between w-full">
        <div className="w-1/5">
          <a href="/empreendimentos">Meus Empreendimentos</a>
        </div>
        <nav className="flex justify-end items-center w-4/5">
          <Link href={'/empreendimentos/novo'}>Novo</Link>
        </nav>
      </header>
      <section>{children}</section>
    </main>
  );
}
