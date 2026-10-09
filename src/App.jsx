
import { useState } from 'react'
import './App.css'

import Sidebar from './Components/Sidebar'
import Dashboard from './Pages/Dashboard'
import Customers from './Pages/Customers'
import Invoices from './Pages/Invoices'
import Products from './Pages/Products.jsx'
import Reports from './Pages/Reports'
import Settings from './Pages/Settings'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')

  function showPage() {
    if (activePage === 'Dashboard') {
      return <Dashboard />
    }

    if (activePage === 'Customers') {
      return <Customers />
    }

    if (activePage === 'Invoices') {
      return <Invoices />
    }

    if (activePage === 'Products') {
      return <Products />
    }

    if (activePage === 'Reports') {
      return <Reports />
    }

    if (activePage === 'Settings') {
      return <Settings />
    }

    return <h1>Page not found</h1>
  }

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main style={{ flex: 1, padding: '30px', minWidth: 0 }}>
        {showPage()}
      </main>
    </div>
  )
}

export default App

