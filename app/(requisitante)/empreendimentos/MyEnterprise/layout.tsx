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

  return (
    <main className="flex flex-col justify-start gap-10 w-full">
      <section>{children}</section>
    </main>
  );
}
