"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { processFormSchema } from "@/schemas/process";

export interface ProcessActionState {
  form?: {
    protocol: string;
    description: string;
    type: string;
    enterprise: string;
  };
  errors?: {
    protocol?: string[];
    description?: string[];
    enterprise?: string[];
    type?: string[];
  };
}

export const processAction = async (formData: FormData): Promise<ProcessActionState> => {
  const form = Object.fromEntries(formData);
  const validationResult = processFormSchema.safeParse(form);

  if (!validationResult.success) {
    return {
      form,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  // Dados do formulário
  const protocol = formData.get("protocol")!.toString();
  const description = formData.get("description")!.toString();
  const type = formData.get("type")!.toString();
  const enterprise = formData.get("enterprise")!.toString();

  // Obtenção do usuário autenticado
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Erro ao obter usuário: ", userError);
    return encodedRedirect("error", "/processos/novo", "Erro ao obter usuário");
  }

  if (!user) {
    return encodedRedirect("error", "/sign-in", "Usuário não autenticado");
  }

  // Inserção na tabela process
  const { data, error } = await supabase
    .from("process")
    .insert({
      id_user: user.id,
      protocol,
      description,
      type,
      enterprise,
    })
    .select()
    .single();

  console.log("data: ", data);

  if (error) {
    console.error("Erro ao inserir processo: ", error);
    return encodedRedirect("error", "/processos/novo", error.message);
  }

  // Se o processo foi inserido corretamente, redireciona
  return encodedRedirect(
    "success",
    "/processos/novo",
    "Processo cadastrado com sucesso!"
  );
};
