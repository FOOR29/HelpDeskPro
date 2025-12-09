// src/components/form/RegisterForm.tsx
'use client'
import { useForm } from "react-hook-form"
import { RegisterInSchema } from "@/src/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { startTransition, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { registerAction } from "@/src/actions/auth-actions"
import Input from "../ui/Input"
import IButton from "../ui/IButton" 

const RegisterForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null)
    const [isPending, SetIsPending] = useTransition()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof RegisterInSchema>>({
        // A. CONNECTOR WITH ZOD
        resolver: zodResolver(RegisterInSchema),
        // B. INITIAL VALUES
        defaultValues: {
            email: "",
            password: "",
            name: "",
            username: "",
        }
    })

    async function onSubmit(values: z.infer<typeof RegisterInSchema>) {
        setError(null)
        startTransition(async () => {
            const response = await registerAction(values)
            console.log(response);
            if (response.error) {
                setError(response.error)
            } else {
                if (response.role === "agent") {
                    router.push("/agent")
                } else {
                    router.push("/dashboard")
                }
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* name */}
                <div className="space-y-1">
                    <label
                        htmlFor="name"
                        className={`block text-sm font-medium ${errors.name ? "text-red-500" : "text-[#10451d]"}`}
                    >
                        Your name
                    </label>
                    <div>
                        <Input
                            id="name"
                            className="w-full border border-[#25a244]/60 rounded-md px-3 py-2 text-sm text-[#10451d] focus:outline-none focus:ring-2 focus:ring-[#25a244]"
                            placeholder="Juanit Perez"
                            {...register("name")}
                        />
                    </div>
                    {errors.name && (
                        <p className="text-sm font-medium text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="user_name"
                        className="block text-sm font-medium text-[#10451d]"
                    >
                        Your user name (optional)
                    </label>
                    <div>
                        <Input
                            id="user_name"
                            className="w-full border border-[#25a244]/60 rounded-md px-3 py-2 text-sm text-[#10451d] focus:outline-none focus:ring-2 focus:ring-[#25a244]"
                            placeholder="Your nickname"
                            {...register("username")}
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <label
                        htmlFor="email"
                        className={`block text-sm font-medium ${errors.email ? "text-red-500" : "text-[#10451d]"}`}
                    >
                        Email
                    </label>
                    <div>
                        <Input
                            id="email"
                            className="w-full border border-[#25a244]/60 rounded-md px-3 py-2 text-sm text-[#10451d] focus:outline-none focus:ring-2 focus:ring-[#25a244]"
                            placeholder="@gmail.com"
                            {...register("email")}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-sm font-medium text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-1">
                    <label
                        htmlFor="password"
                        className={`block text-sm font-medium ${errors.password ? "text-red-500" : "text-[#10451d]"}`}
                    >
                        Password
                    </label>
                    <div>
                        <Input
                            id="password"
                            type="password"
                            className="w-full border border-[#25a244]/60 rounded-md px-3 py-2 text-sm text-[#10451d] focus:outline-none focus:ring-2 focus:ring-[#25a244]"
                            placeholder="*****"
                            {...register("password")}
                        />
                    </div>
                    {errors.password && (
                        <p className="text-sm font-medium text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="text-sm text-red-600 min-h-[1.25rem]">
                    {error}
                </div>

                <IButton
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#25a244] hover:bg-[#1a7431] text-white font-semibold py-2 rounded-md transition-colors"
                >
                    Submit
                </IButton>

                <p className="mt-3 text-xs text-center text-gray-500">
                    Already have an account?{" "}
                    <a href="/login" className="text-[#1a7431] font-medium hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    )
}

export default RegisterForm
