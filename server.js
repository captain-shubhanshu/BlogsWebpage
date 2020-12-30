const express = require('express')
const path = require('path')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'hbs')
app.use('/', express.static(path.join(__dirname, 'static')))

let blogs = []

app.get('/blog', (req, res) => {
    if (req.query.mode == 'json')
        res.send(blogs)
    else {
        res.render('home', {
            title: 'Home',
            blogs
        })
    }
})

app.post('/blog', (req, res) => {
    blog = {
        title: req.body.title,
        category: req.body.category,
        email: req.body.email,
        author: req.body.author,
        content: req.body.content,
        date: req.body.date,
    }
    blogs.push(blog)
    res.redirect('/blog')
})

app.listen(4444, () => {
    console.log('server started at http://localhost:4444')
})