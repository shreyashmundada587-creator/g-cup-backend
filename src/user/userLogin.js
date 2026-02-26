import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // Step 1: Login with Supabase Auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const userId = data.user.id;
  let role = null;

  // Step 2: Check carpenters table
  const { data: carpenter } = await supabase
    .from("carpenters")
    .select("*")
    .eq("id", userId)
    .single();

  if (carpenter) {
    role = "carpenter";
  }

  // Step 3: Check staff_profiles table
  if (!role) {
    const { data: staff } = await supabase
      .from("staff_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (staff) {
      role = "staff";
    }
  }

  // Step 4: Check admins table
  if (!role) {
    const { data: admin } = await supabase
      .from("admins")
      .select("*")
      .eq("id", userId)
      .single();

    if (admin) {
      role = "admin";
    }
  }

  // If no role found
  if (!role) {
    return res.status(403).json({ error: "User role not found" });
  }

  // Step 5: Return custom response
  res.json({
    message: "Login successful",
    role: role,
    access_token: data.session.access_token,
    user: data.user,
  });
});

export default router;