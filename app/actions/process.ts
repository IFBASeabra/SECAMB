"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { processFormSchema } from "@/schemas/process";

export interface ProcessActionState {
  form?: {
    name?: string;
    description: string;
    protocol: string;
    type: string;
  };
  errors?: {
    name?: string[];
    description?: string[];
    protocol?: string[];
    type?: string[];
  };
}

export const processAction = async (formData: FormData) => {
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
  const name = formData.get("name")!.toString();
  const description = formData.get("description")!.toString();
  const protocol = formData.get("protocol")!.toString();
  const type = formData.get("type")!.toString();

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
      name,
      description,
      protocol,
      type,
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
