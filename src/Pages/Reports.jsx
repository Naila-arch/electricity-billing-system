
import productslist from './Product'

function Reports() {
  const totalCustomers = productslist.length

  const paidBills = productslist.filter(
    (customer) => customer.status.toLowerCase() === 'paid'
  ).length

  const unpaidBills = productslist.filter(
    (customer) => customer.status.toLowerCase() === 'unpaid'
  ).length

  const totalUnits = productslist.reduce(
    (total, customer) => total + customer.units,
    0
  )

  return (
    <div>
      <h1>Billing Reports</h1>
      <p>View customer billing details and payment summaries.</p>

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
              {productslist.map((customer) => (
                <tr key={customer.id}>
                  <td style={{ padding: '12px' }}>
                    {customer.serialNo}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {customer.id}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {customer.customerName}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {customer.meterNumber}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {customer.units}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {customer.dueDate}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        color:
                          customer.status.toLowerCase() === 'paid'
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Reports

