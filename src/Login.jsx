
import { useState } from 'react'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleLogin(event) {
    event.preventDefault()

    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password.')
      return
    }

    setError('')
    onLogin()
  }

  return (
    <div className="login-container">
      <div className="login-decoration">⚡</div>

      <form className="login-box" onSubmit={handleLogin}>
        <div className="login-icon">⚡</div>

        <h1>Electricity Billing System</h1>
        <p className="login-subtitle">
          Manage Your Electricity Bills Easily
        </p>

        <h2>Login</h2>
        <div className="login-underline"></div>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="password">Password</label>
        <div className="password-wrapper">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            className="show-password"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {error && <p className="login-error">{error}</p>}

        <button className="login-button" type="submit">
          ⚡ Login
        </button>

        <p className="login-footer">
          Powering a brighter tomorrow
        </p>
      </form>
    </div>
  )
}

export default Login
