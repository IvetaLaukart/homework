
const express = require('express')
const path = require('path')

const {post} = require('./text')

const PORT = 3000

const server = express()

server.set('view engine', 'hbs')
server.set("views", path.join(__dirname, 'src', 'views'))

server.use(express.urlencoded({extended: true}))


server.get('/', (request, response) => {
  const queryParameter = request.query
 
  if(queryParameter.limit !== undefined && Number.isNaN(+queryParameter.limit)=== false) {
    post.newpost = post.newpost.slice(0, queryParameter.limit)
  } 
  if(queryParameter.reverse !== undefined){
    post.newpost = post.newpost.reverse()
  }
  response.render('main', {writeText: post.newpost})
})


server.post('/newpost', (req, res) => {
  const dataFromPost = req.body
  post.newpost.push(dataFromPost)
res.redirect('/')
})

server.get('*', (req,res) => {
res.render('404')
})

server.listen(PORT, () => {
console.log(`Server has been started on port: ${PORT}`)
})