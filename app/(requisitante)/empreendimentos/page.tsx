import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import BuscaEmpreendimento from "./BuscaEmpreendimento";

export default async function Enterprises() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();


  const { data, error } = await supabase
    .from('user_enterprise')
    .select()
    .eq('id_user', user!.id)

  if (error) {
    console.error('Erro ao buscar dados:', error.message);
    return null;
  }


  return (
    <>
      {
        data?.length === 0 &&
        <div className="p-4 text-center ">
          <p className="text-base py-2">Você ainda não representa nenhum empreendimento.</p>

          <p className="text-base py-2">Você pode buscar um empreendimento no formulário abaixo, ou <Link href="/empreendimentos/novo" className="text-blue-600 font-medium">Cadastrar um novo empreendimento</Link> </p>
        
          <BuscaEmpreendimento />
        </div>
      }
    </>
  );
}