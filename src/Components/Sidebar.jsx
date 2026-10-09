
function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    "Dashboard",
    "Invoices",
    "Customers",
    "Products",
    "Reports",
    "Settings",
  ]

  return (
    <div className="sidebar">
      <h2>Electricity Billing</h2>

      {menuItems.map((item) => (
        <p
          key={item}
          onClick={() => setActivePage(item)}
          style={{
            backgroundColor:
              activePage === item ? "#2563eb" : "transparent",
          }}
        >
          {item}
        </p>
      ))}
    </div>
  )
}

export default Sidebar

