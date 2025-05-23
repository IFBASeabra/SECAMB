'use server';

import { encodedRedirect } from '@/utils/utils';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message);
  }

  return redirect('/');
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get('email')?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get('origin');
  const callbackUrl = formData.get('callbackUrl')?.toString();

  if (!email) {
    return encodedRedirect('error', '/forgot-password', 'Email is required');
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      'error',
      '/forgot-password',
      'Could not reset password',
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    'success',
    '/forgot-password',
    'Check your email for a link to reset your password.',
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password and confirm password are required',
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Passwords do not match',
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      'error',
      '/protected/reset-password',
      'Password update failed',
    );
  }

  encodedRedirect('success', '/protected/reset-password', 'Password updated');
};

export async function buscarProcesso(protocol: string) {
  const supabase = await createClient();

  // Buscar o usuário que ta logado
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return { data: null, error: 'Usuário não autenticado' };
  }

  // Buscar o processo, por protocolo e o id_user
  const { data, error } = await supabase
    .from('process')
    .select(
      `
      id,
      protocol,
      status,
      process_types ( name ),
      enterprise ( name )
    `,
    )
    .eq('protocol', protocol)
    .eq('id_user', user.id) // << Filtro de segurança aqui
    .single();

  return { data, error };
}

export const buscarEmpreendimentoUser = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return {
      data: [],
      error: userError || { message: 'Usuário não autenticado' },
    };
  }

  const { data: userEnterprises, error: userEnterpriseError } = await supabase
    .from('user_enterprise')
    .select('id_enterprise')
    .eq('id_user', user.id);

  if (userEnterpriseError || !userEnterprises) {
    return {
      data: [],
      error: userEnterpriseError || {
        message: 'Erro ao buscar vínculos de empresa',
      },
    };
  }

  const enterpriseIds = userEnterprises.map((e) => e.id_enterprise);

  const { data, error } = await supabase
    .from('enterprise')
    .select('id, name, cnpj')
    .in('id', enterpriseIds);

  if (error) return { data: null, error };

  return { data };
};

export const buscarEmpreendimento = async (cnpj: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('enterprise')
    .select('id, name, cnpj')
    .eq('cnpj', cnpj)
    .single();

  console.log('data: ', data);

  if (error) return { data: null, error };

  return { data };
};

export const addEnterpriseToUser = async (enterpriseId: number) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log('user: ', user);
  console.log('enterpriseId: ', enterpriseId);

  if (!user)
    return {
      status: 'FAILED',
      code: 500,
      details: 'Usuário não encontrado',
    };

  const id_enterprise = enterpriseId;
  const id_user = user!.id;

  const { data } = await supabase
    .from('user_enterprise')
    .select()
    .eq('id_user', id_user)
    .eq('id_enterprise', id_enterprise);

  if (data?.length && data.length > 0) {
    return {
      status: 'FAILED',
      code: 400,
      details: 'Usuário já possui a empresa na lista',
    };
  }

  const { error } = await supabase
    .from('user_enterprise')
    .insert({ id_user, id_enterprise });

  if (error) {
    console.error(error.code + ' ' + error.message);
    return {
      status: 'FAILED',
      code: error.code,
      details: error.message,
    };
  } else {
    return {
      status: 'SUCCESS',
      code: 200,
      details: 'Empresa adicionada à lista do usuário',
    };
  }
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect('/sign-in');
};
