
import productslist from './Product'

function Dashboard() {
  const totalCustomers = productslist.length
  const pendingPayments = productslist.filter(
    (customer) => customer.status.toLowerCase() === 'unpaid'
  ).length

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to Electricity Billing System</p>

      <div className="dashboard-grid">
        <div className="dashboard-box">
          <h2>Total Customers</h2>
          <p>{totalCustomers}</p>
        </div>

        <div className="dashboard-box">
          <h2>Total Products</h2>
          <p>0</p>
        </div>

        <div className="dashboard-box">
          <h2>Total Invoices</h2>
          <p>0</p>
        </div>

        <div className="dashboard-box">
          <h2>Pending Payments</h2>
          <p>{pendingPayments}</p>
        </div>
      </div>

      <div className="dashboard-box">
        <h2>Billing Summary</h2>
        <p>Total customers: {totalCustomers}</p>
        <p>Paid bills: {totalCustomers - pendingPayments}</p>
        <p>Unpaid bills: {pendingPayments}</p>
      </div>

      <div className="dashboard-box">
        <h2>Recent Customers</h2>

        {productslist.slice(-5).reverse().map((customer) => (
          <p key={customer.id}>
            {customer.id}. {customer.customerName} — {customer.status}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Dashboard

