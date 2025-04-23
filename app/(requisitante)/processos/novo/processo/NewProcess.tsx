"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ProcessActionState } from "@/app/actions/process";
import { processFormSchema } from "@/schemas/process";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

type ProcessFormType = {
  enterpriseID: string
  processType: string
  processAction: (formData: FormData) => Promise<ProcessActionState>;
};

const ProcessForm = ({ processAction }: ProcessFormType) => {
  const searchParams = useSearchParams();
  const enterpriseID = searchParams.get("enterpriseID") || "";
  const enterpriseName = searchParams.get("enterpriseName") || "";
  const processTypeID = searchParams.get("processTypeID") || "";
  const processTypeName = searchParams.get("processTypeName") || "";

  const numberProcess = searchParams.get("numberProcess") || "";

  const form = useForm<z.output<typeof processFormSchema>>({
    resolver: zodResolver(processFormSchema),
    defaultValues: {
      protocol: numberProcess,
      description: "",
      type: processTypeName,
      enterprise: enterpriseName,
    },
  });

  const registerProcess = async (data: z.output<typeof processFormSchema>) => {
    const formData = new FormData();
    console.log("form.formState.errors: ", form.formState.errors);

    formData.append("protocol", data.protocol);
    formData.append("description", data.description);
    formData.append("type", processTypeID);
    formData.append("enterprise", enterpriseID);

    await processAction(formData);
    NextResponse.redirect(new URL('/processos'))
  };

  return (
    <form
      className="flex flex-col gap-4 w-3/4 mx-auto"
      onSubmit={form.handleSubmit(registerProcess)}
    >
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center">Processos</h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Label htmlFor="protocol">Número do Processo</Label>
            <Input
              {...form.register("protocol")}
              name="protocol"
              className="border-gray-300 bg-gray-300 text-gray-950"
              placeholder={numberProcess}
              required
              readOnly
            />
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="type">Tipo de Processo</Label>
            <div className="input-wrapper">
              <Input
                {...form.register("type")}
                name="type"
                required
                readOnly
                className="border-gray-300 bg-gray-300 text-gray-950"
              />
            </div>
            {form.formState.errors.type && (
              <p className="form-error">{form.formState.errors.type.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="description">Descrição</Label>
            <textarea
              {...form.register("description")}
              name="description"
              className="h-24 w-full border-2 border-gray-300 p-2 resize-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descreva sobre o processo"
              required
            />
          </div>
          <div className="register__form__blocodois">
          <div className="flex flex-col gap-3">
            <Label htmlFor="enterprise">Empresa</Label>
            <div className="input-wrapper">
              <Input
                {...form.register("enterprise")}
                name="enterprise"
                className="border-gray-300 bg-gray-300 text-gray-950"
                required
                readOnly
              />
            </div>
          </div>

          
            <Button type="submit" className="mt-6 bg-blue-400" >
              Cadastrar
            </Button>
     
        </div>
        </div>

       
      </div>
    </form>
  );
};

export default ProcessForm;
