import HeaderAuth from "@/components/header-auth";
import { createClient } from "@/utils/supabase/server";
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

  const {
    data: { profile },
  } = await supabase.from("user_info").select().eq("user_id", user.id).single();

  if (profile !== "admin") {
    return redirect("/unauthorized");
  }

  return (
    <>
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <ul className="flex justify-start gap-4">
            <li>
              <a href="/admin/usuarios">Usuarios</a>
            </li>
            <li>
              <a href="/admin/empreendimentos">Empreendimentos</a>
            </li>
            <li>
              <a href="#">Dados</a>
            </li>
          </ul>
          {<HeaderAuth />}
        </div>
      </nav>
      <div className="flex flex-col gap-20 w-full">{children}</div>
    </>
  );
}
