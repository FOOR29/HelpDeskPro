// src/components/dashboard/AgentDashboard.tsx
'use client'

import { useTransition, useState } from "react"
import { useRouter } from "next/navigation"
import IButton from "@/src/components/ui/IButton"
import LogoutButton from "@/src/components/ui/LogoutButton"

type AgentLite = {
    id: string
    name: string | null
    email: string
}

type TicketRow = {
    id: string
    title: string
    status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED"
    priority: "LOW" | "MEDIUM" | "HIGH"
    createdAt: string | Date
    createdBy: { name: string | null; email: string }
    assignedTo: AgentLite | null
}

export default function AgentDashboard({
    agentName,
    tickets,
    agents,
}: {
    agentName: string | null
    tickets: TicketRow[]
    agents: AgentLite[]
}) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    async function updateTicket(ticketId: string, data: {
        status: TicketRow["status"]
        priority: TicketRow["priority"]
        assignedToId: string | null
    }) {
        setError(null)
        startTransition(async () => {
            try {
                console.log(`[Dashboard] Updating ticket: ${ticketId}, URL: /api/tickets/${ticketId}`);
                const res = await fetch(`/api/tickets/${ticketId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                })
                if (!res.ok) {
                    const text = await res.text()
                    setError(text || "No se pudo actualizar el ticket")
                    return
                }
                router.refresh()
            } catch (e) {
                setError("Error de red")
            }
        })
    }

    return (
        <div className="min-h-screen bg-[#10451d]/5">
            <div className="max-w-6xl mx-auto p-6">
                {/* Header with welcome and actions */}
                <header className="flex items-center justify-between mb-6 bg-[#10451d] text-white rounded-xl px-6 py-4 shadow-md">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            Welcome, {agentName || "Agent"}
                        </h1>
                        <p className="text-sm text-[#d2f4d3]">
                            Manage support tickets: update status, priority and assignment.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <LogoutButton />
                    </div>
                </header>

                {error && (
                    <div className="mb-4 rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* tickets table/list */}
                <section className="overflow-x-auto rounded-xl bg-white shadow-md border border-[#25a244]/30">
                    <table className="min-w-full text-sm">
                        <thead className="bg-[#1a7431] text-white">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold">Title</th>
                                <th className="px-4 py-3 text-left font-semibold">Client</th>
                                <th className="px-4 py-3 text-left font-semibold">Status</th>
                                <th className="px-4 py-3 text-left font-semibold">Priority</th>
                                <th className="px-4 py-3 text-left font-semibold">Assigned to</th>
                                <th className="px-4 py-3 text-left font-semibold">Created at</th>
                                <th className="px-4 py-3 text-left font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((t, idx) => (
                                <TicketEditableRow
                                    key={t.id}
                                    ticket={t}
                                    agents={agents}
                                    onSave={updateTicket}
                                    disabled={isPending}
                                    // simple zebra stripes
                                    stripe={idx % 2 === 1}
                                />
                            ))}
                            {tickets.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="px-4 py-5 text-center text-gray-500"
                                    >
                                        No tickets registered.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    )
}

function TicketEditableRow({
    ticket,
    agents,
    onSave,
    disabled,
    stripe,
}: {
    ticket: TicketRow
    agents: AgentLite[]
    onSave: (id: string, data: {
        status: TicketRow["status"]
        priority: TicketRow["priority"]
        assignedToId: string | null
    }) => void
    disabled: boolean
    stripe?: boolean
}) {
    const [status, setStatus] = useState<TicketRow["status"]>(ticket.status)
    const [priority, setPriority] = useState<TicketRow["priority"]>(ticket.priority)
    const [assignedToId, setAssignedToId] = useState<string | "">(ticket.assignedTo?.id || "")

    return (
        <tr className={stripe ? "bg-[#f0fdf4]" : "bg-white"}>
            <td className="px-4 py-3 align-top text-[#10451d] font-medium">
                {ticket.title}
            </td>
            <td className="px-4 py-3 align-top">
                <div className="flex flex-col">
                    <span className="text-[#10451d]">
                        {ticket.createdBy.name || ticket.createdBy.email}
                    </span>
                    <span className="text-xs text-gray-500">
                        {ticket.createdBy.email}
                    </span>
                </div>
            </td>
            <td className="px-4 py-3 align-top">
                <select
                    className="w-full border border-[#25a244]/60 rounded-md px-2 py-1 text-xs bg-white text-[#10451d] focus:outline-none focus:ring-2 focus:ring-[#25a244]"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TicketRow["status"])}
                    disabled={disabled}
                >
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="CLOSED">CLOSED</option>
                </select>
            </td>
            <td className="px-4 py-3 align-top">
                <select
                    className="w-full border border-[#25a244]/60 rounded-md px-2 py-1 text-xs bg-white text-[#10451d] focus:outline-none focus:ring-2 focus:ring-[#25a244]"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TicketRow["priority"])}
                    disabled={disabled}
                >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                </select>
            </td>
            <td className="px-4 py-3 align-top">
                <select
                    className="w-full border border-[#25a244]/60 rounded-md px-2 py-1 text-xs bg-white text-[#10451d] focus:outline-none focus:ring-2 focus:ring-[#25a244]"
                    value={assignedToId}
                    onChange={(e) => setAssignedToId(e.target.value)}
                    disabled={disabled}
                >
                    <option value="">Unassigned</option>
                    {agents.map((a) => (
                        <option key={a.id} value={a.id}>
                            {a.name || a.email}
                        </option>
                    ))}
                </select>
            </td>
            <td className="px-4 py-3 align-top text-xs text-gray-500">
                {new Date(ticket.createdAt).toLocaleString()}
            </td>
            <td className="px-4 py-3 align-top">
                <IButton
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                        onSave(ticket.id, {
                            status,
                            priority,
                            assignedToId: assignedToId || null,
                        })
                    }
                >
                    Save
                </IButton>
            </td>
        </tr>
    )
}
