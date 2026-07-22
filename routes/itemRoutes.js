const express = require("express");
const router = express.Router();

const {
  addItem,
  getAllItems,
  getItemById,
  deleteItem,
  updateItem,
  getMyItems,
} = require("../controllers/itemController");

const authMiddleware = require("../middleware/authMiddleware");

// PUBLIC
router.get("/", getAllItems);

// IMPORTANT: custom route BEFORE :id
router.get("/my/items", authMiddleware, getMyItems);

// SINGLE ITEM
router.get("/:id", getItemById);

// PROTECTED
router.post("/", authMiddleware, addItem);
router.put("/:id", authMiddleware, updateItem);
router.delete("/:id", authMiddleware, deleteItem);

module.exports = router;