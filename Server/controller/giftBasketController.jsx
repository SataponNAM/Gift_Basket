const GiftBasket = require('../models/giftBasketModel.jsx')
const asyncHandler = require('express-async-handler')

// GET all basket
//GET /basket
// Private
const getGiftBasket = asyncHandler( async (req, res) => {
    const giftBasket = await GiftBasket.find().lean()

    if(!giftBasket.length){
        return res.status(400).json({ message : 'No gift basket found'})
    }

    res.json(giftBasket)
})

// Add basket
//POST /basket
// Private
const addGiftBasket = asyncHandler( async (req, res) => {
    const { user, basket, decoration, product, card, cardText, totalPrice } = req.body

    if(!user || !basket || !decoration || !product || !card || !cardText || !totalPrice){
        return res.status(400).json({ message : 'All fields are required.'})
    }

    const giftBasketObj = { user, basket, decoration, product, card, cardText, totalPrice }
    const createGiftBasket = await GiftBasket.create(giftBasketObj)

    if(createGiftBasket){
        res.status(201).json({message: `New gift basket is created.`, id: createGiftBasket._id})
    }else {
        res.status(400).json({ message : 'Invalid gift basket data recieved.'})
    }
})

// update basket
// PATCH /basket
// Private
const updateGiftBasket = asyncHandler(async (req, res) => {
    const { id, basket, decoration, product, card, cardText, totalPrice } = req.body

    if(!basket || !decoration || !product || !card || !cardText || !totalPrice){
        return res.status(400).json({ message : 'All fields are required.'})
    }

    if (!id) {
        return res.status(400).json({ message: 'Gift Basket ID required.' });
    }

    const giftBasket = await GiftBasket.findById(id).exec()

    if(!giftBasket){
        return res.status(404).json({ message: 'Gift Basket not found.' });
    }

    giftBasket.basket = basket
    giftBasket.decoration = decoration
    giftBasket.product = product
    giftBasket.card = card
    giftBasket.cardText = cardText
    giftBasket.totalPrice = totalPrice

    const updateGiftBasket = await giftBasket.save()

    res.json(`${updateGiftBasket.name} updated`);
})

// Delete basket
// DELETE /basket
// Private
const deleteGiftBasket = asyncHandler(async (req, res) => {
    const { id } = req.body

    if(!id){
        return res.status(400).json({ message: 'Gift Basket ID required.'})
    }

    const giftBasket = await GiftBasket.findById(id).exec()

    if(!giftBasket){
        return res.status(400).json({message: "Gift Basket not found."})
    }

    const result = await giftBasket.deleteOne()

    if(!result){
        return res.status(400).json({ message: "Failed to delete."})
    }

    const reply = `Gift Basket deleted`

    res.json(reply)
})

module.exports = {
    getGiftBasket,
    addGiftBasket,
    updateGiftBasket,
    deleteGiftBasket
}