import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import BuscaEmpreendimento from "./BuscaEmpreendimento";
import { Button } from "@/components/ui/button";
import TableModel from "@/components/ui/TableModel";

export default async function Enterprises() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();


  const { data, error } = await supabase
    .from('user_enterprise')
    .select(`
      id, 
      enterprise (name, cnpj)
    `)
    .eq('id_user', user!.id)

  if (error) {
    console.error('Erro ao buscar dados:', error.message);
    return null;
  }

  const columns = [
    {
      title: 'Empresa',
      dataIndex: 'enterprise',
      render: (value: { name: string }) => value?.name || 'Sem nome',
    },
    {
      title: 'CNPJ',
      dataIndex: 'enterprise',
      render: (value: { cnpj: string }) => value?.cnpj || 'Sem CNPJ',
    },
    {
      title: '',
      dataIndex: 'id',
      render: (value: string) => (
        <Button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200">
          <Link href={`/processos/novo`}>
            Nova Requisição
          </Link>
        </Button>
      ),
    },
  ];

  return (
    <>
      {
        data?.length === 0 ?
          <div className="p-4 text-center ">
            <p className="text-base py-2">Você ainda não representa nenhum empreendimento.</p>

            <p className="text-base py-2">Você pode buscar um empreendimento no formulário abaixo, ou <Link href="/empreendimentos/novo" className="text-blue-600 font-medium">Cadastrar um novo empreendimento</Link> </p>

            <BuscaEmpreendimento />
          </div> : <TableModel columns={columns} data={data} />
      }
    </>
  );
}