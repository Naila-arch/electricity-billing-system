
import productslist from './Product'

function Invoices() {
  return (
    <div>
      <h1>Invoices</h1>
      <p>Manage electricity bills and payments.</p>

      <div className="dashboard-box">
        <h2>Invoice List</h2>

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
              {productslist.map((customer) => (
                <tr key={customer.id}>
                  <td style={{ padding: '12px' }}>
                    INV-{String(customer.id).padStart(3, '0')}
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
                    {customer.status}
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

export default Invoices

