
const postModel = require('../model/Post.js')

// Get home content
const get = (req, res) => {

    if (req.query.id) {
        postModel.findById(req.query.id)

        .then ((data) => {

            if (data) {
                res.json(data)
            }

            else {
                res.status(404).send("User is not found!")
            }
        })

        .catch((err) => {
            res.send(err.message)
        })

        return

    }
    
    postModel.find() 

    .then((data) => {

        res.json(data)
    })

    .catch((err) => {
        res.json({'message': err.message})
    })
}

// submit post
const post = (req, res) => {

    if (req.query.id) {
        postModel.updateOne({_id: req.query.id}, 
            {$set: {
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                status: req.body.status
            }
        })
        .then((response) => {
            res.redirect('/')
        })
        .catch((err) => {
            res.json(err)
        })

        return
    }
 
    const post = new postModel({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    post.save()
    .then(data => {

        res.redirect('/add')

    })
    .catch(err => {
        res.status(500).send(err.message || 'some error occured')
    })

}

// delete user
const del = (req, res) => {

    postModel.remove({_id: req.params.id})
    .then((data) => {
        
        res.redirect('/')
    })
    .catch((err) => {
        res.send(err.message || 'some error occured')
    })
}

// edit user data
const edit = (req, res) => {

    
    postModel.updateOne({_id: req.params.id}, 
        {$set: {
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            status: req.body.status
        }
    })
    .then((data) => {
        res.send('User data edited!')
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports = {get, post, del, edit}