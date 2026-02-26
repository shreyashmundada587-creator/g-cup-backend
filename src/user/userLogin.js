import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const userId = data.user.id;
  let role = null;

  // Check carpenters table
  const { data: carpenter } = await supabase
    .from("carpenters")
    .select("*")
    .eq("user_id", userId)   // ✅ FIXED HERE
    .single();

  if (carpenter) {
    role = "carpenter";
  }

  // Check staff_profiles
  if (!role) {
    const { data: staff } = await supabase
      .from("staff_profiles")
      .select("*")
      .eq("user_id", userId)  // also check this column name
      .single();

    if (staff) {
      role = "staff";
    }
  }

  // Check admins
  if (!role) {
    const { data: admin } = await supabase
      .from("admins")
      .select("*")
      .eq("user_id", userId)  // also check column name
      .single();

    if (admin) {
      role = "admin";
    }
  }

  if (!role) {
    return res.status(403).json({ error: "User role not found" });
  }

  res.json({
    message: "Login successful",
    role: role,
    access_token: data.session.access_token,
    user: data.user,
  });
});

export default router;