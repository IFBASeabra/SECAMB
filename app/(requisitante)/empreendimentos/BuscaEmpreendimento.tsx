'use client'

import React, { useState } from 'react'
import { buscarEmpreendimento } from '@/app/actions'
import { Input } from '@/components/ui/input'

const BuscaEmpreendimento = () => {
  const [cnpj, setCnpj] = useState('')

  const handleSearch = () => {
    const data = buscarEmpreendimento(cnpj)
  }

  return (
    <div className="flex flex-col items-start w-2/3 mx-auto p-4 gap-4">
      <form className="flex w-full gap-4" onSubmit={handleSearch}>
        <Input type="text" className='w-full' placeholder="Digite o CNPJ do Empreendimento" />
        <button type="submit">Buscar</button>
      </form>
    </div>
  )
}

export default BuscaEmpreendimento