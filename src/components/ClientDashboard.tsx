// src/components/dashboard/ClientDashboard.tsx
'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import IButton from "@/src/components/ui/IButton"
import LogoutButton from "@/src/components/ui/LogoutButton"
import TicketCreateModal from "./TicketCreateModal"

// Tipado mínimo local para render
type TicketLite = {
    id: string
    title: string
    status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED"
    priority: "LOW" | "MEDIUM" | "HIGH"
    createdAt: string | Date
}

export default function ClientDashboard({
    userName,
    tickets,
}: {
    userName: string | null
    tickets: TicketLite[]
}) {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Header con welcome y acciones */}
            <header className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold">Welcome, {userName || "Cliente"}</h1>
                    <p className="text-sm text-gray-500">Gestiona tus tickets de soporte.</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* botón crear (+) */}
                    <IButton onClick={() => setOpen(true)}>+ New Ticket</IButton>
                    <LogoutButton />
                </div>
            </header>

            {/* Listado de tickets en Cards simples */}
            <section className="grid md:grid-cols-2 gap-4">
                {tickets.map((t) => (
                    <article key={t.id} className="border rounded-lg p-4 shadow-sm bg-white">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium">{t.title}</h3>
                            {/* Badges simples de estado/prioridad */}
                            <span className="text-xs px-2 py-1 rounded bg-gray-100">{t.status}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700">{t.priority}</span>
                            <time className="text-xs text-gray-500">
                                {new Date(t.createdAt).toLocaleString()}
                            </time>
                        </div>
                        {/* Aquí luego puedes poner un Button "Ver detalle" */}
                    </article>
                ))}
                {tickets.length === 0 && (
                    <div className="text-sm text-gray-500">Aún no tienes tickets. Crea el primero con el botón “New Ticket”.</div>
                )}
            </section>

            {/* Modal de creación */}
            <TicketCreateModal
                open={open}
                onClose={() => setOpen(false)}
                onCreated={() => {
                    setOpen(false)
                    router.refresh() // recargar lista desde el server component
                }}
            />
        </div>
    )
}
