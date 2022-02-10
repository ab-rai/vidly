const express= require('express')
const router= express.Router()

let genres=[
    {   'id':1,'name':'Action'},
    {   'id':2,'name':'Comedy'},
    {   'id':3,'name':'Thriller'},
    {   'id':4,'name':'Suspense'}
]

router.post('/',(req,res)=>{
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
router.get('/',(req,res)=>{
    res.send(genres)
})
router.get('/:id',(req,res)=>{
    const genre= genres.find( genre => genre.id=== parseInt(req.params.id))
    if(!genre){
        res.status(404).send(`Can't find genre with id=${req.params.id}`)
    }
    else res.send(genre)
})
router.put('/:id',(req,res)=>{
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
router.delete('/:id',(req,res)=>{
    const genre= genres.find( genre => genre.id=== parseInt(req.params.id))
    if(!genre){
        res.status(404).send(`Can't find genre with id=${req.params.id}`)
    }
    const index= genres.indexOf(genre)
    genres.splice(index,1)
    res.send(genre)
})
function validateGenre(genre){
    const schema= {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre,schema);
}
module.exports = router;