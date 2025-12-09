'use client'
import { useForm } from "react-hook-form"
import { RegisterInSchema } from "@/src/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod" // se debe nstalar esto como: npm i @hookform/resolvers
// Ese resolver es de @hookform/resolvers, que es el paquete que conecta Zod con react-hook-form.
import z from "zod"
import { startTransition, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { registerAction } from "@/src/actions/auth-actions"
import Input from "../ui/Input"
import IButton from "../ui/IButton" 

const RegisterForm = () => {
    const router = useRouter(); //use router para mandar al dashboard
    const [error, setError] = useState<string | null>(null)
    const [isPending, SetIsPending] = useTransition()


    const {
        register,
        handleSubmit, // Es el "portero" del formulario. Se pone en el <form onSubmit={...}>.
        formState: { errors }, // Es el "mensajero". Aquí viven los errores en tiempo real. // Si Zod dice que el email está mal, 'errors.email' tendrá el mensaje // Si todo está bien, 'errors' estará vacío.
    } = useForm<z.infer<typeof RegisterInSchema>>({ // 2. CONFIGURACIÓN DEL HOOK
        // A. EL CONECTOR CON ZOD
        resolver: zodResolver(RegisterInSchema), // Esto es lo más importante. Le dice a React Hook Form: // "No uses validación HTML normal. Cada vez que alguien escriba o intente enviar, // pregúntale a 'LoginInSchema' (tu archivo zod.ts) si los datos son correctos".
        // B. VALORES INICIALES
        defaultValues: {
            email: "",      // El formulario arranca limpio.
            password: "",    // Si no pones esto, React puede quejarse de que los inputs cambian de "uncontrolled" a "controlled".
            name: "",
            username: "", // esto es opcional
        }
    })


    // con este onsubmit se pide los valores que son email y password en este caso
    async function onSubmit(values: z.infer<typeof RegisterInSchema>) {
        setError(null)
        startTransition(async () => {
            const response = await registerAction(values)
            console.log(response); // con esto mostramos en la terminal cuando el usuario sus credenciales son incorrectas
            if (response.error) {
                setError(response.error)
            } else {
                router.push("/dashboard")
            }
        })
    }

    return (
        <div>
            <h1>Register</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* Campo name */}
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
                            {...register("name")} // Aquí conectamos directamente con hook form
                        />
                    </div>
                    {/* Mensaje de error manual */}
                    {errors.name && (
                        <p className="text-sm font-medium text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Campo User name opcinal esto se puede eliminar */}
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
                            {...register("username")} // Aquí conectamos directamente con hook form
                        />
                    </div>
                </div>

                {/* Campo Email */}
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
                            {...register("email")} // Aquí conectamos directamente con hook form
                        />
                    </div>
                    {/* Mensaje de error manual */}
                    {errors.email && (
                        <p className="text-sm font-medium text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Campo Password */}
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
                            {...register("password")} // Aquí conectamos directamente con hook form
                        />
                    </div>
                    {/* Mensaje de error manual */}
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
