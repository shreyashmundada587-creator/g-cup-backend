import { createAdminClient } from '../config/supabaseClient.js'

export const verifyBill = async (req, res) => {

  console.log("🔥 VERIFY BILL HIT")

  const supabase = createAdminClient()

  const { bill_id } = req.body

  const { data, error } = await supabase
    .from('bills')
    .update({ status: 'verified' })   // ✅ FIXED HERE
    .eq('id', bill_id)
    .select()

  if (error) {
    console.log("❌ Supabase Error:", error.message)
    return res.status(400).json({ error: error.message })
  }

  return res.json({
    message: "Bill Verified Successfully",
    data
  })
}