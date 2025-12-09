import { PrismaClient } from "@prisma/client";

// función para crear una nueva instancia de PrismaClient
const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// exportamos una única instancia de PrismaClient
export const db = globalThis.prismaGlobal ?? prismaClientSingleton();

// en desarrollo reutilizamos la instancia para evitar demasiadas conexiones
if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db