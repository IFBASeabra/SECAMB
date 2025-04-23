"use server";

import { createClient } from "@/utils/supabase/server";

export const updateProcess = async (protocol: number, newData: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("process")
      .update({ status: newData })
      .match({ protocol: protocol });
  
    if (error) {
      console.error("Erro ao atualizar o processo:", error);
      return { success: false, error: error.message };
    }
  
    return { success: true, data };
  };
  