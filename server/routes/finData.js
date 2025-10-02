import express from "express";
import { pool } from "../db.js";
import openai from "../ai/openai.js"

const router = express.Router();

router.post("/submit", async (req, res) => {
  const {income, expenses, savings, tax_bracket, goals} = req.body;

  const sql = `INSERT INTO FinancialData (income, expenses, savings, tax_bracket, goals) VALUES (?, ?, ?, ?, ?)`;

  pool.query(sql, [income, expenses, savings, tax_bracket, goals], async (err, result) => {
    if(err) {
      console.log("debug err server ", err)
      res.status(500).json({message: "Database error"})
    } else {
      try {
        const prompt = `
        You are a financial assistant. Given this user data:
        - Income: ₹${income}
        - Monthly Expenses: ₹${expenses}
        - Yearly Tax: ₹${tax_bracket}
        - Financial Goals: ${goals}
        
        Generate a personalized financial plan:
        1. Budget distribution (% for essentials, savings, investments).
        2. Tips to reduce unnecessary expenses.
        3. Investment suggestions for someone with moderate risk appetite.
        4. Timeline estimates for each goal.
        Make it short and actionable.
        `;
    
        const openAIRes = await openai.chat.completions.create({
          model: "gpt-5-nano",
          messages: [{role: "user", content: prompt}],
          temperature: 0.7
        })
        const plan = openAIRes.choices[0].message.content;
        res.status(200).json({ message: "Saved and generated", plan });
      } catch(err) {
        console.log("openai err", err)
        res.status(500).json({message: "Something went wrong"})
      }
    }
  })
})

export default router;