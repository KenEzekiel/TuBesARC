const express = require('express')
const controller = require('../controller/controller.js')
const axios = require('axios')

const router = express.Router()

//Render Home
router.get('/', (req, res) => {
    axios.get('http://localhost:3000/post')
    
    .then((response) => {
        res.render('index', {user: response.data})
    })

    .catch((err) => {
        res.send(err.message)
    })
})

// Render add user page
router.get('/add', (req, res) => {
    res.render('addUser')
})

// Render update user page
router.get('/update', (req, res) => {
    
    axios.get(`http://localhost:3000/post`, {params: {id: req.query.id}})
    .then ((response) => {
        console.log(req.query.id)
        res.render('updateUser', {user: response.data})
    })

})

//API and REST API
router.post('/post', controller.post)
router.get('/post', controller.get)
router.delete('/post/:id', controller.del)
router.patch('/post/:id', controller.edit)

module.exports = router