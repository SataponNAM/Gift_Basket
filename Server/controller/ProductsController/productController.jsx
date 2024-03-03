const Product = require('../../models/Products/productModel.jsx')
const asyncHandler = require('express-async-handler')

// GET all Obj
// Get /product
// Private
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.find().lean()

    if(!product.length){
        return res.status(400).json({ message : 'No product found'}) 
    }

    res.json(product)
})

// Add 
// POST /product
// Private
const addProduct = asyncHandler(async (req, res) => {
    const { name, category, type, price, image } = req.body

    if(!name || !category || !type || !price || !image){
        return res.status(400).json({ message : 'All fields are required.'})
    }

    const proObj = { name, category, type, price, image }
    const createProduct = Product.create(proObj)

    if(createProduct){
        res.status(201).json({ message: `New product is created.`})
    }else {
        res.status(400).json({ message : 'Invalid product data recieved.'})
    }
})

// Update
// PATCH /product
// Private
const updateProduct = asyncHandler(async (req, res) => {
    const { id, name, category, type, price, image} = req.body

    if(!name || !category || !type || !price || !image){
        return res.status(400).json({ message : 'All fields are required.'})
    }

    if (!id) {
        return res.status(400).json({ message: 'Product ID required.' });
    }

    const product = await Product.findById(id).exec()

    if(!product){
        return res.status(404).json({ message: 'Product not found.' });
    }

    product.name = name
    product.category = category
    product.type = type
    product.price = price
    product.image = image

    const updateProduct = await product.save()

    res.json(`${updateProduct.name} updated`);
})

// Delete
// DELETE /product
// Private
const deleteProduct = asyncHandler (async (req, res) => {
    const { id } = req.body

    if(!id){
        return res.status(400).json({ message: 'Product ID required.'})
    }

    const product = await Product.findById(id).exec()

    if(!product){
        return res.status(400).json({ message: "Product not found."})
    }

    const result = await product.deleteOne()

    if(!result){
        return res.status(400).json({ message: "Failed to delete."})
    }

    const reply = `Product deleted`

    res.json(reply)
})

module.exports = {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
}