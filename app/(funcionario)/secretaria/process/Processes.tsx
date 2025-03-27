import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Processes() {
    const supabase = await createClient();

    // Pega o usuário autenticado
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Busca os processos no Supabase
    const { data, error } = await supabase.from("process").select(`
        id,
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

    return (
        <>
            {data?.length === 0 ? (
                <div className="p-4 text-center bg-white shadow-md rounded-md">
                    <p className="text-base py-2">
                        Você ainda não representa nenhum empreendimento.
                    </p>

                    <p className="text-base py-2">
                        Você pode buscar um empreendimento no formulário abaixo, ou{" "}
                        <Link href="/empreendimentos/novo" className="text-blue-600 font-medium">
                            Cadastrar um novo empreendimento
                        </Link>
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="table-auto w-full text-sm text-left text-gray-700">
                        <thead className="bg-blue-200 text-sm text-gray-600 uppercase">
                            <tr>
                                <th className="py-3 px-4 font-semibold text-left border-b border-gray-300">Empresa</th>
                                <th className="py-3 px-4 font-semibold text-left border-b border-gray-200">Descrição</th>
                                <th className="py-3 px-4 font-semibold text-left border-b border-gray-200">Status</th>
                                <th className="py-3 px-4 font-semibold text-left border-b border-gray-200"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((linha) => (
                                <tr
                                    key={linha.id}
                                    className="hover:bg-gray-50  hover:bg-gray-300 transition duration-200 border-b border-x border-gray-500"
                                >
                                    <td className="py-3 px-4">{linha.process_types?.name}</td>
                                    <td className="py-3 px-4">{linha.description || "Sem descrição"}</td>
                                    <td className="py-3 px-4">
                                        {/* Condicional para o status */}
                                        {linha.status === "Novo" ? (
                                            <span className="bg-blue-500 text-white px-3 py-2 rounded-full">
                                                {linha.status}
                                            </span>
                                        ) : linha.status === "Em andamento" ? (
                                            <span className="bg-yellow-500 text-white px-3 py-2 rounded-full">
                                                {linha.status}
                                            </span>
                                        ) : linha.status === "Recusado" ? (
                                            <span className="bg-red-500 text-white px-3 py-2 rounded-full">
                                                {linha.status}
                                            </span>
                                        ) : linha.status === "Em atendimento" ? (
                                            <span className="bg-yellow-600 text-white px-3 py-2 rounded-full">
                                                {linha.status}
                                            </span>
                                        ) : linha.status === "Finalizado" ? (
                                            <span className="bg-green-500 text-white px-3 py-2 rounded-full">
                                                {linha.status}
                                            </span>
                                        ) : (
                                            <span className="bg-gray-500 text-white px-3 py- rounded-full">
                                                Status desconhecido
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        <Button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200">
                                            Detalhes
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}


