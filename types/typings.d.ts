export interface CustomInsertResult {
  code: string | number
  status: string
  details: string
}

export type Status = 'Novo' | 'Em andamento' | 'Recusado' | 'Finalizado' | 'Desconhecido'