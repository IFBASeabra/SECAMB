import { enterpriseAction } from "@/app/actions/enterprise";
import { FormMessage, Message } from "@/components/form-message";
import EnterpriseForm from "./Enterprise";

export default async function Enterprise(props: {
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
      <EnterpriseForm searchParams={searchParams} enterpriseAction={enterpriseAction} />
    </>
  );
}