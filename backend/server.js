
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config();

const { Pool } = pg;
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL configuration
const databaseConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.DB_SSL === "true"
          ? { rejectUnauthorized: false }
          : undefined,
    }
  : {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 5432),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl:
        process.env.DB_SSL === "true"
          ? { rejectUnauthorized: false }
          : undefined,
    };

const pool = new Pool(databaseConfig);

// Database error handling
pool.on("error", (error) => {
  console.error("Database error:", error.message);
});

// API health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Electricity Billing System API is running",
  });
});

// Test database connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS time");

    res.json({
      success: true,
      message: "Database connected successfully!",
      time: result.rows[0].time,
    });
  } catch (error) {
    console.error("Database connection error:", error.message);

    res.status(500).json({
      success: false,
      error: "Database connection failed",
    });
  }
});

// Get all customers
app.get("/customers", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM public.customers ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Get customers error:", error.message);
    res.status(500).json({ error: "Could not get customers" });
  }
});

// Get one customer
app.get("/customers/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM public.customers WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Get customer error:", error.message);
    res.status(500).json({ error: "Could not get customer" });
  }
});

// Add customer
app.post("/customers", async (req, res) => {
  try {
    const { customer_name, meter_number, units, due_date, status } = req.body;

    if (!customer_name || !meter_number) {
      return res.status(400).json({
        error: "Customer name and meter number are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO public.customers
       (customer_name, meter_number, units, due_date, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        customer_name,
        meter_number,
        units ?? 0,
        due_date || null,
        status || "Unpaid",
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Add customer error:", error.message);
    res.status(500).json({ error: "Could not add customer" });
  }
});

// Update customer
app.put("/customers/:id", async (req, res) => {
  try {
    const { customer_name, meter_number, units, due_date, status } = req.body;

    const result = await pool.query(
      `UPDATE public.customers
       SET customer_name = $1,
           meter_number = $2,
           units = $3,
           due_date = $4,
           status = $5
       WHERE id = $6
       RETURNING *`,
      [
        customer_name,
        meter_number,
        units ?? 0,
        due_date || null,
        status || "Unpaid",
        req.params.id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Update customer error:", error.message);
    res.status(500).json({ error: "Could not update customer" });
  }
});

// Delete customer
app.delete("/customers/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM public.customers WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Delete customer error:", error.message);
    res.status(500).json({ error: "Could not delete customer" });
  }
});

// Export app for hosting
export default app;

// Run locally only
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
