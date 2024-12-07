const express = require('express')
const router = express.Router()
const Contact = require('../models/contactModel')


const getContact = async (req, res, next) => {
    let contactToFind
    try {
        contactToFind = await Contact.findById(req.params.id)

        if (contactToFind == null) {
            return res.status(404).json({ message: 'Cannot find contact' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.contactToFind = contactToFind
    next()
}

//get all
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find()
        res.json(contacts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//get one
router.get('/:id', getContact, (req, res) => {
    res.json(res.contacts)
})
//creating one
router.post('/', async (req, res) => {
    const newContact = new Contact({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    })
    try {
        const contactCreated = await newContact.save()
        res.status(201).json(contactCreated)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//updating one
router.patch('/:id', getContact, async (req, res) => {
    if (req.body.name != null) {
        res.contactToFind.name = req.body.name
    }
    if (req.body.phoneNumber != null) {
        res.contactToFind.phoneNumber = req.body.phoneNumber
    }
    if (req.body.email != null) {
        res.contactToFind.email = req.body.phoneNumber
    } 
    try {
        const updatedContact = await res.contactToFind.save()
        res.json(updatedContact)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
//deleting one
router.delete('/:id', getContact, async (req, res) => {
    try {
        await res.contactToFind.deleteOne() 
        res.json({ message: 'deleted contact' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



module.exports = router