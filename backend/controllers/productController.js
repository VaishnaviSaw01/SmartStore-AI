const Product = require("../models/Product");

// GET PRODUCTS FOR LOGGED IN USER
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ADD PRODUCT FOR LOGGED IN USER
const addProduct = async (req, res) => {
  try {
    const { title, price, category, stock, description, tags, marketingCaption } = req.body;

    const product = await Product.create({
      title,
      price: Number(price),
      category,
      stock: Number(stock),
      description: description || "",
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(",").map(t => t.trim()) : []),
      marketingCaption: marketingCaption || "",
      userId: req.user.id,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { title, price, category, stock, description, tags, marketingCaption } = req.body;

    let product = await Product.findOne({ _id: req.params.id, userId: req.user.id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.title = title !== undefined ? title : product.title;
    product.price = price !== undefined ? Number(price) : product.price;
    product.category = category !== undefined ? category : product.category;
    product.stock = stock !== undefined ? Number(stock) : product.stock;
    product.description = description !== undefined ? description : product.description;
    product.tags = tags !== undefined 
      ? (Array.isArray(tags) ? tags : tags.split(",").map(t => t.trim()))
      : product.tags;
    product.marketingCaption = marketingCaption !== undefined ? marketingCaption : product.marketingCaption;

    await product.save();
    res.json(product);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!product) {
      return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};