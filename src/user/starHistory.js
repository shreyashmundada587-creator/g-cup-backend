import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  const { data, error } = await supabase
    .from("star_history")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ data });
});

export default router;