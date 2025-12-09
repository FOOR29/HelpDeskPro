import { ButtonProps } from "@/src/types";

const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-green-600 text-white hover:bg-green-700",
    outline: "border border-neutral-400 text-neutral-800 hover:bg-neutral-100",
};

const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
};

const IButton = ({
    children,
    variant = "primary",
    size = "md",
    isLoading = false,
    className = "",
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
                children
            )}
        </button>
    );
};

export default IButton;