"use client"

import React from 'react'


interface dataProcess {
    id: number;
    status: string;
    protocol: string;
    description: string;
    id_user: number;
    enterprise: number;
}

export default function Details({ data }: { data: dataProcess }) {




    return (
        <div>{data.description}</div>
    )
}
