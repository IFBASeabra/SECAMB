import StatusBadge from "@/components/ui/StatusBadge";
import TableModel from "@/components/ui/TableModel";
import { Status } from "@/types/typings";
import { createClient } from "@/utils/supabase/server";
import { Link } from "lucide-react";
import React from "react";

export default async function page() {

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("process")
    .select(`
    id,
  protocol,
  status,
  process_types (name),
  enterprise (name)
 `).eq("id_user", user!.id)

  const columns = [
    {
      title: 'Empresa',
      dataIndex: 'enterprise',
      render: (value: { name: string }) => value?.name || 'Sem nome',
    },
    {
      title: 'Tipo de Processo',
      dataIndex: 'process_types',
      render: (value: { name: string }) => value?.name || 'Sem tipo',
    },
    {
      title: 'Número de Protocolo',
      dataIndex: 'protocol',
      render: (value: string) => value || 'Sem descrição',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      render: (value: Status) => <StatusBadge status={value} />,
    },
  ];

  return (
    <>
      {
        data !== null && data?.length > 0 ?
          <TableModel columns={columns} data={data} />
          :
          <div className="p-4 text-center ">
            <p className="text-base py-2">Você ainda não representa nenhum empreendimento.</p>
            <p className="text-base py-2">Você pode buscar um empreendimento no formulário abaixo, ou <Link href="/empreendimentos/novo" className="text-blue-600 font-medium">Cadastrar um novo empreendimento</Link> </p>
          </div>
      }
    </>
  );;
}
