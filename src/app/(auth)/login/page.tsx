import LoginForm from "@/src/components/form/LoginForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "Login"
    }
}

const Login = () => {
    return (
        <div>
            <LoginForm />
        </div>
    )
}

export default Login