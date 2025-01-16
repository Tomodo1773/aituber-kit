import { useEffect } from 'react'
import { useRouter } from 'next/router'

export function useAuthCheck() {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true'
    if (!isAuthenticated && router.pathname !== '/login') {
      router.push('/login')
    }
  }, [router])
}
