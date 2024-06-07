import express from "express"
import protect from "../middleware/protect.js"
import { getConversation, getAllConversations, getAllUsers } from "../controllers/conversationController.js"

const router = express.Router()

router.get("/", protect, getAllConversations)
router.get("/users", protect, getAllUsers)
router.get("/:id", protect, getConversation)

export default router