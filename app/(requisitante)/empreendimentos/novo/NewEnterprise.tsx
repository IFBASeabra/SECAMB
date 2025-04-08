"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { EnterpriseActionState } from "@/app/actions/enterprise";
import { enterpriseFormSchema } from "@/schemas/enterprise";

import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import "./enterprise.scss";
import {
  cnpjMask,
  zipCodeMask,
  telephoneMask,
  cellphoneMask,
} from "@/utils/utils";

// Icones
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
} from "lucide-react";

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

  const [telephone, setTelephone] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [zipCode, setZipCode] = useState("");

  const registerEmpreendimento = async (
    data: z.output<typeof enterpriseFormSchema>
  ) => {
    const formData = new FormData();
    console.log("form.formState.errors: ", form.formState.errors);

    formData.append("name", data.name);
    formData.append("cnpj", data.cnpj);
    // formData.append('activity_type', data.activity_type)
    formData.append("address", data.address);
    formData.append("neighborhood", data.neighborhood);
    formData.append("zipcode", data.zipcode);
    formData.append("contact_name", data.contact_name);
    formData.append("telephone", data.telephone ?? "");
    formData.append("cellphone", data.cellphone ?? "");
    formData.append("email", data.email);
    //   formData.append('uc', data.uc)
    formData.append("river_basin", data.river_basin);
    formData.append("water_resource", data.water_resource);
    //  formData.append('geographic_coordinates', data.geographic_coordinates)
    formData.append("operation_phase", data.operation_phase);

    await enterpriseAction(formData);
  };

  return (
    <form
      className="register"
      onSubmit={form.handleSubmit(registerEmpreendimento)}
    >
      <h1 className="register__title">
        {" "}
        <strong>Empreendimento</strong>
      </h1>{" "}
      <hr />
      <div className="register__form">
        <div className="register__form__blocoum">
          <div className="register__form-group">
            <Label htmlFor="name"> Nome do Empreendimento </Label>
            <div className="input-wrapper">
              <Building2 className="lucide-icon" />
              <Input
                {...form.register("name")}
                name="name"
                placeholder="Casas Bahia"
                required
              />
            </div>

            {form.formState.errors.name && (
              <p className="form-error">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="register__form-group">
            <Label htmlFor="cnpj">CNPJ</Label>
            <div className="input-wrapper">
              <FileSearch className="lucide-icon" />
              <Input
                {...form.register("cnpj")}
                name="cnpj"
                placeholder="00.000.000/0001-00"
                required
                mask={cnpjMask}
                maxLength={18}
              />
            </div>

            {form.formState.errors.cnpj && (
              <p className="form-error">{form.formState.errors.cnpj.message}</p>
            )}
          </div>

          <div className="register__form-group">
            <div className="input-wrapper">
              <House className="lucide-iconum" />
              <Input
                {...form.register("address")}
                name="address"
                placeholder="Rua Horáco de Matos"
                required
                Label="Endereço"
              />
            </div>

            {form.formState.errors.address && (
              <p className="form-error">
                {form.formState.errors.address.message}
              </p>
            )}
          </div>
        </div>

        <div className="register__form__blocodois">
          <div className="register__form-group">
            <div className="input-wrapper">
              <MapPinHouse className="lucide-iconum" />
              <Input
                {...form.register("neighborhood")}
                name="neighborhood"
                placeholder="São José"
                required
                Label="Bairro"
              />
            </div>
            {form.formState.errors.neighborhood && (
              <p className="form-error">
                {form.formState.errors.neighborhood.message}
              </p>
            )}
          </div>

          <div className="register__form-group">
            <Label htmlFor="zipcode">CEP</Label>
            <div className="input-wrapper">
              <MapPinned className="lucide-icon" />
              <Input
                {...form.register("zipcode")}
                name="zipcode"
                placeholder="46900-000"
                required
                maxLength={9}
                mask={zipCodeMask}
              />
            </div>
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
            <div className="input-wrapper">
              <Droplets className="lucide-icon" />
              <Input
                {...form.register("river_basin")}
                name="river_basin"
                placeholder="Bacia X"
                required
              />
            </div>
            {form.formState.errors.river_basin && (
              <p className="form-error">
                {form.formState.errors.river_basin.message}
              </p>
            )}
          </div>

          <div className="register__form-group">
            <Label htmlFor="water_resource">Recurso Hídrico</Label>
            <div className="input-wrapper">
              <Waves className="lucide-icon" />
              <Input
                {...form.register("water_resource")}
                name="water_resource"
                placeholder="Rio Y"
                required
              />
            </div>
            {form.formState.errors.water_resource && (
              <p className="form-error">
                {form.formState.errors.water_resource.message}
              </p>
            )}
          </div>
        </div>
        <div className="register__form__blocoquatro">
          <div className="register__form-group">
            <Label
              htmlFor="operation_phase"
              className="my-4 text-xl font-size2rem"
            >
              <h2> Fase Atual do Empreendimento</h2>
            </Label>{" "}
            <hr />
            <select
              {...form.register("operation_phase")}
              name="operation_phase"
              className="register__select"
              required
            >
              <option value="" className="my-4 text-xl ">
                Selecione uma opção
              </option>
              <option value="Localização">Localização</option>
              <option value="Instalação">Instalação</option>
              <option value="Operação">Operação</option>
              <option value="Não se Aplica">Não se aplica</option>
            </select>
            {form.formState.errors.operation_phase && (
              <p className="form-error">
                {form.formState.errors.operation_phase.message}
              </p>
            )}
          </div>
        </div>
        <div className="register__form__blococinco">
          <div className="flex flex-col gap-5">
            <h2 className="my-3 text-xl">Dados de Contato</h2> <hr />
            <div className="register__form-group">
              <Label htmlFor="contact_name">Nome do contato</Label>
              <div className="input-wrapper">
                <UserRoundPen className="lucide-icon" />
                <Input
                  {...form.register("contact_name")}
                  name="contact_name"
                  placeholder="José dos Santos"
                  required
                />
              </div>
              {form.formState.errors.contact_name && (
                <p className="form-error">
                  {form.formState.errors.contact_name.message}
                </p>
              )}
            </div>
            <div className="register__form-group">
              <Label htmlFor="telephone">Telefone</Label>
              <div className="input-wrapper">
                <Headset className="lucide-icon" />
                <Input
                  {...form.register("telephone")}
                  name="telephone"
                  placeholder="(75) 9999-9999"
                  mask={telephoneMask}
                  maxLength={14}
                />
              </div>
              {form.formState.errors.telephone && (
                <p className="form-error">
                  {form.formState.errors.telephone.message}
                </p>
              )}
            </div>
            <div className="register__form-group">
              <Label htmlFor="cellphone">Celular</Label>
              <div className="input-wrapper">
                <Phone className="lucide-icon" />
                <Input
                  {...form.register("cellphone")}
                  name="cellphone"
                  placeholder="(75) 99999-9999"
                  required
                  mask={cellphoneMask}
                  maxLength={15}
                />
              </div>
              {form.formState.errors.cellphone && (
                <p className="form-error">
                  {form.formState.errors.cellphone.message}
                </p>
              )}
            </div>
            <div className="register__form-group">
              <Label htmlFor="email">E-mail</Label>
              <div className="input-wrapper">
                <Mail className="lucide-icon" />
                <Input
                  {...form.register("email")}
                  name="email"
                  placeholder="jose@gmail.com"
                  required
                />
              </div>
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
