'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from 'next/navigation'

const StepOne = ({enterprises, processList}) => {
  const router = useRouter();


  const handleNextStep = (event) => {
    event.preventDefault();
    const processType =JSON.parse(event.target[0].value)
    const enterprise = JSON.parse(event.target[1].value)


    const processTypeID = processType.id
    const processTypeName = processType.name

    
    //Dados da Empresa
    const enterpriseID = enterprise.id
    const enterpriseName = enterprise.name
 

    // Número de processo
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth()
    const day = currentDate.getDay();
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes()
    const second = currentDate.getSeconds();

    const numberProcess = `${year}${month}${day}${hour}${minute}${second}`

    //colocando na URL
    router.push(`novo/processo?processTypeID=${processTypeID}&processTypeName=${processTypeName}&enterpriseID=${enterpriseID}&enterpriseName=${enterpriseName}&numberProcess=${numberProcess}`)
  }

  return  (
    <form className="flex flex-col gap-4 w-3/4 mx-auto" onSubmit={handleNextStep}>
    <div className="flex flex-col gap-4">
      <h2 className="text-1xl font-bold">Tipo de Processo: </h2>
      <div className="inline-block relative w-full">
        <select 
            required 
            defaultValue={undefined}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option value={undefined} disabled>Selecione um Tipo de processo</option>
          {
            processList.map((process) => (
              <option value={JSON.stringify({ id: process.id, name: process.name })} key={process.id}>{process.name}</option>
            ))
          }
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <h2 className="text-1xl font-bold">Selecione um Empreendimento: </h2>
      <div className="inline-block relative w-full">

        <select 
            required 
            defaultValue={undefined}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option value={undefined} disabled>Selecione um Empreendimento</option>
          {
            enterprises.map(({ enterprise }) => (
              <option value={JSON.stringify({ id: enterprise.id, name: enterprise.name })}
              key={enterprise.id}>{enterprise.name}</option>
            ))
          }
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
        </div>
      </div>
    </div>
    <div className="my-2">
      <Button className="flex gap-2">
        Avançar <ArrowRight size={16} />
      </Button>
    </div>
  </form>

  )
}

export default StepOne