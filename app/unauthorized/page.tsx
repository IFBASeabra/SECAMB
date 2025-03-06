import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function AcessoNaoAutorizado(){
  
  return(
    <div className="flex flex-col justify-center items-center h-screen gap-5">
      <Image 
      src={"/401.jpg"}
        width={400}
        height={400}
        alt="Acesso não autorizado"
      />
      <strong className="text-red-500">Se você está vendo essa mensagem, você não tem permissão para acessar essa URL</strong>

      <Button>
        <Link href="/">Voltar para a tela inicial</Link>
      </Button>
    </div>
  )
}