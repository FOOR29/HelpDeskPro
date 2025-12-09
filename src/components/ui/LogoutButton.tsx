"use client"
import { signOut } from 'next-auth/react'
import IButton from './IButton'

const LogoutButton = () => {
    const handleClick = async () => {
        await signOut({
            callbackUrl: "/login"
        })
    }

    return <IButton onClick={handleClick}>LogOut</IButton>
}

export default LogoutButton