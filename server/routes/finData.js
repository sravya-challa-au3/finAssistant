import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/submit", (req, res) => {
  const {income, expenses, savings, tax_bracket, goals} = req.body;

  const sql = `INSERT INTO FinancialData (income, expenses, savings, tax_bracket, goals) VALUES (?, ?, ?, ?, ?)`;

  pool.query(sql, [income, expenses, savings, tax_bracket, goals], (err, result) => {
    if(err) {
      console.log("debug err server ", err)
      res.status(500).json({message: "Database error"})
    } else {
      res.status(201).json({message: "Financial data saved"})
    }
  })
})

export default router;