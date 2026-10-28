
import { useEffect, useState } from 'react'
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from './service.js'

function Customers() {
  const [customers, setCustomers] = useState([])
  const [name, setName] = useState('')
  const [meterNumber, setMeterNumber] = useState('')
  const [units, setUnits] = useState('')
  const [status, setStatus] = useState('Unpaid')
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  async function loadCustomers() {
    try {
      setError('')
      const data = await getCustomers()
      setCustomers(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Failed to load customers.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCustomers()
  }, [])

  function resetForm() {
    setName('')
    setMeterNumber('')
    setUnits('')
    setStatus('Unpaid')
    setEditingId(null)
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!name.trim()) {
      setError('Please enter the customer name.')
      return
    }

    const customer = {
      customer_name: name.trim(),
      meter_number: meterNumber.trim(),
      units: units === '' ? 0 : Number(units),
      status,
    }

    try {
      setError('')

      if (editingId !== null) {
        await updateCustomer(editingId, customer)
      } else {
        await addCustomer(customer)
      }

      resetForm()
      await loadCustomers()
    } catch (err) {
      setError(err.message || 'Failed to save customer.')
    }
  }

  function handleEdit(customer) {
    setEditingId(customer.id)
    setName(customer.customer_name || '')
    setMeterNumber(customer.meter_number || '')
    setUnits(customer.units ?? '')
    setStatus(customer.status || 'Unpaid')
    setError('')
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this customer?')) {
      return
    }

    try {
      setError('')
      await deleteCustomer(id)
      await loadCustomers()
    } catch (err) {
      setError(err.message || 'Failed to delete customer.')
    }
  }

  return (
    <div>
      <h1>Customers Management</h1>
      <p>Add, edit, update, and delete customer records.</p>

      {error && <p role="alert">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Meter Number"
          value={meterNumber}
          onChange={(e) => setMeterNumber(e.target.value)}
        />

        <input
          type="number"
          min="0"
          placeholder="Units Consumed"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Unpaid">Unpaid</option>
          <option value="Paid">Paid</option>
        </select>

        <button type="submit">
          {editingId !== null ? 'Update Customer' : 'Add Customer'}
        </button>

        {editingId !== null && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {loading ? (
        <p>Loading customers...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Meter Number</th>
              <th>Units Consumed</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id}>
                <td>{index + 1}</td>
                <td>{customer.id}</td>
                <td>{customer.customer_name}</td>
                <td>{customer.meter_number || '—'}</td>
                <td>{customer.units ?? '—'}</td>
                <td>{customer.status || 'Unpaid'}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEdit(customer)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Customers
