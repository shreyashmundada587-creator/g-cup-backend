import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { supabase } from "../config/supabaseClient.js"

export const userSignup = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const { data: newUser, error } = await supabase
      .from("users_auth")
      .insert([{ email, password: hashedPassword }])
      .select()
      .single()

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }

    // Also create balance record in users table
    await supabase.from("users").insert([
      { id: newUser.id, stars: 0 }
    ])

    const token = jwt.sign(
      { id: newUser.id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.status(201).json({
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