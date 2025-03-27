"use client"

import { Button } from '@/components/ui/button'
import { DialogHeader } from '@/components/ui/dialog'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { FilePlus2 } from 'lucide-react'
import React, { useState } from 'react'





export default function DetailsProcess() {
    const [dialog, setDialog] = React.useState(false)
    return dialog ? (
        <Dialog>
            <DialogTrigger className="w-max mx-auto" asChild>
                <Button
                    variant="outline"
                    className="bg-green-400 text-white flex items-center justify-center gap-2 w-max p-2"
                >
                    <FilePlus2 size={14} /> Adicionar à minha lista
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Adicionar empresa à minha lista</DialogTitle>
                    <ScrollArea className="h-72 w-full rounded-md border p-4">
                        Apareceu
                    </ScrollArea>

                </DialogHeader>
            </DialogContent>
        </Dialog>

    ) : (
        <div>s</div>
    )
}
