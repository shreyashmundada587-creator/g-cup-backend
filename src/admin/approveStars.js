import { supabase } from "../config/supabaseClient.js"
import crypto from "crypto"

export const approveStars = async (req, res) => {
  try {
    const { bill_id } = req.body

    if (!bill_id) {
      return res.status(400).json({
        success: false,
        message: "bill_id is required"
      })
    }

    const admin_id = req.admin.id
    const idempotencyKey = crypto.randomUUID()

    const { data, error } = await supabase.rpc(
      "approve_bill_atomic",
      {
        p_bill_id: bill_id,
        p_admin_id: admin_id,
        p_idempotency_key: idempotencyKey
      }
    )

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }

    return res.status(200).json(data)

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}