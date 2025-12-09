// src/components/dashboard/form/TicketCreateForm.tsx
'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod" // you must install this as: npm i @hookform/resolvers
// This resolver comes from @hookform/resolvers, it is the package that connects Zod with react-hook-form.
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
                    setError(text || "Could not create the ticket")
                    return
                }
                reset()
                onSuccess()
            } catch (e) {
                setError("Network error")
            }
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-white">
            {/* title */}
            <div className="space-y-1">
                <label
                    htmlFor="title"
                    className={`block text-sm font-medium ${errors.title ? "text-red-300" : "text-white"}`}
                >
                    Title
                </label>
                <Input
                    id="title"
                    placeholder="Short subject"
                    className="w-full border border-[#25a244]/70 rounded-md px-3 py-2 text-sm text-[#10451d] bg-white focus:outline-none focus:ring-2 focus:ring-[#25a244]"
                    {...register("title")}
                />
                {errors.title && (
                    <p className="text-sm font-medium text-red-300">
                        {errors.title.message}
                    </p>
                )}
            </div>

            {/* description */}
            <div className="space-y-1">
                <label
                    htmlFor="description"
                    className={`block text-sm font-medium ${errors.description ? "text-red-300" : "text-white"}`}
                >
                    Description
                </label>
                <textarea
                    id="description"
                    className="w-full border border-[#25a244]/70 rounded-md px-3 py-2 text-sm text-[#10451d] bg-white focus:outline-none focus:ring-2 focus:ring-[#25a244]"
                    rows={4}
                    placeholder="Describe the issue"
                    {...register("description")}
                />
                {errors.description && (
                    <p className="text-sm font-medium text-red-300">
                        {errors.description.message}
                    </p>
                )}
            </div>

            {/* priority */}
            <div className="space-y-1">
                <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-white"
                >
                    Priority
                </label>
                <select
                    id="priority"
                    className="w-full border border-[#25a244]/70 rounded-md px-3 py-2 text-sm text-[#10451d] bg-white focus:outline-none focus:ring-2 focus:ring-[#25a244]"
                    {...register("priority")}
                >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                </select>
            </div>

            <div className="text-sm text-red-300 min-h-[1.25rem]">
                {error}
            </div>

            <IButton
                type="submit"
                disabled={isPending}
                className="w-full bg-[#25a244] hover:bg-[#1a7431] text-white font-semibold py-2 rounded-md transition-colors"
            >
                Create ticket
            </IButton>
        </form>
    )
}
