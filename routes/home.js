const express= require('express')
const router= express.Router()
router.get('/',(req,res)=>{
    // res.send('Welcome to Vidly')
    res.render('index',{title:'Vidly',message:'Welcome to Vidly world'})
})

module.exports = router;