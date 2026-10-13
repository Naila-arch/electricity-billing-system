
const products = [
  {
    id: 1,
    name: 'Residential Plan',
    ratePerUnit: 15,
    description: 'For home electricity customers',
  },
  {
    id: 2,
    name: 'Commercial Plan',
    ratePerUnit: 20,
    description: 'For shops and offices',
  },
  {
    id: 3,
    name: 'Industrial Plan',
    ratePerUnit: 25,
    description: 'For industrial electricity usage',
  },
]

function Products() {
  return (
    <div>
      <h1>Electricity Plans</h1>
      <p>View electricity plans and their rates.</p>

      <div className="dashboard-box">
        <h2>Available Plans</h2>

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
                <th style={{ padding: '12px' }}>ID</th>
                <th style={{ padding: '12px' }}>Plan Name</th>
                <th style={{ padding: '12px' }}>Rate Per Unit</th>
                <th style={{ padding: '12px' }}>Description</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td style={{ padding: '12px' }}>{product.id}</td>
                  <td style={{ padding: '12px' }}>{product.name}</td>
                  <td style={{ padding: '12px' }}>
                    Rs. {product.ratePerUnit}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {product.description}
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

export default Products
