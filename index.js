let genres=[
    {
        'id':1,
        'name':'Action'
    },
    {
        'id':2,
        'name':'Comedy'
    },
    {
        'id':3,
        'name':'Thriller'
    },
    {
        'id':4,
        'name':'Suspense'
    }
]
const express= require('express')
const Joi = require('joi')
const app= express()

app.use(express.json())
app.get('/',(req,res)=>{
    res.send('Welcome to Vidly')
})
app.post('/api/genres',(req,res)=>{
    const {error} = validateGenre(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
        return
    }
    const genre={
        id: genres.length+1,
        name: req.body.name
    }
    genres.push(genre)
    res.send(genre)
})
app.get('/api/genres',(req,res)=>{
    res.send(genres)
})
app.get('/api/genres/:id',(req,res)=>{
    const genre= genres.find( genre => genre.id=== parseInt(req.params.id))
    if(!genre){
        res.status(404).send(`Can't find genre with id=${req.params.id}`)
    }
    else res.send(genre)
})
app.put('/api/genres/:id',(req,res)=>{
    const genre= genres.find( genre => genre.id=== parseInt(req.params.id))
    if(!genre){
        res.status(404).send(`Can't find genre with id=${req.params.id}`)
    }
    const {error} = validateGenre(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
        return
    }
    genre.name=req.body.name
    res.send(genre)
    
})
app.delete('/api/genres/:id',(req,res)=>{
    const genre= genres.find( genre => genre.id=== parseInt(req.params.id))
    if(!genre){
        res.status(404).send(`Can't find genre with id=${req.params.id}`)
    }
    const index= genres.indexOf(genre)
    genres.splice(index,1)
    res.send(genre)
})
const port = process.env.port || 3000
app.listen(port,()=>console.log(`Listening at port ${port}`))
function validateGenre(genre){
    const schema= {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre,schema);
}