import React, { useState } from 'react'
import LoginContainer from '../components/LoginContainer'
import { TextButton } from '../components/textButton'

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    const envUsername = process.env.NEXT_PUBLIC_USERNAME
    const envPassword = process.env.NEXT_PUBLIC_PASSWORD

    if (username === envUsername && password === envPassword) {
      localStorage.setItem('authenticated', 'true')
      window.location.href = '/'
    } else {
      setError('ユーザー名またはパスワードが間違っています。')
    }
  }

  return (
    <LoginContainer>
      <h1 className="text-2xl font-bold mb-2">Sign In</h1>
      <p className="mb-4 text-gray-600">Use your email and password to sign in</p>
      <input className="mb-4 p-3 border border-gray-200 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="email"
        placeholder="Email Address"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input className="mb-4 p-3 border border-gray-200 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextButton className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleLogin}>Sign in</TextButton>
      {error && <p>{error}</p>}
    </LoginContainer>
  )
}

export default LoginPage
