"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ProcessActionState } from "@/app/actions/process";
import { processFormSchema } from "@/schemas/process";

import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import "../../empreendimentos/novo/enterprise.scss";

import { House, MapPinHouse } from "lucide-react";

type ProcessFormType = {
  searchParams: Message;
  processAction: (formData: FormData) => Promise<ProcessActionState>;
};

const ProcessForm = ({ searchParams, processAction }: ProcessFormType) => {
  const form = useForm<z.output<typeof processFormSchema>>({
    resolver: zodResolver(processFormSchema),
  });

  const [telephone, setTelephone] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [zipCode, setZipCode] = useState("");

  const registerEmpreendimento = async (
    data: z.output<typeof processFormSchema>
  ) => {
    const formData = new FormData();
    console.log("form.formState.errors: ", form.formState.errors);

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("protocol", data.protocol);
    formData.append("type", data.type);

    await processAction(formData);
  };

  return (
    <form
      className="register"
      onSubmit={form.handleSubmit(registerEmpreendimento)}
    >
      <h1 className="register__title">Processos</h1> <hr />
      <div className="register__form">
        <div className="register__form__blocoum">
          <div className="register__form-group">
            <Label htmlFor="name"> Nome do Processo </Label>
            <Input
              {...form.register("name")}
              name="name"
              placeholder="Nome do Processo"
              required
            />

            {form.formState.errors.name && (
              <p className="form-error">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="register__form-group">
            <Label htmlFor="description">Descrição</Label>
            <Input
              {...form.register("description")}
              name="description"
              placeholder=""
              required
              maxLength={18}
            />

            {form.formState.errors.description && (
              <p className="form-error">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div className="register__form-group">
            <Label htmlFor="protocol">protocolo</Label>
            <div className="input-wrapper">
              <House className="lucide-icon" />
              <Input
                {...form.register("protocol")}
                name="protocol"
                placeholder="protocolo"
                required
              />
            </div>

            {form.formState.errors.protocol && (
              <p className="form-error">
                {form.formState.errors.protocol.message}
              </p>
            )}
          </div>
        </div>

        <div className="register__form__blocodois">
          <div className="register__form-group">
            <Label htmlFor="type">Type</Label>
            <div className="input-wrapper">
              <MapPinHouse className="lucide-icon" />
              <Input
                {...form.register("type")}
                name="type"
                placeholder="type"
                required
              />
            </div>
            {form.formState.errors.type && (
              <p className="form-error">{form.formState.errors.type.message}</p>
            )}
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

export default ProcessForm;
