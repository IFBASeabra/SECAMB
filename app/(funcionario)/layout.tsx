
import LayoutHomeModel from '@/components/ui/LayoutHomeModel';
import React from 'react'


export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const NavItems = ([
        { name: "Página Inicial", href: "/secretaria" },
        { name: "Empreendimentos", href: "/secretaria/empreendimentos" },
        { name: "Processos", href: "/secretaria/process" },
    ]);
    return (
        <LayoutHomeModel navItems={NavItems} children={children} />
    )
}



