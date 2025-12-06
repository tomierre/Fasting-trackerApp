import { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'
import Login from './Login'
import LoadingSpinner from './LoadingSpinner'

interface AuthGuardProps {
  children: ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!currentUser) {
    return <Login />
  }

  return <>{children}</>
}

