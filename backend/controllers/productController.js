const Product =
  require("../models/Product");


// GET PRODUCTS
const getProducts = async (
  req,
  res
) => {

  try {

    const products =
      await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
};


// ADD PRODUCT
const addProduct = async (
  req,
  res
) => {

  try {

    const {
      title,
      price,
      category,
      stock,
    } = req.body;

    const product =
      await Product.create({

        title,
        price,
        category,
        stock,

      });

    res.status(201).json(product);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
};


// DELETE PRODUCT
const deleteProduct = async (
  req,
  res
) => {

  try {

    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Product deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
    });

  }
};

module.exports = {

  getProducts,
  addProduct,
  deleteProduct,

};