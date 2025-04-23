'use client';

import React, { useState } from 'react';
import { addEnterpriseToUser, buscarEmpreendimento } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { cnpjMask, validateCNPJ } from '@/utils/utils';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilePlus2, Search } from 'lucide-react';
import { EnterpriseType } from '@/types/enterprise';
import { PostgrestError } from '@supabase/supabase-js';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import TermsAndConditions from '@/components/termsAndConditions';
import { CustomInsertResult } from '@/types/typings';

const searchSchema = z.object({
  cnpj: z.string().length(18, {
    message: 'CNPJ inválido. Confira os dados e tente novamente',
  }),
  // .superRefine((cnpj, ctx) => {
  //   if (!validateCNPJ(cnpj)) {
  //     ctx.addIssue({
  //       code: "custom",
  //       message: "CNPJ inválido.",
  //     });
  //   }
  // })
});

const BuscaEmpreendimento = () => {
  const [empresa, setEmpresa] = useState<undefined | { id: any; name: any; cnpj: any; }>(undefined);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const form = useForm<z.output<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
  });

  const searchByCNPJ = async (data: z.output<typeof searchSchema>) => {
    console.log('buscando por: ', data.cnpj);

    try {
      const { data: enterpriseData, error } = await buscarEmpreendimento(
        data.cnpj,
      );

      if (error) {
        console.error(error);
        setError(error.message);
        setEmpresa(undefined);
      } else {
        setEmpresa(enterpriseData);
      }
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    }
  };

  const addEnterpriseToList = async () => {
    const result: CustomInsertResult = await addEnterpriseToUser(empresa!.id);

    result.status === 'SUCCESS'
      ? toast.success(result.details)
      : toast.error(result.details);
  };

  const agree = watch('agree');

  console.log('empresa: ', empresa);

  return (
    <>
      <div className="flex flex-col items-start w-2/3 mx-auto p-4 gap-4">
        <form
          className="flex  flex-col md:flex-row w-full items-center gap-4  "
          onSubmit={form.handleSubmit(searchByCNPJ)}
        >
          <div className="flex flex-col w-full gap-1">
            <Input
              {...form.register('cnpj')}
              type="text"
              className="w-full h-9"
              placeholder="Digite o CNPJ do Empreendimento"
              required
              mask={cnpjMask}
              maxLength={18}
            />

            {form.formState.errors.cnpj && (
              <p className="form-error">{form.formState.errors.cnpj.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 h-9 border-opacity-100 border px-3 rounded bg-blue-500 text-white focus-visible:ring-ring focus-visible:ring-offset-2 md-w-auto "
          >
            <Search size={16} />
            Buscar
          </button>
        </form>
        {empresa !== undefined && (
          <>
            {empresa ? (
              <div className="flex flex-col gap-2 w-full text-left py-3">
                <strong className="text-md text-center">
                  Empresa encontrada:
                </strong>
                <p className="text-sm">
                  <strong>Empresa: </strong>
                  {empresa.name}
                </p>
                <p className="text-sm">
                  <strong>CNPJ: </strong>
                  {empresa.cnpj}
                </p>

                <Dialog>
                  <DialogTrigger className="w-max mx-auto" asChild>
                    <Button
                      variant="outline"
                      className="bg-green-400 text-white flex items-center justify-center gap-2 w-max p-2"
                    >
                      <FilePlus2 size={14} /> Adicionar à minha lista
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar empresa à minha lista</DialogTitle>
                      <ScrollArea className="h-72 w-full rounded-md border p-4">
                        <TermsAndConditions />
                      </ScrollArea>
                      <form
                        onSubmit={handleSubmit(addEnterpriseToList)}
                        className="space-y-4"
                      >
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...register('agree', {
                              required:
                                'Você precisa confirmar que leu os termos antes de continuar.',
                            })}
                            className="h-4 w-4"
                          />
                          <span>
                            Confirmo que li e estou de acordo com os termos
                            apresentados acima.
                          </span>
                        </label>
                        <>
                          {errors?.agree?.message &&
                            typeof errors.agree.message === 'string' && (
                              <p className="text-red-500 text-sm">
                                {errors.agree.message}
                              </p>
                            )}
                        </>
                        <button
                          type="submit"
                          className="flex items-center gap-2 mx-auto bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
                          disabled={!agree}
                        >
                          <FilePlus2 size={14} /> Adicionar à minha lista
                        </button>
                      </form>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="p-4 mx-auto">
                <p className="form-error">
                  Nenhuma empresa foi encontrada para o CNPJ informado.{' '}
                  <Link
                    href="/empreendimentos/novo"
                    className="text-blue-600 font-medium"
                  >
                    Clique aqui
                  </Link>{' '}
                  para cadastrar um novo empreendimento{' '}
                </p>
              </div>
            )}
          </>
        )}
        {error && <p className="form-error">{error}</p>}
      </div>
    </>
  );
};

export default BuscaEmpreendimento;
