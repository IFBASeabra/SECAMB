import { Message } from "@/components/form-message";
import ProcessForm from "./NewProcess";
import { processAction } from "@/app/actions/process";


export default async function Process(props: {
  searchParams: Promise<{enterpriseID: string, processType: string}>;
}) {
  const searchParams = await props.searchParams;

  console.log('searchParams: ', searchParams)

  return(
    <ProcessForm 
        enterpriseID={searchParams.enterpriseID}
        processType={searchParams.processType}
        processAction={processAction}
    />
  )
}
