import express from "express";
import supabase from "../config/supabaseClient.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { bill_id, status } = req.body;

  const { data, error } = await supabase
    .from("bills")
    .update({ status })
    .eq("id", bill_id);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: "Bill verified", data });
});

export default router;