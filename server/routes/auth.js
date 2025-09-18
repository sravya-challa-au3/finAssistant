import express from "express";
import {pool} from "../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

// login
router.post("/login", (req, res) => {
  const {username, password} = req.body;

  const sql = "SELECT * FROM USERS WHERE username = ?"

  pool.query(sql, [username], (err, results) => {
    if(err) {
      return res.status(500).json({message: "Database error", error: err})
    }
    if(results.length === 0) {
      return res.status(401).json({message: "User not found"})
    }
    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password)  
    if(!isMatch) {
      return res.status(401).json({message: "Invalid Credentials"})
    }

    return res.status(201).json({message: "Login success"})
  })
})

// signup
router.post("/signup", (req, res) => {
  console.log("here signup => ", req)
  const {username, password} = req.body;

  if(!username || !password) {
    return res.status(401).json({message: "All fields are required"})
  }

  const hashedPsw = bcrypt.hashSync(password, 10);
  const sql = "INSERT INTO USERS (username, password) VALUES (?, ?)"

  pool.query(sql, [username, hashedPsw], (err, _) => {
    if(err) {
      if(err.code === "ER_DUP_ENTRY") {
        return res.status(401).json({message: "User already exists"})
      }
      return res.status(500).json({message: "Database error", error: err})
    }

    return res.status(201).json({message: "User created"})
  })
})

export default router;