"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { enterpriseFormSchema } from "@/schemas/enterprise";

export interface EnterpriseActionState {
  form?: {
    name?: string
    cnpj?: string
    activity_type?: string
    address?: string
    neighborhood?: string
    zipcode?: string
    telephone_contact?: string
    cellphone_contact?: string
    email?: string
    uc?: string
    river_basin?: string
    water_resource?: string
    geographic_coordinates?: string
    operation_phase?: string
  },
  errors?: {
    name?: string[]
    cnpj?: string[]
    activity_type?: string[]
    address?: string[]
    neighborhood?: string[]
    zipcode?: string[]
    telephone_contact?: string[]
    cellphone_contact?: string[]
    email?: string[]
    uc?: string[]
    river_basin?: string[]
    water_resource?: string[]
    geographic_coordinates?: string[]
    operation_phase?: string[]
  }
}

export const enterpriseAction = async (formData: FormData) => {
  const form = Object.fromEntries(formData)
  const validationResult = enterpriseFormSchema.safeParse(form)
  if (!validationResult.success) {
    return {
      form,
      errors: validationResult.error.flatten().fieldErrors
    }
  }


  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  console.log('DADOS DO FORMULÁRIO', formData)


    const name = formData.get("name")!.toString();
    const cnpj = formData.get("cnpj")!.toString();
    const activity_type = formData.get("activity_type")!.toString();
    const address = formData.get("address")!.toString();
    const neighborhood = formData.get("neighborhood")!.toString();
    const zipcode = formData.get("zipcode")!.toString();
    const telephone_contact = formData.get("telephone_contact")!.toString();
    const cellphone_contact = formData.get("cellphone_contact")!.toString();
    const email = formData.get("email")!.toString();
    const uc = formData.get("uc")!.toString();
    const river_basin = formData.get("river_basin")!.toString();
    const water_resource = formData.get("water_resource")!.toString();
    const geographic_coordinates = formData.get("geographic_coordinates")!.toString();
    const operation_phase = formData.get("operation_phase")!.toString();

    const { error } = await supabase
    .from('enterprise')
    .insert({ name, cnpj, activity_type, address, neighborhood, zipcode, telephone_contact, cellphone_contact, email, uc, river_basin, water_resource, geographic_coordinates, operation_phase})

    if (error) {
      console.error(error.code + " " + error.message);
      return encodedRedirect("error", "/enterprise", error.message);
    } else {
      return encodedRedirect(
        "success",
        "/enterprise",
        "Empreendimento cadastrado com sucesso!",
      );
    }
  }