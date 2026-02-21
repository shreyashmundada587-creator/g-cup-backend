import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import rateLimit from "express-rate-limit"

import { approveStars } from "./src/admin/approveStars.js"
import { verifyBill } from "./src/admin/verifyBill.js"
import { adminLogin } from "./src/admin/adminLogin.js"

import { redeemStars } from "./src/user/redeemStars.js"
import { starHistory } from "./src/user/starHistory.js"
import { userSignup } from "./src/user/userSignup.js"
import { userLogin } from "./src/user/userLogin.js"

import { adminMiddleware } from "./src/middleware/adminMiddleware.js"
import { userMiddleware } from "./src/middleware/userMiddleware.js"

dotenv.config()

const app = express()

// ================= SECURITY =================

app.use(helmet())

app.use(cors({
  origin: true,   // change to frontend URL in production
  credentials: true
}))

app.use(express.json())

// ================= RATE LIMITING =================

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false
})

app.use(limiter)

// ================= ADMIN ROUTES =================

app.post("/admin/login", adminLogin)
app.post("/admin/approve", adminMiddleware, approveStars)
app.post("/admin/verify", adminMiddleware, verifyBill)

// ================= USER AUTH ROUTES =================

app.post("/user/signup", userSignup)
app.post("/user/login", userLogin)

// ================= USER PROTECTED ROUTES =================

app.post("/user/redeem", userMiddleware, redeemStars)
app.get("/user/history/:user_id", userMiddleware, starHistory)

// ================= HEALTH CHECK =================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "G-CUP API Running"
  })
})

// ================= SERVER =================

const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})