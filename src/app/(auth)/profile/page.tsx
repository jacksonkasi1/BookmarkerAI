'use client'

import React from 'react'
import { LogoutBtn } from '@/components/auth/ButtonLogout'
import HankoProfile from '@/components/auth/HankoProfile'

const Profile = () => {
  return (
    <>
    <HankoProfile />
    <LogoutBtn />
    </>
  )
}

export default Profile