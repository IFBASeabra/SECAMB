import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/StatusBadge";  // Corrigido: A importação estava errada
import TableModel from "@/components/ui/TableModel";
import { Status } from "@/types/typings";

export default async function Process() {
    const supabase = await createClient();

    // Pega o usuário autenticado
    const { data: { user } } = await supabase.auth.getUser();

    // Busca os processos no Supabase
    const { data, error } = await supabase.from("process").select(`
        id,
        protocol,
        description,
        status,
        process_types (name),
        enterprise (name)
    `);

    // Verifica se ocorreu algum erro na requisição
    if (error) {
        console.error("Erro ao buscar dados:", error.message);
        return null;
    }

    // Definindo as colunas da tabela
    const columns = [
        {
            title: 'Empresa',
            dataIndex: 'enterprise',
            render: (value: any) => value?.name || 'Sem nome',
        },
        {
            title: 'Processo',
            dataIndex: 'process_types',
            render: (value: any) => value?.name || 'Sem tipo',
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            render: (value: string) => value || 'Sem descrição',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (value: Status) => <StatusBadge status={value} />,
        },
        {
            title: 'Detalhes',
            dataIndex: 'protocol',
            render: (value: string) => (
                <Button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200">
                    <Link href={`/secretaria/process/details?p=${value}`}>
                        Detalhes
                    </Link>
                </Button>
            ),
        },
    ];

    return (
        <>
            {data?.length === 0 ? (
                <div className="p-4 text-center bg-white shadow-md rounded-md">
                    <p className="text-base py-2">
                        Não existe processos.
                    </p>

                    <p className="text-base py-2">
                        Você pode buscar um empreendimento no formulário abaixo, ou{" "}
                        <Link href="/empreendimentos/novo" className="text-blue-600 font-medium">
                            Cadastrar um novo empreendimento
                        </Link>
                    </p>
                </div>
            ) : (
                <TableModel columns={columns} data={data} />
            )}
        </>
    );
}
