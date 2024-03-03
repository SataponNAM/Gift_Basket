const Cart = require('../models/cartModel.jsx')
const GiftBasket = require('../models/giftBasketModel.jsx')
const asyncHandler = require('express-async-handler')

// GET all basket
//GET /basket
// Private
const getCart = asyncHandler( async (req, res) => {
    const cart = await Cart.find().lean()

    if(!cart.length){
        return res.status(400).json({ message : 'No cart found'})
    }

    res.json(cart)
})

// Add basket
//POST /basket
// Private
const addCart = asyncHandler(async (req, res) => {
    const { giftbasket, user } = req.body;

    if (!user || !giftbasket ) {
        return res.status(400).json({ message: 'Invalid cart data.' });
    }

    try {
        const createCart = await Cart.create({
            giftbasket,
            user
        });

        if (createCart) {
            res.status(201).json({ message: 'New cart is created.' });
        } else {
            res.status(400).json({ message: 'Invalid cart data received.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// update basket
// PATCH /basket
// Private
const updateCart = asyncHandler(async (req, res) => {
    const { id, giftbasket, user } = req.body

    if(!giftbasket || !user){
        return res.status(400).json({ message : 'All fields are required.'})
    }

    if (!id) {
        return res.status(400).json({ message: 'Cart ID required.' });
    }

    const cart = await Cart.findById(id).exec()

    if(!cart){
        return res.status(404).json({ message: 'Cart not found.' });
    }

    cart.giftBasket.push(giftbasket)

    const updateCart = await cart.save()

    res.json(`${updateCart.id} updated`);
})

// Delete basket
// DELETE /basket
// Private
const deleteCart = asyncHandler(async (req, res) => {
    const { id } = req.body

    if(!id){
        return res.status(400).json({ message: 'Cart ID required.'})
    }

    const cart = await Cart.findById(id).exec()

    if(!cart){
        return res.status(400).json({ message: "Cart not found."})
    }

    const result = await cart.deleteOne()

    if(!result){
        return res.status(400).json({ message: "Failed to delete."})
    }

    const reply = `Cart deleted`

    res.json(reply)
})

module.exports = {
    getCart,
    addCart,
    updateCart,
    deleteCart
}