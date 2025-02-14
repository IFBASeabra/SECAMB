"use client"

import { FormMessage, Message } from '@/components/form-message'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React, { useState } from 'react'

import "./sign-up.scss"
import { Target } from 'lucide-react'

type SignUpFormType = {
  searchParams: Message
  signUpAction: (formData: FormData) => Promise<never>
}

const SignUpForm = ({searchParams, signUpAction}: SignUpFormType) => {
  const [registerType, setRegisterType] = useState('pessoa_fisica')

  return (
    <form className="register">
        <h1 className="register__title">Cadastre-se</h1>
        <p className="register__sign-in">
          Já tem uma conta?{" "}
          <Link className="register__link" href="/sign-in">
            Entrar
          </Link>
        </p>
        <div className="register__form">
          <div className="register__form-group">
            <Label htmlFor="register_type">Tipo de Registro: </Label>
            <label className="register__radio" htmlFor="pessoa_fisica">
              <input  
                name="register_type" 
                type="radio" 
                value="pessoa_fisica" 
                required id="pessoa_fisica"
                checked={registerType === "pessoa_fisica"}
                onChange={({target})=> {setRegisterType(target.value)}}
              />
              Pessoa Física
            </label>
            <label className="register__radio" htmlFor="pessoa_juridica">
              <input 
                name="register_type" 
                type="radio" 
                value="pessoa_juridica" 
                required 
                id="pessoa_juridica"
                checked={registerType === "pessoa_juridica"}
                onChange={({target})=> {setRegisterType(target.value)}}
              />
              Pessoa Jurídica
            </label>
          </div>
          <div className="register__form-group">
            <Label htmlFor="name">
              {
                registerType === "pessoa_juridica" ? "Razão Social" : "Nome"
              }
            </Label>
            <Input name="name" placeholder={registerType === "pessoa_juridica" ? "Casas Bahia" : "José dos Santos"} required />
          </div>


          <div className="register_form-group">
            <Label htmlFor='register-type'>
              {
                registerType === "pessoa_juridica" ? "CNPJ"  : "CPF"
              }
            </Label>
            <Input
             name="document"
             placeholder={registerType === "pessoa_juridica" ? "00.000.000/0001-00" : "000.000.000-00"} 
             type='text'
             required
            />
          </div>


          <div className="register__form-group">
            <Label htmlFor="email">E-mail</Label>
            <Input name="email" placeholder="jose@email.com" required />
          </div>


          <div className="register__form-group">
            <Label htmlFor="address">Endereço</Label>
            <Input name="address" placeholder="Rua Horáco de Matos" required />
          </div>


          <div className="register__form-group">
            <Label htmlFor="neighborhood">Bairro</Label>
            <Input name="neighborhood" placeholder="Bloco" required />
          </div>


          
          <div className="register__form-group">
            <Label htmlFor="zipcode">CEP</Label>
            <Input name="zipcode" placeholder="xxxxx-xxx" required />
          </div>



          <div className="register__form-group">
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              minLength={6}
              required
            />
          </div>
          <SubmitButton 
            formAction={signUpAction} 
            pendingText="Signing up..." 
            className="register__submit"
          >
            Cadastrar
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
  )
}

export default SignUpForm