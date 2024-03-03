const Decoration = require('../../models/Products/decorationModel.jsx')
const asyncHandler = require('express-async-handler')

// GET all decoration
//GET /decoration
// Private
const getDecoration = asyncHandler( async (req, res) => {
    const decoration = await Decoration.find().lean()

    if(!decoration.length){
        return res.status(400).json({ message : 'No decoration found'})
    }

    res.json(decoration)
})

// Add decoration
//POST /decoration
// Private
const addDecoration = asyncHandler( async (req, res) => {
    const { name, category, type, price, image } = req.body

    if(!name || !category || !type || !price || !image){
        return res.status(400).json({ message : 'All fields are required.'})
    }

    const decorationObj = { name, category, type, price, image }
    const createDecoration = Decoration.create(decorationObj)

    if(createDecoration){
        res.status(201).json({ message: `New decoration is created.`})
    }else {
        res.status(400).json({ message : 'Invalid decoration data recieved.'})
    }
})

// update decoration
// PATCH /decoration
// Private
const updateDecoration = asyncHandler(async (req, res) => {
    const { id, name, category, type, price, image} = req.body

    if(!name || !category || !type || !price || !image){
        return res.status(400).json({ message : 'All fields are required.'})
    }

    if (!id) {
        return res.status(400).json({ message: 'Decoration ID required.' });
    }

    const decoration = await Decoration.findById(id).exec()

    if(!decoration){
        return res.status(404).json({ message: 'Decoration not found.' });
    }

    decoration.name = name
    decoration.category = category
    decoration.type = type
    decoration.price = price
    decoration.image = image

    const updateDecoration = await decoration.save()

    res.json(`${updateDecoration.name} updated`);
})

// Delete decoration
// DELETE /decoration
// Private
const deleteDecoration = asyncHandler(async (req, res) => {
    const { id } = req.body

    if(!id){
        return res.status(400).json({ message: 'Decoration ID required.'})
    }

    const decoration = await Decoration.findById(id).exec()

    if(!decoration){
        return res.status(400).json({ message: "Decoration not found."})
    }

    const result = await decoration.deleteOne()

    if(!result){
        return res.status(400).json({ message: "Failed to delete."})
    }

    const reply = `Decoration deleted`

    res.json(reply)
})

module.exports = {
    getDecoration,
    addDecoration,
    updateDecoration,
    deleteDecoration,
}