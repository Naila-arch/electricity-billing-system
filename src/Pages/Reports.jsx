import { useEffect, useState } from 'react'

function Reports() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/customers')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Data load nahi hua')
        }
        return response.json()
      })
      .then((data) => {
        setCustomers(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Reports error:', error)
        setError('Reports ka data load nahi ho saka.')
        setLoading(false)
      })
  }, [])

  const totalCustomers = customers.length

  const paidBills = customers.filter(
    (customer) => customer.status?.toLowerCase() === 'paid'
  ).length

  const unpaidBills = customers.filter(
    (customer) => customer.status?.toLowerCase() === 'unpaid'
  ).length

  const totalUnits = customers.reduce(
    (total, customer) => total + Number(customer.units || 0),
    0
  )

  return (
    <div>
      <h1>Billing Reports</h1>
      <p>View customer billing details and payment summaries.</p>

      {loading && <p>Loading reports...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <div className="dashboard-grid">
            <div className="dashboard-box">
              <h2>Total Customers</h2>
              <p>{totalCustomers}</p>
            </div>

            <div className="dashboard-box">
              <h2>Paid Bills</h2>
              <p>{paidBills}</p>
            </div>

            <div className="dashboard-box">
              <h2>Unpaid Bills</h2>
              <p>{unpaidBills}</p>
            </div>

            <div className="dashboard-box">
              <h2>Total Units Consumed</h2>
              <p>{totalUnits}</p>
            </div>
          </div>

          <div className="dashboard-box">
            <h2>Customer Billing Report</h2>

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
                    <th style={{ padding: '12px' }}>Serial No.</th>
                    <th style={{ padding: '12px' }}>Customer ID</th>
                    <th style={{ padding: '12px' }}>Customer Name</th>
                    <th style={{ padding: '12px' }}>Meter Number</th>
                    <th style={{ padding: '12px' }}>Units</th>
                    <th style={{ padding: '12px' }}>Due Date</th>
                    <th style={{ padding: '12px' }}>Bill Status</th>
                  </tr>
                </thead>

                <tbody>
                  {customers.map((customer, index) => (
                    <tr key={customer.id}>
                      <td style={{ padding: '12px' }}>{index + 1}</td>
                      <td style={{ padding: '12px' }}>{customer.id}</td>
                      <td style={{ padding: '12px' }}>
                        {customer.customer_name}
                      </td>
                      <td style={{ padding: '12px' }}>
                        {customer.meter_number}
                      </td>
                      <td style={{ padding: '12px' }}>{customer.units}</td>
                      <td style={{ padding: '12px' }}>
                        {customer.due_date
                          ? new Date(customer.due_date).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span
                          style={{
                            color:
                              customer.status?.toLowerCase() === 'paid'
                                ? 'green'
                                : 'red',
                            fontWeight: 'bold',
                          }}
                        >
                          {customer.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {customers.length === 0 && (
                    <tr>
                      <td colSpan="7" style={{ padding: '12px' }}>
                        No customers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Reports