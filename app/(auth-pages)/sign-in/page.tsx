import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
          Secretaria Municipal de Desenvolvimento,Turismo e Meio Ambiente
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
                  width={80}
                  height={80}
                />
              </span>
              <h4 className="sign-title">Olá! Bem-vindo</h4>
            </div>
          </div>

          <div className="form__login-authentication">
            <div className="authentication-emails">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input name="email" placeholder="you@example.com" required />
              </div>
            </div>

            <div className="authentication-passwords">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  required
                />
                <Link className="passwords-forgot" href="/forgot-password">
                  Forgot Password?
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
              <p className="text-sm text-foreground">
                Don't have an account?{" "}
                <Link className="links" href="/sign-up">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
