'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { EnterpriseActionState } from '@/app/actions/enterprise';
import { enterpriseFormSchema } from '@/schemas/enterprise';

import { FormMessage, Message } from '@/components/form-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mascara de input
import {
  cnpjMask,
  zipCodeMask,
  telephoneMask,
  cellphoneMask,
} from '@/utils/utils';

// Ícones
import {
  House,
  MapPinHouse,
  MapPinned,
  Mail,
  Building2,
  FileSearch,
  UserRoundPen,
  Phone,
  Headset,
  Waves,
  Droplets,
} from 'lucide-react';

type EnterpriseFormType = {
  searchParams: Message;
  enterpriseAction: (formData: FormData) => Promise<EnterpriseActionState>;
};

const EnterpriseForm = ({
  searchParams,
  enterpriseAction,
}: EnterpriseFormType) => {
  const form = useForm<z.output<typeof enterpriseFormSchema>>({
    resolver: zodResolver(enterpriseFormSchema),
  });

  const registerEmpreendimento = async (
    data: z.output<typeof enterpriseFormSchema>,
  ) => {
    const formData = new FormData();
    console.log('form.formState.errors: ', form.formState.errors);

    formData.append('name', data.name);
    formData.append('cnpj', data.cnpj);
    formData.append('address', data.address);
    formData.append('neighborhood', data.neighborhood);
    formData.append('zipcode', data.zipcode);
    formData.append('contact_name', data.contact_name);
    formData.append('telephone', data.telephone ?? '');
    formData.append('cellphone', data.cellphone ?? '');
    formData.append('email', data.email);
    formData.append('river_basin', data.river_basin);
    formData.append('water_resource', data.water_resource);
    formData.append('operation_phase', data.operation_phase);

    await enterpriseAction(formData);
  };

  return (
    <form
      className="register p-6 bg-white rounded-lg shadow-lg"
      onSubmit={form.handleSubmit(registerEmpreendimento)}
    >
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Empreendimento
      </h1>
      <hr className="mb-6" />

      <div className=" w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="mb-2">
          <Label htmlFor="name">Nome</Label>
          <div className="relative">
            <Input
              {...form.register('name')}
              name="name"
              placeholder="Nome do Empreendimento"
              required
              Icon={<Building2 />}
            />
          </div>
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="mb-2">
          <Label htmlFor="cnpj">CNPJ</Label>
          <div className="relative">
            <Input
              {...form.register('cnpj')}
              name="cnpj"
              placeholder="00.000.000/0001-00"
              required
              mask={cnpjMask}
              maxLength={18}
              Icon={<FileSearch />}
            />
          </div>
          {form.formState.errors.cnpj && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.cnpj.message}
            </p>
          )}
        </div>

        <div className="mb-2">
          <div className="relative">
            <Input
              {...form.register('river_basin')}
              name="river_basin"
              placeholder="Bacia X"
              required
              Icon={<Droplets />}
              Label="Bacia Hidrográfica"
            />
          </div>
          {form.formState.errors.river_basin && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.river_basin.message}
            </p>
          )}
        </div>

        <div className="mb-2">
          <Label htmlFor="address">Endereço</Label>
          <div className="relative">
            <Input
              {...form.register('address')}
              name="address"
              placeholder="Rua Horáco de Matos"
              required
              Icon={<House />}
            />
          </div>
          {form.formState.errors.address && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.address.message}
            </p>
          )}
        </div>

        <div className="mb-2">
          <Label htmlFor="neighborhood">Bairro</Label>
          <div className="relative">
            <Input
              {...form.register('neighborhood')}
              name="neighborhood"
              placeholder="São José"
              required
              Icon={<MapPinHouse />}
            />
          </div>
          {form.formState.errors.neighborhood && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.neighborhood.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <Label htmlFor="zipcode">CEP</Label>
          <div className="relative">
            <Input
              {...form.register('zipcode')}
              name="zipcode"
              placeholder="46900-000"
              required
              mask={zipCodeMask}
              maxLength={9}
              Icon={<MapPinned />}
            />
          </div>
          {form.formState.errors.zipcode && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.zipcode.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-4 ">
        <div className=" w-full relative">
          <Input
            {...form.register('water_resource')}
            name="water_resource"
            placeholder="Rio Y"
            required
            Icon={<Waves />}
            Label="Recurso Hídrico"
            className="w-full"
          />
        </div>
        {form.formState.errors.water_resource && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.water_resource.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <Label htmlFor="operation_phase">Fase de Operação</Label>
        <select
          {...form.register('operation_phase')}
          name="operation_phase"
          className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Selecione uma opção</option>
          <option value="Localização">Localização</option>
          <option value="Instalação">Instalação</option>
          <option value="Operação">Operação</option>
          <option value="Não se Aplica">Não se Aplica</option>
        </select>
        {form.formState.errors.operation_phase && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.operation_phase.message}
          </p>
        )}
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Dados de Contato
      </h2>
      <div className="bg-gray-100 p-6 rounded-lg shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6  mb-6 w-full">
        <div className="mb-4 ">
          <div className="relative">
            <Input
              {...form.register('contact_name')}
              name="contact_name"
              placeholder="José dos Santos"
              required
              Icon={<UserRoundPen />}
              className="w-full"
              Label="Nome do Contato"
            />
          </div>
          {form.formState.errors.contact_name && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.contact_name.message}
            </p>
          )}
        </div>

        <div className="mb-4 w-full">
          <div className="relative">
            <Input
              {...form.register('telephone')}
              name="telephone"
              placeholder="(75) 9999-9999"
              mask={telephoneMask}
              maxLength={14}
              Icon={<Headset />}
              className="w-full"
              Label="Telefone"
            />
          </div>
          {form.formState.errors.telephone && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.telephone.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              {...form.register('cellphone')}
              name="cellphone"
              placeholder="(75) 99999-9999"
              required
              mask={cellphoneMask}
              maxLength={15}
              Icon={<Phone />}
              Label="Celular"
              className=""
            />
          </div>
          {form.formState.errors.cellphone && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.cellphone.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              {...form.register('email')}
              name="email"
              placeholder="jose@gmail.com"
              required
              Icon={<Mail />}
              Label="Email"
            />
          </div>
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        Cadastrar
      </button>

      <FormMessage message={searchParams} />
    </form>
  );
};

export default EnterpriseForm;
