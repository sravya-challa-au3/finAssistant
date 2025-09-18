import express from "express";
import cors from "cors";
import "dotenv/config";
import {pool} from "./db.js";
import authRouter from "./routes/auth.js";

const app = express()

app.use(cors({ origin: "http://localhost:3000"}));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.url, req.method, res)
  next()
})

// Auth routes
app.use("/api/auth", authRouter);

// DB check
app.get('/db/ping', (_, res) => {
  try {
    const rows =  pool.query("SELECT *")
    res.json({ ok: true, now: rows })
  } catch(err) {
    console.log("error: ", err)
    res.status(500).json({error: err.message, ok: false})
  }
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on - http://localhost:${process.env.PORT}` )
})