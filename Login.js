
import { useState } from 'react'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleLogin(e) {
    e.preventDefault()

    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password.')
      return
    }

    onLogin()
  }

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h1>Electricity Billing System</h1>
        <h2>Login</h2>

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
