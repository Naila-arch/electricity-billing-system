
const API_URL = "http://localhost:5000";

// Server ke response ko check karna
async function handleResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.details || data.error || `Request failed: ${response.status}`
      );
    }

    return data;
  }

  const text = await response.text();

  throw new Error(
    `Server error (${response.status}): ${
      text.slice(0, 200) || "Invalid server response"
    }`
  );
}

// Saare customers hasil karna
export async function getCustomers() {
  const response = await fetch(`${API_URL}/customers`);
  return handleResponse(response);
}

// Ek customer hasil karna
export async function getCustomerById(id) {
  const response = await fetch(`${API_URL}/customers/${id}`);
  return handleResponse(response);
}

// Naya customer add karna
export async function addCustomer(customer) {
  const response = await fetch(`${API_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  return handleResponse(response);
}

// Customer update karna
export async function updateCustomer(id, customer) {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  return handleResponse(response);
}

// Customer delete karna
export async function deleteCustomer(id) {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}

const service = {
  getCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};

export default service;
