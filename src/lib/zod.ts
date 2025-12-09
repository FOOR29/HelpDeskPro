import z from "zod";


// asi se valida con zod ahora con la ultima version
// validacion de login
export const LoginInSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
});

// validacion para el register
export const RegisterInSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    name: z
        .string()
        .min(1, "Name is requerid")
        .max(20, "name must be less than 20 characters"),
    username: z  //este ese opcional
        .string()
        .max(20, "name must be less than 20 characters")
});
