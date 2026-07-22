const Item = require("../models/Item");

// ===========================
// ADD ITEM
// ===========================
const addItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      location,
      date,
      contact,
      image,
    } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !type ||
      !location ||
      !date ||
      !contact
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const newItem = await Item.create({
      title,
      description,
      category,
      type,
      location,
      date,
      contact,
      image: image || "",
      postedBy: req.user ? req.user._id : null,
    });

    return res.status(201).json({
      success: true,
      message: "Item added successfully",
      item: newItem,
    });
  } catch (error) {
    console.log("ADD ITEM ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// GET ALL ITEMS
// ===========================
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate("postedBy", "name email department")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    console.log("GET ALL ITEMS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// GET SINGLE ITEM
// ===========================
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate(
      "postedBy",
      "name email department"
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    return res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.log("GET ITEM ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// DELETE ITEM
// ===========================
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    await item.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.log("DELETE ITEM ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// UPDATE ITEM
// ===========================
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.log("UPDATE ITEM ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// MY ITEMS (IMPORTANT FIX)
// ===========================
const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ postedBy: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    console.log("MY ITEMS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===========================
// EXPORT ALL
// ===========================
module.exports = {
  addItem,
  getAllItems,
  getItemById,
  deleteItem,
  updateItem,
  getMyItems,
};