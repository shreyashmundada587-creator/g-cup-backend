import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { supabase } from "../config/supabaseClient.js"

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      })
    }

    const { data: user, error } = await supabase
      .from("users_auth")
      .select("*")
      .eq("email", email)
      .single()

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    const token = jwt.sign(
      { id: user.id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.json({
      success: true,
      token
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}