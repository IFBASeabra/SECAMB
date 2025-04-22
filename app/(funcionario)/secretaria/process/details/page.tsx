"use server";

import { createClient } from "@/utils/supabase/server";
import Details from "./Details";
import { updateProcess } from "@/app/actions/updateProcess";

interface SearchParams {
  protocol: string;
}

interface ProcessData {
  id: number;
  protocol: string;
  status: string | null;
  description: string | null;
  // Add other fields as needed
}

const DataProcess = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  if (!searchParams.protocol) {
    return <div className="p-4">Protocolo não fornecido</div>;
  }

  const supabase = await createClient(); 
  const { data, error } = await supabase
    .from("process")
    .select("*")
    .eq("protocol", searchParams.protocol)
    .single(); 

  if (error) {
    console.error("Database error:", error);
    return (
      <div className="text-red-500 p-4">
        Erro ao carregar processo: {error.message}
      </div>
    );
  }

  if (!data) {
    return <div className="p-4">Processo não encontrado</div>;
  }

  return <Details data={data} updateData={updateProcess} />;
};

export default DataProcess;