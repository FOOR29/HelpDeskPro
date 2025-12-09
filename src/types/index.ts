import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

// /types/Button.ts
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
};

// tipado de inputs
export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    variant?: "default" | "underline";
};
