
import { useState } from 'react'

function Settings() {
  const [companyName, setCompanyName] = useState(
    'Electricity Billing System'
  )
  const [currency, setCurrency] = useState('PKR')
  const [dueDays, setDueDays] = useState('15')
  const [message, setMessage] = useState('')

  function handleSave(event) {
    event.preventDefault()

    localStorage.setItem(
      'billingSettings',
      JSON.stringify({ companyName, currency, dueDays })
    )

    setMessage('Settings saved successfully!')
  }

  return (
    <div>
      <h1>Settings</h1>
      <p>Manage your electricity billing system settings.</p>

      <div className="dashboard-box">
        <h2>General Settings</h2>

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '20px' }}>
            <label>Company Name</label>
            <input
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Currency</label>
            <select
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
            >
              <option value="PKR">Pakistani Rupee (PKR)</option>
              <option value="USD">US Dollar (USD)</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Default Bill Due Day</label>
            <input
              type="number"
              min="1"
              max="28"
              value={dueDays}
              onChange={(event) => setDueDays(event.target.value)}
              required
            />
          </div>

          <button type="submit">Save Settings</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  )
}

export default Settings

