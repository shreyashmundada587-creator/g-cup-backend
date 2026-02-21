import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { supabase } from "../config/supabaseClient.js"

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      })
    }

    const { data: admin, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .single()

    if (error || !admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    const passwordMatch = await bcrypt.compare(password, admin.password)

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    const token = jwt.sign(
      { id: admin.id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    return res.json({
      success: true,
      token
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}