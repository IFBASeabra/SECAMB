"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { signUpFormSchema } from "@/schemas/signUp";

export interface SignUpActionState {
  form?: {
    email?: string
    password?: string
    password_validation?: string
    register_type?: string
    document?: string
    address?: string
    neighborhood?: string
    zipcode?: string
  },
  errors?: {
    email?: string[]
    password?: string[]
    password_validation?: string[]
    register_type?: string[]
    document?: string[]
    address?: string[]
    neighborhood?: string[]
    zipcode?: string[]
  }
}

export const signUpAction = async (formData: FormData) => {
  const form = Object.fromEntries(formData)
  const validationResult = signUpFormSchema.safeParse(form)
  if (!validationResult.success) {
    return {
      form,
      errors: validationResult.error.flatten().fieldErrors
    }
  }

  const email = formData.get("email")!.toString();
  const password = formData.get("password")!.toString();

  const supabase = await createClient();
  const origin = (await headers()).get("origin");


  console.log('DADOS DO FORMULÁRIO', formData)

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if ( data?.user?.id) {
    const user_id = data.user.id
    const register_type = formData.get('register_type')!.toString()
    const name = formData.get('name')!.toString()
    const document = formData.get('document')!.toString()
    const address = formData.get('address')!.toString()
    const neighborhood = formData.get('neighborhood')!.toString()
    const zipcode = formData.get('zipcode')!.toString()

    const { error } = await supabase
    .from('user_info')
    .insert({ name,register_type, user_id, document, address, neighborhood, zipcode  })

    if (error) {
      console.error(error.code + " " + error.message);
      return encodedRedirect("error", "/sign-up", error.message);
    } else {
      return encodedRedirect(
        "success",
        "/sign-up",
        "Thanks for signing up! Please check your email for a verification link.",
      );
    }
  }

  console.log('data do auth: ', data)

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};
