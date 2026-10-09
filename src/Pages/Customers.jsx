
import productslist from './Product'

function Customers() {
  return (
    <div>
      <h1>Customers</h1>
      <p>Manage electricity customers and their bills.</p>

      <div className="dashboard-box">
        <h2>Customer List</h2>

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
                <th style={{ padding: '12px' }}>ID</th>
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
                  <td style={{ padding: '12px' }}>{customer.serialNo}</td>
                  <td style={{ padding: '12px' }}>{customer.id}</td>
                  <td style={{ padding: '12px' }}>{customer.customerName}</td>
                  <td style={{ padding: '12px' }}>{customer.meterNumber}</td>
                  <td style={{ padding: '12px' }}>{customer.units}</td>
                  <td style={{ padding: '12px' }}>{customer.dueDate}</td>
                  <td style={{ padding: '12px' }}>{customer.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Customers

