"use server"
// esto se encarga de poder poder ejecutar el SigIn

import z, { success } from "zod";
import { LoginInSchema, RegisterInSchema } from "../lib/zod";
import { AuthError } from "next-auth";
import { db } from "../lib/db";
import bcrypt from "bcryptjs";  // se debe instalar como "npm i bcryptjs"
import { signIn } from "../auth";


export const loginAction = async (values: z.infer<typeof LoginInSchema>) => {
    try {
        await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        })
        return { success: true }
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message }
        }
        return { error: "Error 500" }
    }
}

export const registerAction = async (values: z.infer<typeof RegisterInSchema>) => {
    try {
        const { data, success } = RegisterInSchema.safeParse(values);
        if (!success) {
            return {
                error: "Invalid data"
            }
        }
        //verificar si el usuario existe
        const user = await db.user.findUnique({
            where: {
                email: data.email
            }
        })
        // si no existe
        if (user) {
            return {
                error: "User already exists"
            }
        }
        // hash la contraseña
        const passwordHash = await bcrypt.hash(data.password, 10)

        // una ves haseada se crea el usuario
        await db.user.create({
            data: {
                email: data.email,
                name: data.name,
                username: data.username,
                password: passwordHash,
            }
        })
        // credenciales necesarias para ingresar
        await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        })

        return { success: true }
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: error.cause?.err?.message }
        }
        return { error: "Error 500" }
    }
}
