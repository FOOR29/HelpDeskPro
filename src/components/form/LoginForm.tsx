// src/components/form/LoginForm.tsx
'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod" // you must install this as: npm i @hookform/resolvers
// This resolver comes from @hookform/resolvers, it is the package that connects Zod with react-hook-form.
import Input from "../ui/Input"
import IButton from "../ui/IButton"
import { LoginInSchema } from "@/src/lib/zod"
import z from "zod"
import { startTransition, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { loginAction } from "@/src/actions/auth-actions"

const LoginForm = () => {
    const router = useRouter(); // use router to navigate to the dashboard
    const [error, setError] = useState<string | null>(null)
    const [isPending, SetIsPending] = useTransition()

    const {
        register,
        handleSubmit,
        formState: { errors },
        // ZOD INTEGRATION
    } = useForm<z.infer<typeof LoginInSchema>>({
        resolver: zodResolver(LoginInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function onSubmit(values: z.infer<typeof LoginInSchema>) {
        setError(null)
        startTransition(async () => {
            const response = await loginAction(values)
            console.log(response);
            if (response.error) {
                setError(response.error)
            } else {
                // redirect based on user role
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
                    {/* Error message */}
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
                    Don&apos;t have an account?{" "}
                    <a href="/register" className="text-[#1a7431] font-medium hover:underline">
                        Register
                    </a>
                </p>
            </form>
        </div>
    )
}

export default LoginForm
