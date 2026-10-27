import { useEffect, useState } from 'react'

function Invoices() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/customers')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Invoice data load nahi hua')
        }
        return response.json()
      })
      .then((data) => {
        setCustomers(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Invoices error:', error)
        setError('Invoice data load nahi ho saka.')
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <h1>Invoices</h1>
      <p>Manage electricity bills and payments.</p>

      <div className="dashboard-box">
        <h2>Invoice List</h2>

        {loading && <p>Loading invoices...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && (
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
              }}
            >
              <thead>
                <tr>
                  <th style={{ padding: '12px' }}>Invoice ID</th>
                  <th style={{ padding: '12px' }}>Customer</th>
                  <th style={{ padding: '12px' }}>Meter Number</th>
                  <th style={{ padding: '12px' }}>Units</th>
                  <th style={{ padding: '12px' }}>Due Date</th>
                  <th style={{ padding: '12px' }}>Status</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td style={{ padding: '12px' }}>
                      INV-{String(customer.id).padStart(3, '0')}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {customer.customer_name}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {customer.meter_number}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {customer.units}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {customer.due_date
                        ? new Date(customer.due_date).toLocaleDateString()
                        : 'N/A'}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {customer.status}
                    </td>
                  </tr>
                ))}

                {customers.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ padding: '12px' }}>
                      No invoices found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Invoices