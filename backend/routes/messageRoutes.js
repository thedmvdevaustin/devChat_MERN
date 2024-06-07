import express from "express"
import protect from '../middleware/protect.js'
import { postMessage } from '../controllers/messageController.js'

const router = express.Router()

router.post('/:id', protect, postMessage) //post message

export default router