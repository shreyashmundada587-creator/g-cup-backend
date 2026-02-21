import { supabase } from "../../supabaseClient.js"

export const getStarHistory = async (req, res) => {
  try {
    const { user_id } = req.params

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "user_id is required"
      })
    }

    // Check if user exists
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("id", user_id)
      .single()

    if (userError || !user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    // Fetch transaction history
    const { data: transactions, error: txError } = await supabase
      .from("star_transactions")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false })

    if (txError) {
      return res.status(500).json({
        success: false,
        message: txError.message
      })
    }

    return res.status(200).json({
      success: true,
      total_transactions: transactions.length,
      transactions
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}