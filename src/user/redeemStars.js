import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { user_id, stars } = req.body;

  const { data, error } = await supabase
    .from("star_history")
    .insert([{ user_id, stars, type: "redeem" }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: "Stars redeemed successfully", data });
});

export default router;