'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import IButton from "@/src/components/ui/IButton"
import LogoutButton from "@/src/components/ui/LogoutButton"
import TicketCreateModal from "./TicketCreateModal"

// minimal local typing for render
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
            {/* Header with welcome and actions */}
            <header className="flex items-center justify-between mb-6 bg-[#10451d] text-white rounded-xl px-6 py-4 shadow-md">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Welcome, {userName || "Client"}
                    </h1>
                    <p className="text-sm text-[#d2f4d3]">
                        Manage your support tickets: create and track their status.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {/* create button (+) */}
                    <IButton
                        onClick={() => setOpen(true)}
                        className="bg-[#25a244] hover:bg-[#1a7431] text-white font-semibold px-4 py-2 rounded-md transition-colors"
                    >
                        + New Ticket
                    </IButton>
                    <LogoutButton />
                </div>
            </header>

            {/* Tickets list as Cards */}
            <section className="grid md:grid-cols-2 gap-4">
                {tickets.map((t) => (
                    <article
                        key={t.id}
                        className="border border-[#25a244]/40 rounded-xl p-4 shadow-sm bg-white flex flex-col gap-2"
                    >
                        <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-[#10451d]">
                                {t.title}
                            </h3>
                            {/* simple badges for status */}
                            <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-[#1a7431]/10 text-[#1a7431] uppercase tracking-wide">
                                {t.status}
                            </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-[#25a244]/10 text-[#25a244] uppercase tracking-wide">
                                {t.priority}
                            </span>
                            <time className="text-xs text-gray-500">
                                {new Date(t.createdAt).toLocaleString()}
                            </time>
                        </div>
                        {/* Later you can add a "View details" button here */}
                    </article>
                ))}
                {tickets.length === 0 && (
                    <div className="text-sm text-gray-500">
                        You do not have any tickets yet. Create the first one using the
                        &quot;New Ticket&quot; button.
                    </div>
                )}
            </section>

            {/* Creation modal */}
            <TicketCreateModal
                open={open}
                onClose={() => setOpen(false)}
                onCreated={() => {
                    setOpen(false)
                    router.refresh() // reload list from the server component
                }}
            />
        </div>
    )
}
