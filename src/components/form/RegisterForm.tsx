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
        // A. EL CONECTOR CON ZOD
        resolver: zodResolver(RegisterInSchema),
        // B. VALORES INICIALES
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
            <h1>Register</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* name */}
                <div className="space-y-2">
                    <label
                        htmlFor="name"
                        className={`block text-sm font-medium ${errors.email ? "text-red-500" : ""}`}
                    >
                        Your name
                    </label>
                    <div>
                        <Input
                            id="name"
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

                <div className="space-y-2">
                    <label
                        htmlFor="user_name"
                    >
                        Your user name (opcinal)
                    </label>
                    <div>
                        <Input
                            id="name"
                            placeholder="Your nick name"
                            {...register("username")}
                        />
                    </div>
                </div>

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

export default RegisterForm
