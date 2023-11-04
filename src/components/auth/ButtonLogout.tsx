'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Hanko } from '@teamhanko/hanko-elements'

import { env } from '@/env.mjs'

const hankoApiUrl: string = env.NEXT_PUBLIC_HANKO_API_URL;

export function LogoutBtn() {
    const router = useRouter()
    const [hanko, setHanko] = useState<Hanko>()

    useEffect(() => {
        import('@teamhanko/hanko-elements')
            .then(({ Hanko }) => setHanko(new Hanko(hankoApiUrl)))
            .catch((error) =>
                console.error('Failed to import @teamhanko/hanko-elements.', error)
            )
    }, [])

    const logout = async () => {
        try {
            await hanko?.user.logout()
            router.push('/login')
            router.refresh()
        } catch (error) {
            console.error('Error during logout:', error)
        }
    }

    return (
        <>
            <button
              
                onClick={() => {
                    logout().catch((error) =>
                        console.error('Error during logout:', error)
                    )
                }}
            >
                Logout
            </button>
        </>
    )
}