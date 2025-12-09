import RegisterForm from "@/src/components/form/RegisterForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "Register"
    }
}

const Register = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#10451d]">
            <div className="w-full max-w-md bg-white/95 rounded-2xl shadow-xl p-8 mx-4">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-[#10451d]">Create account</h1>
                    <p className="text-sm text-gray-500">
                        Register to start creating and tracking support tickets.
                    </p>
                </div>
                <RegisterForm />
            </div>
        </div>
    )
}

export default Register
