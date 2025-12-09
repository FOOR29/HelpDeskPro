'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod" // se debe nstalar esto como: npm i @hookform/resolvers
// Ese resolver es de @hookform/resolvers, que es el paquete que conecta Zod con react-hook-form.
import Input from "../ui/Input"
import IButton from "../ui/IButton"
import { LoginInSchema } from "@/src/lib/zod"
import z from "zod"
import { startTransition, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { loginAction } from "@/src/actions/auth-actions"

const LoginForm = () => {
    const router = useRouter(); //use router para mandar al dashboard
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
                // redirigir según el rol del usuario
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
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Email */}
                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className={`block text-sm font-medium ${errors.email ? "text-red-500" : ""}`}
                    >
                        Email
                    </label>
                    <div>
                        <Input
                            id="email"
                            placeholder="@gmail.com"
                            {...register("email")}
                        />
                    </div>
                    {/* Mesagge de error */}
                    {errors.email && (
                        <p className="text-sm font-medium text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label
                        htmlFor="password"
                        className={`block text-sm font-medium ${errors.password ? "text-red-500" : ""}`}
                    >
                        Password
                    </label>
                    <div>
                        <Input
                            id="password"
                            type="password"
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

                <div>
                    {
                        error
                    }
                </div>

                <IButton
                    type="submit"
                    disabled={isPending}
                >
                    Submit
                </IButton>
            </form>
        </div>
    )
}

export default LoginForm
