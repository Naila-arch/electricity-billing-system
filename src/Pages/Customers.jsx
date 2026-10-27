
import { useEffect, useState } from "react";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    customer_name: "",
    meter_number: "",
    units: "",
    due_date: "",
    status: "Unpaid",
  });

  const API_URL = "http://localhost:5000/customers";

  // Get all customers from the database
  async function fetchCustomers() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Customers load nahi ho sake.");
      }

      setCustomers(data);
    } catch (err) {
      setError(err.message || "Backend se connection nahi ho raha.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Update form values when the user types
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  // Clear the form
  function resetForm() {
    setFormData({
      customer_name: "",
      meter_number: "",
      units: "",
      due_date: "",
      status: "Unpaid",
    });

    setEditingId(null);
  }

  // Add a new customer or update an existing customer
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (
      !formData.customer_name.trim() ||
      !formData.meter_number.trim()
    ) {
      setError("Customer name aur meter number zaroori hain.");
      return;
    }

    const customerData = {
      customer_name: formData.customer_name.trim(),
      meter_number: formData.meter_number.trim(),
      units: Number(formData.units) || 0,
      due_date: formData.due_date || null,
      status: formData.status,
    };

    try {
      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.details ||
          "Customer save nahi ho saka."
        );
      }

      resetForm();
      await fetchCustomers();
    } catch (err) {
      setError(err.message || "Customer save nahi ho saka.");
    }
  }

  // Put the selected customer's details into the form
  function handleEdit(customer) {
    setEditingId(customer.id);

    setFormData({
      customer_name: customer.customer_name || "",
      meter_number: customer.meter_number || "",
      units: customer.units ?? "",
      due_date: customer.due_date
        ? String(customer.due_date).slice(0, 10)
        : "",
      status: customer.status || "Unpaid",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Delete a customer
  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Kya aap waqai is customer ko delete karna chahte hain?"
    );

    if (!confirmed) return;

    setError("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.details ||
          "Customer delete nahi ho saka."
        );
      }

      if (editingId === id) {
        resetForm();
      }

      await fetchCustomers();
    } catch (err) {
      setError(err.message || "Customer delete nahi ho saka.");
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Customer Management</h1>

      <p style={styles.subtitle}>
        Electricity Billing System — Manage your customers
      </p>

      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      <div style={styles.card}>
        <h2 style={styles.formHeading}>
          {editingId ? "Edit Customer" : "Add New Customer"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>
            <div style={styles.field}>
              <label style={styles.label}>Customer Name *</label>
              <input
                style={styles.input}
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                placeholder="Enter customer name"
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Meter Number *</label>
              <input
                style={styles.input}
                type="text"
                name="meter_number"
                value={formData.meter_number}
                onChange={handleChange}
                placeholder="e.g. MTR002"
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Units Consumed</label>
              <input
                style={styles.input}
                type="number"
                name="units"
                value={formData.units}
                onChange={handleChange}
                placeholder="Enter units"
                min="0"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Due Date</label>
              <input
                style={styles.input}
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Payment Status</label>
              <select
                style={styles.input}
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div style={styles.buttonRow}>
            <button style={styles.primaryButton} type="submit">
              {editingId ? "Update Customer" : "Add Customer"}
            </button>

            {editingId && (
              <button
                style={styles.cancelButton}
                type="button"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={styles.card}>
        <div style={styles.tableHeader}>
          <h2 style={styles.formHeading}>All Customers</h2>

          <button
            style={styles.refreshButton}
            type="button"
            onClick={fetchCustomers}
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p>Loading customers...</p>
        ) : customers.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Customer Name</th>
                  <th style={styles.th}>Meter Number</th>
                  <th style={styles.th}>Units</th>
                  <th style={styles.th}>Due Date</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td style={styles.td}>{customer.id}</td>
                    <td style={styles.td}>
                      {customer.customer_name}
                    </td>
                    <td style={styles.td}>
                      {customer.meter_number}
                    </td>
                    <td style={styles.td}>{customer.units}</td>
                    <td style={styles.td}>
                      {customer.due_date
                        ? String(customer.due_date).slice(0, 10)
                        : "—"}
                    </td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.status,
                          backgroundColor:
                            customer.status === "Paid"
                              ? "#dcfce7"
                              : customer.status === "Pending"
                              ? "#fef3c7"
                              : "#fee2e2",
                          color:
                            customer.status === "Paid"
                              ? "#166534"
                              : customer.status === "Pending"
                              ? "#92400e"
                              : "#991b1b",
                        }}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <button
                          style={styles.editButton}
                          type="button"
                          onClick={() => handleEdit(customer)}
                        >
                          Edit
                        </button>

                        <button
                          style={styles.deleteButton}
                          type="button"
                          onClick={() => handleDelete(customer.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "24px",
    color: "#1f2937",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },
  heading: {
    margin: "0 0 8px",
    fontSize: "28px",
  },
  subtitle: {
    color: "#64748b",
    marginBottom: "24px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    overflow: "hidden",
  },
  formHeading: {
    marginTop: 0,
    fontSize: "20px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },
  label: {
    fontWeight: "bold",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px",
    border: "1px solid #cbd5e1",
    borderRadius: "7px",
    fontSize: "14px",
    backgroundColor: "#ffffff",
  },
  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  primaryButton: {
    padding: "11px 18px",
    border: "none",
    borderRadius: "7px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  cancelButton: {
    padding: "11px 18px",
    border: "none",
    borderRadius: "7px",
    backgroundColor: "#64748b",
    color: "#ffffff",
    cursor: "pointer",
  },
  refreshButton: {
    padding: "9px 14px",
    border: "none",
    borderRadius: "7px",
    backgroundColor: "#0f766e",
    color: "#ffffff",
    cursor: "pointer",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  tableWrapper: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    whiteSpace: "nowrap",
  },
  th: {
    padding: "12px",
    backgroundColor: "#eff6ff",
    borderBottom: "1px solid #cbd5e1",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #e2e8f0",
  },
  status: {
    padding: "5px 9px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  actionButtons: {
    display: "flex",
    gap: "8px",
  },
  editButton: {
    padding: "7px 10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "7px 10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    cursor: "pointer",
  },
  error: {
    padding: "12px",
    marginBottom: "18px",
    borderRadius: "7px",
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    overflowWrap: "anywhere",
  },
};

export default Customers;
