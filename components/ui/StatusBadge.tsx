import { Status } from '@/types/typings'
import React from 'react'


interface BadgeProps {
    status: Status
}

const StatusBadge: React.FC<BadgeProps> = ({ status = "Desconhecido" }) => {

    const variant = {
        Novo: "bg-blue-400",
        "Em andamento": "bg-yellow-300 text-yellow-950",
        "Em atendimento": "bg-yellow-400 text-yellow-950",
        Recusado: "bg-red-500",
        Finalizado: "bg-green-500",
        Desconhecido: "bg-gray-600"
    }

    console.log('status: ', status, variant[status])

    return (
        <span className={`${variant[status]} text-white text-xs px-5 py-1 w-full rounded-full`}>
            {status}
        </span>
    )
}

export default StatusBadge
