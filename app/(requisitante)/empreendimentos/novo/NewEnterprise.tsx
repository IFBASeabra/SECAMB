'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { z } from 'zod';

import { EnterpriseActionState } from '@/app/actions/enterprise';
import { enterpriseFormSchema } from '@/schemas/enterprise';

import { FormMessage, Message } from '@/components/form-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import './enterprise.scss';

type EnterpriseFormType = {
  searchParams: Message;
  enterpriseAction: (formData: FormData) => Promise<EnterpriseActionState>;
};

const formatarTelefone = (value: string) => {
  const digits = value.replace(/\D/g, ''); // Remove caracteres não numéricos
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

const EnterpriseForm = ({
  searchParams,
  enterpriseAction,
}: EnterpriseFormType) => {
  const form = useForm<z.output<typeof enterpriseFormSchema>>({
    resolver: zodResolver(enterpriseFormSchema),
  });

  const [telephone, setTelephone] = useState('');
  const [cellphone, setCellphone] = useState('');

  const registerEmpreendimento = async (
    data: z.output<typeof enterpriseFormSchema>,
  ) => {
    const formData = new FormData();
    console.log('form.formState.errors: ', form.formState.errors);

    formData.append('name', data.name);
    formData.append('cnpj', data.cnpj);
    // formData.append('activity_type', data.activity_type)
    formData.append('address', data.address);
    formData.append('neighborhood', data.neighborhood);
    formData.append('zipcode', data.zipcode);
    formData.append('contact_name', data.contact_name);
    formData.append('telephone_contact', data.telephone_contact ?? '');
    formData.append('cellphone_contact', data.cellphone_contact ?? '');
    formData.append('email', data.email);
    //   formData.append('uc', data.uc)
    formData.append('river_basin', data.river_basin);
    formData.append('water_resource', data.water_resource);
    //  formData.append('geographic_coordinates', data.geographic_coordinates)
    formData.append('operation_phase', data.operation_phase);

    await enterpriseAction(formData);
  };

  return (
    <form
      className="register"
      onSubmit={form.handleSubmit(registerEmpreendimento)}
    >
      <h1 className="register__title">Empreendimento</h1>
      <div className="register__form">
        <div className="register__form__blocoum">
          <div className="register__form-group">
            <Label htmlFor="name">Nome do Empreendimento</Label>
            <Input
              {...form.register('name')}
              name="name"
              placeholder="Casas Bahia"
              required
            />
          </div>

          <div className="register__form-group">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              {...form.register('cnpj')}
              name="cnpj"
              placeholder="00.000.000/0001-00"
              required
            />

            {form.formState.errors.cnpj && (
              <p className="form-error">{form.formState.errors.cnpj.message}</p>
            )}
          </div>
        </div>

        <div className="register__form__blocodois">
          <div className="register__form-group">
            <Label htmlFor="address">Endereço</Label>
            <Input
              {...form.register('address')}
              name="address"
              placeholder="Rua Horáco de Matos"
              required
            />

            {form.formState.errors.address && (
              <p className="form-error">
                {form.formState.errors.address.message}
              </p>
            )}
          </div>

          <div className="register__form-group">
            <Label htmlFor="neighborhood">Bairro</Label>
            <Input
              {...form.register('neighborhood')}
              name="neighborhood"
              placeholder="São José"
              required
            />

            {form.formState.errors.neighborhood && (
              <p className="form-error">
                {form.formState.errors.neighborhood.message}
              </p>
            )}
          </div>

          <div className="register__form-group">
            <Label htmlFor="zipcode">CEP</Label>
            <Input
              {...form.register('zipcode')}
              name="zipcode"
              placeholder="46900-000"
              required
            />
            {form.formState.errors.zipcode && (
              <p className="form-error">
                {form.formState.errors.zipcode.message}
              </p>
            )}
          </div>
        </div>

        <div className="register__form__blocotres">
          <div className="register__form-group">
            <Label htmlFor="river_basin">Bacia Hidrográfica</Label>
            <Input
              {...form.register('river_basin')}
              name="river_basin"
              placeholder="Bacia X"
              required
            />
            {form.formState.errors.river_basin && (
              <p className="form-error">
                {form.formState.errors.river_basin.message}
              </p>
            )}
          </div>

          <div className="register__form-group">
            <Label htmlFor="water_resource">Recurso Hídrico</Label>
            <Input
              {...form.register('water_resource')}
              name="water_resource"
              placeholder="Rio Y"
              required
            />
            {form.formState.errors.water_resource && (
              <p className="form-error">
                {form.formState.errors.water_resource.message}
              </p>
            )}
          </div>
        </div>

        <div className="register__form__blocoquatro">
          <div className="register__form-group">
            <Label htmlFor="operation_phase" className="my-4 text-xl">
              Fase Atual do Empreendimento
            </Label>
            <select
              {...form.register('operation_phase')}
              name="operation_phase"
              className="register__select"
              required
            >
              <option value="" className="my-4 text-xl">
                Selecione uma opção
              </option>
              <option value="Localização">Localização</option>
              <option value="Instalação">Instalação</option>
              <option value="Operação">Operação</option>
              <option value="Não se Aplica">Não se Aplica</option>
            </select>
            {form.formState.errors.operation_phase && (
              <p className="form-error">
                {form.formState.errors.operation_phase.message}
              </p>
            )}
          </div>
        </div>

        <div className="register__form__blococinco">
          <div className="flex flex-col gap-8">
            <h2 className="my-4 text-xl">Dados de Contato</h2>

            <div className="register__form-group">
              <Label htmlFor="contact_name">Nome do contato</Label>
              <Input
                {...form.register('contact_name')}
                name="contact_name"
                placeholder="José dos Santos"
                required
              />
              {form.formState.errors.telephone_contact && (
                <p className="form-error">
                  {form.formState.errors.telephone_contact.message}
                </p>
              )}
            </div>
            <div className="register__form-group">
              <Label htmlFor="telephone_contact">Telefone</Label>
              <Input
                {...form.register('telephone_contact')}
                name="telephone_contact"
                placeholder="(75) 99999-9999"
                value={telephone}
                onChange={(e) => setTelephone(formatarTelefone(e.target.value))}
              />
              {form.formState.errors.telephone_contact && (
                <p className="form-error">
                  {form.formState.errors.telephone_contact.message}
                </p>
              )}
            </div>

            <div className="register__form-group">
              <Label htmlFor="cellphone_contact">Celular</Label>
              <Input
                {...form.register('cellphone_contact')}
                name="cellphone_contact"
                placeholder="(75) 99999-9999"
                value={cellphone}
                onChange={(e) => setCellphone(formatarTelefone(e.target.value))}
                required
              />
              {form.formState.errors.cellphone_contact && (
                <p className="form-error">
                  {form.formState.errors.cellphone_contact.message}
                </p>
              )}
            </div>

            <div className="register__form-group">
              <Label htmlFor="email">E-mail</Label>
              <Input
                {...form.register('email')}
                name="email"
                placeholder="jose@gmail.com"
                required
              />
              {form.formState.errors.email && (
                <p className="form-error">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <button type="submit" className="register__submit">
          Cadastrar
        </button>
      </div>
      <FormMessage message={searchParams} />
    </form>
  );
};

export default EnterpriseForm;
