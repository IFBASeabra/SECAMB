import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Mail, LockKeyhole } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import "./sign-in.scss";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <main className="container__signup">
      {/* Left Side */}
      <div className="container__signup-left-side">
        <h2 className="title">SECAMB</h2>
        <p className="subtitle">
          Secretaria Municipal de Desenvolvimento, Turismo e Meio Ambiente
        </p>
      </div>

      {/* Right Side */}
      <div className="container__signup-right-side">
        <form className="form__login">
          <div className="form__login-banner">
            <div className="logo-container">
              <span>
                <Image
                  src="/Logo.png"
                  className="logo"
                  alt="logo"
                  width={140}
                  height={140}
                />
              </span>
              <h4 className="sign-title">Olá! Bem-vindo</h4>
            </div>
          </div>

          <div className="form__login-authentication">
            {/* Campo de email */}
            <div className="authentication-emails">
              <div className="input-container">
                <Label htmlFor="email">Email</Label>
                <div className="input-with-icon">
                  <Mail className="input-icon" />
                  <Input name="email" placeholder="you@example.com" required />
                </div>
              </div>
            </div>

            {/* Campo de senha */}
            <div className="authentication-passwords">
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="input-with-icon">
                  <LockKeyhole className="input-icon" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    required
                  />
                </div>
                <Link className="passwords-forgot" href="/forgot-password">
                  Esqueci minha senha
                </Link>
              </div>
            </div>

            <div className="authentication-button">
              <SubmitButton
                pendingText="Signing In..."
                formAction={signInAction}
                className="button"
              >
                Sign in
              </SubmitButton>
            </div>
            <FormMessage message={searchParams} />

            <div className="form__login-signin">
              <p className="form_login-signin-p">
                Não possui conta?{" "}
                <Link className="links" href="/sign-up">
                  Cadastra-se
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
