import { signUpAction } from "@/app/actions/signUp";
import { FormMessage, Message } from "@/components/form-message";
import SignUpForm from "./SignUpForm";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <SignUpForm searchParams={searchParams} signUpAction={signUpAction} />
    </>
  );
}
