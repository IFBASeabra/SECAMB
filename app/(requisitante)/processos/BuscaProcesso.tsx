'use client';

import React, { useState } from 'react';
import { buscarProcesso } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { ProcessType } from '@/types/processos';
import { Status } from '@/types/typings';
import StatusBadge from '@/components/ui/StatusBadge';

const searchSchema = z.object({
  protocol: z.string().min(1, { message: 'Digite um número de protocolo' }),
});

const BuscaProcesso = () => {
  const [process, setProcess] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
  });

  const searchByProtocol = async (data: z.infer<typeof searchSchema>) => {
    try {
      const { data: processData, error } = await buscarProcesso(data.protocol);

      if (error || !processData) {
        setError('Nenhum processo foi encontrado.');
        setProcess(null);
      } else {
        setProcess(processData);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message);
      setProcess(null);
    }
  };

  return (
    <div className="flex flex-col items-start w-2/3 mx-auto p-4 gap-4">
      <form
        className="flex flex-col md:flex-row w-full items-center gap-4"
        onSubmit={form.handleSubmit(searchByProtocol)}
      >
        <div className="flex flex-col w-full gap-1">
          <Input
            {...form.register('protocol')}
            type="text"
            className="w-full h-9"
            placeholder="Digite o número do protocolo"
            required
          />
          {form.formState.errors.protocol && (
            <p className="form-error">
              {form.formState.errors.protocol.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 h-9 border-opacity-100 border px-3 rounded bg-blue-500 text-white focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Search size={16} />
          Buscar
        </button>
      </form>

      {error && <p className="form-error">{error}</p>}

      {process && (
        <div className="flex flex-col gap-2 w-full text-left py-3 border rounded-md p-4 shadow-sm">
          <strong className="text-md text-center">Processo encontrado:</strong>
          <p className="text-sm">
            <strong>Empresa: </strong>
            {process.enterprise?.name || 'Não informado'}
          </p>
          <p className="text-sm">
            <strong>Tipo de Processo: </strong>
            {process.process_types?.name || 'Não informado'}
          </p>
          <p className="text-sm">
            <strong>Protocolo: </strong>
            {process.protocol}
          </p>
          <p className="text-sm">
            <strong>Status: </strong>
            <StatusBadge status={process.status} />
          </p>
        </div>
      )}
    </div>
  );
};

export default BuscaProcesso;
