const express = require("express");
const cors = require("cors");
const { pool } = require("./db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/order", async (req, res) => {
  try {
    const { name, table, phone, cart } = req.body;
    const query = "INSERT INTO orders (name, table_number, phone, cart) VALUES ($1, $2, $3, $4)";
    await pool.query(query, [name, table, phone, JSON.stringify(cart)]);
    console.log("✅ Order saved");
    res.status(200).json({ message: "Order received" });
  } catch (err) {
    console.error("❌ Error saving order:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
