const Card = require('../../models/Products/cardModel.jsx')
const asyncHandler = require('express-async-handler')

// get card
// GET /card
// Private
const getCard = asyncHandler(async (req, res) => {
    const card = await Card.find().lean()

    if (!card.length) {
        return res.status(400).json({ message: 'No card found' })
    }

    res.json(card)
})

// Add
// POST / card
// Private
const addCard = asyncHandler(async (req, res) => {
    const { name, color, decoration, price, image } = req.body

    if (!name || !color || !decoration || !price || !image) {
        return res.status(400).json({ message: 'All fields are required.' })
    }

    const cardObject = { name, color, decoration, price, image }
    const createCard = Card.create(cardObject)

    if (createCard) {
        res.status(201).json({ message: `New card is created.` })
    } else {
        res.status(400).json({ message: 'Invalid card data recieved.' })
    }
})

// Update
// PATCH /card
// Private
const updateCard = asyncHandler(async (req, res) => {
    const { id, name, color, decoration, price, image } = req.body

    if (!name || !color || !decoration || !price || !image) {
        return res.status(400).json({ message: 'All fields are required.' })
    }

    if (!id) {
        return res.status(400).json({ message: 'Card ID required.' });
    }

    const card = await Card.findById(id).exec()

    if (!card) {
        return res.status(404).json({ message: 'Card not found.' });
    }

    card.name = name
    card.color = color
    card.decoration = decoration
    card.price = price
    card.image = image

    const updateCard = await card.save()

    res.json(`${updateCard.name} updated`);
})

// Delete
// DELETE /card
// Private
const deleteCard = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Card ID required.' })
    }

    const card = await Card.findById(id).exec()

    if (!card) {
        return res.status(400).json({ message: "Card not found." })
    }

    const result = await card.deleteOne()

    if(!result){
        return res.status(400).json({ message: "Failed to delete."})
    }

    const reply = `Card deleted`

    res.json(reply)
})

module.exports = {
    getCard,
    addCard,
    updateCard,
    deleteCard,
}