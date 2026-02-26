import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { name }
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: "User created successfully", data });
});

export default router;