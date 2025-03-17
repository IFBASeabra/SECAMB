import HeaderAuth from "@/components/header-auth";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

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
    return redirect("/sign-in");
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
          <ul className="flex justify-start gap-4">
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
          {<HeaderAuth />}
        </div>
      </nav>
      <div className="flex flex-col w-4/5 items-center ">{children}</div>
    </>
  );
}
