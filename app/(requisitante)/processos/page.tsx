import { Button } from "@/components/ui/button";
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
  process_types (name),
  enterprise (name)
 `).eq("id_user", user!.id)

  return (
    <>
      {
        data?.length === 0 ?

          <div className="p-4 text-center ">
            <p className="text-base py-2">Você ainda não representa nenhum empreendimento.</p>

            <p className="text-base py-2">Você pode buscar um empreendimento no formulário abaixo, ou <Link href="/empreendimentos/novo" className="text-blue-600 font-medium">Cadastrar um novo empreendimento</Link> </p>

          </div> : (
            <table className="table-auto w-full">
              <thead className="text-left">
                <tr>
                  <th>Empresa</th>
                  <th>Tipo de Processo</th>
                  <th>Número de Protocolo</th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.map(e => (
                    <tr>
                      <td>
                        {/*@ts-ignore*/}
                        {e.enterprise.name}
                      </td>
                      <td>
                        {/*@ts-ignore*/}
                        {e.process_types.name}
                      </td>
                      <td>
                        {e.protocol}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
      }
    </>
  );;
}
