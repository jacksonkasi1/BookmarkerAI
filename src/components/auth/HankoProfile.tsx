'use client'

import { useEffect } from 'react'
import { register } from '@teamhanko/hanko-elements'
import { env } from '@/env.mjs'

const hankoApiUrl: string = env.NEXT_PUBLIC_HANKO_API_URL;

export default function HankoProfile() {

    useEffect(() => {
        register(hankoApiUrl).catch((e) =>
            console.error('Error registering hanko element', e)
        )
    }, [])

    return (
        <hanko-profile class={'hanko'} />
    )
}