// src/components/dashboard/TicketCreateForm.tsx
'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod" // se debe nstalar esto como: npm i @hookform/resolvers
// Ese resolver es de @hookform/resolvers, que es el paquete que conecta Zod con react-hook-form.
import z from "zod"
import { TicketCreateSchema } from "@/src/lib/zod"
import Input from "@/src/components/ui/Input"
import IButton from "@/src/components/ui/IButton"
import { useTransition, useState } from "react"

type FormValues = z.infer<typeof TicketCreateSchema>

export default function TicketCreateForm({
    onSuccess,
}: {
    onSuccess: () => void
}) {
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    // ZOD INTEGRATION
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        resolver: zodResolver(TicketCreateSchema),
        defaultValues: {
            title: "",
            description: "",
            priority: "MEDIUM",
        }
    })

    async function onSubmit(values: FormValues) {
        setError(null)
        startTransition(async () => {
            try {
                const res = await fetch("/api/tickets", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                })
                if (!res.ok) {
                    const text = await res.text()
                    setError(text || "No se pudo crear el ticket")
                    return
                }
                reset()
                onSuccess()
            } catch (e) {
                setError("Error de red")
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* title */}
            <div className="space-y-1">
                <label htmlFor="title" className={`block text-sm font-medium ${errors.title ? "text-red-500" : ""}`}>
                    Title
                </label>
                <Input id="title" placeholder="Breve asunto" {...register("title")} />
                {errors.title && <p className="text-sm font-medium text-red-500">{errors.title.message}</p>}
            </div>

            {/* description */}
            <div className="space-y-1">
                <label htmlFor="description" className={`block text-sm font-medium ${errors.description ? "text-red-500" : ""}`}>
                    Description
                </label>
                <textarea id="description" className="w-full border rounded px-3 py-2" rows={4} placeholder="Describe el problema" {...register("description")} />
                {errors.description && <p className="text-sm font-medium text-red-500">{errors.description.message}</p>}
            </div>

            {/* priority */}
            <div className="space-y-1">
                <label htmlFor="priority" className="block text-sm font-medium">Priority</label>
                <select id="priority" className="w-full border rounded px-3 py-2" {...register("priority")}>
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                </select>
            </div>

            <div>{error}</div>

            <IButton type="submit" disabled={isPending}>
                Crear ticket
            </IButton>
        </form>
    )
}
