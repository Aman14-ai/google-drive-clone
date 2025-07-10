import AuthForm from '@/components/shared/AuthForm'
import { getCurrentUser } from '@/lib/actions/user.action'
import React from 'react'

const page = async() => {
  
  return (
    <AuthForm type='sign-up'/>
  )
}

export default page
