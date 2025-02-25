import Image from "next/image";

export default async function AcessoNaoAutorizado(){
  return(
    <div className="flex justify-center">
      <Image 
      src={"/401.jpg"}
        width={400}
        height={400}
        alt="Acesso não autorizado"
      />
    </div>
  )
}