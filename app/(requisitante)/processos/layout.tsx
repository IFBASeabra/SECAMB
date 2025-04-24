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
      <header className="flex flex-col md:flex-row justify-between w-full">
        <div className="justify-start items-start md:justify-end w-full md:w-3/5 gap-4 md:gap-5 mt-4">
          <button
            type="button"
            className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2"
          >
            <a href="/processos/">Meus Processos</a>
          </button>
        </div>

        <nav className="flex flex-col md:flex-row justify-start items-start md:justify-end w-full md:w-3/5 gap-4 md:gap-5 mt-4">
          <button
            type="button"
          >
            <Link 
            href={'/processos/buscar'}
            className="text-white  bg-blue-500 hover:bg-blue-700  focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-1 mb-0"

            >Buscar</Link>
          </button>
          <button
            type="button"
          >
            <Link 
            href={'/processos/novo'}
            className="text-white  bg-blue-500 hover:bg-blue-700  focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-1 mb-0"

            >Novo</Link>
          </button>
        </nav>
      </header>

      <header className="flex justify-center w-full z-50">
      </header>
      <section>{children}</section>
    </main>
  );
}
