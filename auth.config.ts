import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { LoginInSchema } from "./src/lib/zod";
import { db } from "@/src/lib/db";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Credentials({
            authorize: async (credentials) => {
                const { data, success } = LoginInSchema.safeParse(credentials);
                if (!success) {
                    throw new Error("Credendial invalid")
                }
                // verificar si el usuario existe en la base de datos
                const user = await db.user.findUnique({
                    where: {
                        email: data.email,
                    }
                });

                if (!user || !user.password) {
                    throw new Error("not user found")
                }

                // verificar si la contraseña es correcta
                const isvalid = await bcrypt.compare(data.password, user.password)

                if (!isvalid) {
                    throw new Error("Incorrect Password")
                }

                return user;
            },
        }),
    ],
} satisfies NextAuthConfig