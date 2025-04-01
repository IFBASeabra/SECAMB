import { FormMessage, Message } from "@/components/form-message";
import { Button } from "@/components/ui/button";
// import ProcessForm from "./NewProcess";
// import { processAction } from "@/app/actions/process";
import { createClient } from "@/utils/supabase/server";
import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import StepOne from "./StepOne";
import ErrorMessage from "@/components/ui/error";

export default async function Process(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  const supabase = await createClient();
  const cookieStore = await cookies();


  const userCookie = cookieStore.get('user')?.value;
  const userInfo = userCookie ? JSON.parse(userCookie) : null;

  const userId = userInfo?.id

  console.log('userInfo: ', userInfo)
  console.log('userId: ', userId)

  if (!userId) {
    return redirect('/processos/novo?message=usuário não encontrado')
  }

  console.log('userID: ', userId)

  const { data: enterprises } = await supabase.from('user_enterprise').select('enterprise(id, name)').eq('id_user', userId)
  const { data: processList } = await supabase.from('process_types').select('id, name')

  console.log('empresas: ', enterprises)
  console.log('processList: ', processList)

  if ("message" in searchParams) {
    return (
      <div className="w-full text-center">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return ((enterprises && enterprises.length > 0) && (processList && processList.length > 0)) ? (
    <StepOne processList={processList} enterprises={enterprises}/>
  ) : (
    <ErrorMessage>Para criar um processo, você precisa ter um empreendimento cadastrado</ErrorMessage>
  );
}
