import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
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
  
	return (
		<>
			<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
				<div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
					<ul className="flex justify-start gap-4">
            <li>
              <a href="#">Nova requisição</a>
            </li>
            <li>
              <a href="#">Minhas requisições</a>
            </li>
          </ul>
					{!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
				</div>
			</nav>
			<div className="flex flex-col gap-20 w-full">{children}</div>
		</>
	);
}
