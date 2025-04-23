"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


type ProcessDetails = {
  id: number;
  protocol: string;
  status: string | null;
  description: string | null;
};

type DetailsProps = {
  data: ProcessDetails;
  updateData: (
    protocol: string,
    newStatus: string
  ) => Promise<{ success?: boolean; error?: string }>;
};

const statusOptions = [
  "Em atendimento",
  "Finalizado",
  "Novo",
  "Recusado",
  "Devolvido",
];

const Details = ({ data, updateData }: DetailsProps) => {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState(data.status || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedStatus) {
      toast.error("Selecione um status para continuar");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Atualizando processo...");
    console.log(selectedStatus);

    try {
      const result = await updateData(data.protocol, selectedStatus);

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success("Processo atualizado com sucesso!", { id: toastId });
      router.push("/secretaria/process");
    } catch (error: any) {
      console.error("Erro ao atualizar processo:", error);
      toast.error(error.message || "Ocorreu um erro ao atualizar o processo", {
        id: toastId,
        description: error.details || "Erro na Descrição",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-4 w-3/4 mx-auto" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center">Detalhes do Processo</h1>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Label htmlFor="protocol">Número do Protocolo</Label>
            <Input
              id="protocol"
              placeholder={data.protocol}
              readOnly
              className="border-gray-300 bg-gray-100 text-gray-900"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              className="w-full p-2 border-2 border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              required
              disabled={isSubmitting}
            >
              <option value="">Selecione um status</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="description">Descrição</Label>
            <textarea
              id="description"
              placeholder={data.description || "Nenhuma descrição fornecida"}
              readOnly
              className="h-24 w-full border-2 border-gray-300 p-2 bg-gray-100 text-gray-900 resize-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 my-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/secretaria/process")}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          type="submit"
          disabled={isSubmitting || !selectedStatus}
        >
          {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </form>
  );
};

export default Details;
