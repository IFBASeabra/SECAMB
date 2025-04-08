
import LayoutHomeModel from '@/components/ui/LayoutHomeModel';
import React from 'react'


export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const NavItems = ([
    { name: "Página Inicial", href: "/home" },
    { name: "Empreendimentos", href: "/empreendimentos" },
    { name: "Processos", href: "/processos" },
  ]);
  return (
    <LayoutHomeModel navItems={NavItems} children={children} />
  )
}

