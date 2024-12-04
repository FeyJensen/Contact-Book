const express = require('express')
const router = express.Router()

//get all
router.get('/', (req, res) => {
 res.send('Hello world')
})
//get one
router.get('/:id', (req, res) => {
    
})
//creating one
router.post('/', (req, res) => {
    
})
//updating one
router.patch('/:id', (req, res) => {
    
})
//deleting one
router.delete('/:id', (req, res) => {
    
})

module.exports = router