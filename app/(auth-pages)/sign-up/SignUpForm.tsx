"use client";

import React, { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";

import { SignUpActionState } from "@/app/actions/signUp";
import { signUpFormSchema } from "@/schemas/signUp";

import { FormMessage, Message } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import "./sign-up.scss";

type SignUpFormType = {
  searchParams: Message;
  signUpAction: (formData: FormData) => Promise<SignUpActionState>;
};

const SignUpForm = ({ searchParams, signUpAction }: SignUpFormType) => {
  const form = useForm<z.output<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
  });

  console.log("form.formState.errors: ", form.formState.errors);

  const [registerType, setRegisterType] = useState("pessoa_fisica");

  const registerUser = async (data: z.output<typeof signUpFormSchema>) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("register_type", data.register_type);
    formData.append("document", data.document);
    formData.append("address", data.address);
    formData.append("neighborhood", data.neighborhood);
    formData.append("zipcode", data.zipcode);
    formData.append("password", data.password);
    formData.append("password_validation", data.password_validation);

    await signUpAction(formData);
  };

  return (
    <form className="register" onSubmit={form.handleSubmit(registerUser)}>
      <div className="register__banner">
        <Image src="/logo.png" alt="logo" width={60} height={100} />
        <h3 className="banner-h4"> SECAMB</h3>
      </div>
      <h4 className="register__title">Cadastre-se</h4>

      <div className="register__form">
        <div className="register__form-group">
          <Label htmlFor="register_type">Tipo de Registro: </Label>
          <div className="register__form-group-types">
            <label className="register__radio" htmlFor="pessoa_fisica">
              <input
                {...form.register("register_type")}
                name="register_type"
                type="radio"
                value="pessoa_fisica"
                required
                id="pessoa_fisica"
                checked={registerType === "pessoa_fisica"}
                onChange={({ target }) => {
                  setRegisterType(target.value);
                }}
              />
              Pessoa Física
            </label>
            <label className="register__radio" htmlFor="pessoa_juridica">
              <input
                {...form.register("register_type")}
                name="register_type"
                type="radio"
                value="pessoa_juridica"
                required
                id="pessoa_juridica"
                checked={registerType === "pessoa_juridica"}
                onChange={({ target }) => {
                  setRegisterType(target.value);
                }}
              />
              Pessoa Jurídica
            </label>
          </div>
        </div>
        <div className="register__form-group">
          <div className="register__form-group-type">
            <div className="register__form-group-type-ty">
              <Label htmlFor="name" className="labeis">
                {registerType === "pessoa_juridica" ? "Razão Social" : "Nome"}
              </Label>
              <Input
                {...form.register("name")}
                name="name"
                placeholder={
                  registerType === "pessoa_juridica"
                    ? "Nome da Empresa"
                    : "José dos Santos"
                }
                required
              />
              {form.formState.errors.name && (
                <p className="form-error">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div className="register__form-group-type-ty">
              <Label htmlFor="register-type" className="label">
                {registerType === "pessoa_juridica" ? "CNPJ" : "CPF"}
              </Label>
              <Input
                {...form.register("document")}
                name="document"
                placeholder={
                  registerType === "pessoa_juridica"
                    ? "00.000.000/0001-00"
                    : "000.000.000-00"
                }
                type="text"
                className="input"
                required
              />
              {form.formState.errors.document && (
                <p className="form-error">
                  {form.formState.errors.document.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="register__form-group">
          <Label htmlFor="email" className="label">
            E-mail
          </Label>
          <Input
            {...form.register("email")}
            name="email"
            placeholder="jose@email.com"
            required
          />
        </div>

        <div className="register__form-group">
          <Label htmlFor="address" className="label">
            Endereço
          </Label>
          <Input
            {...form.register("address")}
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
          <Label htmlFor="neighborhood" className="label">
            Bairro
          </Label>
          <Input
            {...form.register("neighborhood")}
            name="neighborhood"
            placeholder="Bloco"
            required
          />

          {form.formState.errors.neighborhood && (
            <p className="form-error">
              {form.formState.errors.neighborhood.message}
            </p>
          )}
        </div>

        <div className="register__form-group">
          <Label htmlFor="zipcode" className="label">
            CEP
          </Label>
          <Input
            {...form.register("zipcode")}
            name="zipcode"
            placeholder="xxxxx-xxx"
            required
          />
          {form.formState.errors.zipcode && (
            <p className="form-error">
              {form.formState.errors.zipcode.message}
            </p>
          )}
        </div>
        <div className="register__form-group">
          <Label htmlFor="password" className="label">
            Senha
          </Label>
          <Input
            {...form.register("password")}
            type="password"
            name="password"
            placeholder="Digite sua senha"
            minLength={6}
            required
          />
          {form.formState.errors.password && (
            <p className="form-error">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        <div className="register__form-group">
          <Label htmlFor="password" className="label">
            Senha
          </Label>
          <Input
            {...form.register("password_validation")}
            type="password"
            name="password_validation"
            placeholder="Digite sua senha novamente"
            minLength={6}
            required
          />
          {form.formState.errors.password_validation && (
            <p className="form-error">
              {form.formState.errors.password_validation.message}
            </p>
          )}
        </div>
        <button type="submit" className="register__submit">
          Cadastrar
        </button>
        <div className="register__signup">
          <p className="register__sign-in">
            Já tem uma conta?{" "}
            <Link className="register__signup-links" href="/sign-in">
              Entrar
            </Link>
          </p>
        </div>
      </div>
      <FormMessage message={searchParams} />
    </form>
  );
};

export default SignUpForm;
