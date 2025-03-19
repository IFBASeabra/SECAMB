import { FormMessage, Message } from "@/components/form-message";
import ProcessForm from "./NewProcess";
import { processAction } from "@/app/actions/process";

export default async function Process(props: {
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
    <ProcessForm searchParams={searchParams} processAction={processAction} />
  );
}
