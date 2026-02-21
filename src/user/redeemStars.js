import { supabase } from "../config/supabaseClient.js"

export const redeemStars = async (req, res) => {
  try {
    const { user_id, stars } = req.body

    if (!user_id || !stars) {
      return res.status(400).json({
        success: false,
        message: "user_id and stars required"
      })
    }

    const { data, error } = await supabase.rpc(
      "redeem_stars_atomic",
      {
        p_user_id: user_id,
        p_stars: stars
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