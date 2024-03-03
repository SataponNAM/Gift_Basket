const Basket = require('../../models/Products/basketModel.jsx')
const asyncHandler = require('express-async-handler')

// GET all basket
//GET /basket
// Private
const getBasket = asyncHandler( async (req, res) => {
    const basket = await Basket.find().lean()

    if(!basket.length){
        return res.status(400).json({ message : 'No basket found'})
    }

    res.json(basket)
})

// Add basket
//POST /basket
// Private
const addBasket = asyncHandler( async (req, res) => {
    const { name, price, image } = req.body

    if(!name || !price || !image){
        return res.status(400).json({ message : 'All fields are required.'})
    }

    const basketObj = { name, price, image }
    const createBasket = Basket.create(basketObj)

    if(createBasket){
        res.status(201).json({ message: `New basket is created.`})
    }else {
        res.status(400).json({ message : 'Invalid basket data recieved.'})
    }
})

// update basket
// PATCH /basket
// Private
const updateBasket = asyncHandler(async (req, res) => {
    const { id, name, price, image } = req.body

    if(!name || !price || !image){
        return res.status(400).json({ message : 'All fields are required.'})
    }

    if (!id) {
        return res.status(400).json({ message: 'Basket ID required.' });
    }

    const basket = await Basket.findById(id).exec()

    if(!basket){
        return res.status(404).json({ message: 'Basket not found.' });
    }

    basket.name = name
    basket.price = price
    basket.image = image

    const updateBasket = await basket.save()

    res.json(`${updateBasket.name} updated`);
})

// Delete basket
// DELETE /basket
// Private
const deleteBasket = asyncHandler(async (req, res) => {
    const { id } = req.body

    if(!id){
        return res.status(400).json({ message: 'Basket ID required.'})
    }

    const basket = await Basket.findById(id).exec()

    if(!basket){
        return res.status(400).json({ message: "Basket not found."})
    }

    const result = await basket.deleteOne()

    if(!result){
        return res.status(400).json({ message: "Failed to delete."})
    }

    const reply = `Basket deleted`

    res.json(reply)
})

module.exports = {
    getBasket,
    addBasket,
    updateBasket,
    deleteBasket
}