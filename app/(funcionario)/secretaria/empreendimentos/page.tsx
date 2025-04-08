import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TableModel from "@/components/ui/TableModel";
import BuscaEmpreendimento from "@/app/(requisitante)/empreendimentos/BuscaEmpreendimento";
import { FileSearch } from "lucide-react";

export default async function Enterprises() {

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();


    const { data, error } = await supabase
        .from('user_enterprise')
        .select(`
      id, 
      enterprise (name, cnpj, address, zipcode)
    `)

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
            title: 'Address',
            dataIndex: 'enterprise',
            render: (value: { address: string }) => value?.address || 'Sem endereço',
        },
        {
            title: 'Zipcode',
            dataIndex: 'enterprise',
            render: (value: { zipcode: string }) => value?.zipcode || 'Sem CEP',
        },

        {
            title: 'Detalhes',
            dataIndex: 'protocol',
            render: (value: string) => (
                <Button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200">
                    <Link className="flex gap-1 items-center" href={`/secretaria/process/details?p=${value}`}>
                        <FileSearch size={15} />  Ver mais
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