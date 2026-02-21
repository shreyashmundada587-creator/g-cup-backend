import express from 'express'
import { supabase } from '../config/supabaseClient.js'

export const starHistory = express.Router()

starHistory.get('/star-history/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const { data, error } = await supabase
      .from('star_history')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})