import { createClient } from '@/utils/supabase/server';
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

  const {
    data: { profile },
  } = await supabase.from('user_info').select().eq('user_id', user.id).single();

  if (profile !== 'admin') {
    return redirect('/unauthorized');
  }

  return (
    <>
      <main className="flex flex-col justify-start gap-10 w-full">
        <header className="flex justify-between w-full">
          <div className="w-1/5">Usuários</div>
          <nav className="flex justify-end items-center w-4/5"></nav>
        </header>
        <section>{children}</section>
      </main>
    </>
  );
}
