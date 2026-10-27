
import { useEffect, useState } from 'react'

function Dashboard() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/customers')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Customers data load nahi hua')
        }

        return response.json()
      })
      .then((data) => {
        setCustomers(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((error) => {
        console.error('Dashboard error:', error)
        setError('Dashboard data load nahi ho saka.')
        setLoading(false)
      })
  }, [])

  const totalCustomers = customers.length

  // Electricity plans ki total tadaad
  const totalProducts = 3

  // Har customer ka ek invoice hai
  const totalInvoices = totalCustomers

  const pendingPayments = customers.filter(
    (customer) => customer.status?.toLowerCase() === 'unpaid'
  ).length

  const paidBills = customers.filter(
    (customer) => customer.status?.toLowerCase() === 'paid'
  ).length

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to Electricity Billing System</p>

      {loading && <p>Loading dashboard...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <div className="dashboard-grid">
            <div className="dashboard-box">
              <h2>Total Customers</h2>
              <p>{totalCustomers}</p>
            </div>

            <div className="dashboard-box">
              <h2>Total Products</h2>
              <p>{totalProducts}</p>
            </div>

            <div className="dashboard-box">
              <h2>Total Invoices</h2>
              <p>{totalInvoices}</p>
            </div>

            <div className="dashboard-box">
              <h2>Pending Payments</h2>
              <p>{pendingPayments}</p>
            </div>
          </div>

          <div className="dashboard-box">
            <h2>Billing Summary</h2>
            <p>Total customers: {totalCustomers}</p>
            <p>Paid bills: {paidBills}</p>
            <p>Unpaid bills: {pendingPayments}</p>
          </div>

          <div className="dashboard-box">
            <h2>Recent Customers</h2>

            {customers.length === 0 ? (
              <p>No customers found.</p>
            ) : (
              [...customers]
                .reverse()
                .slice(0, 5)
                .map((customer) => (
                  <p key={customer.id}>
                    {customer.id}. {customer.customer_name} —{' '}
                    {customer.status}
                  </p>
                ))
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
