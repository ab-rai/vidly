
const config= require('config')
const express= require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const Joi = require('joi')
const logger = require('./middleware/logger')
const app= express()
const home= require('./routes/home')
const genres= require('./routes/genres')

const startUpDebugger= require('debug')('app:startup')
const dbDebugger= require('debug')('app:db')
app.set('view engine','pug')
app.use('/api/genres',genres)
app.use('/',home)

console.log(`NODE_ENV=${process.env.NODE_ENV}`)

// console.log(`App name=${config.get('name')}`)
// console.log(`host name=${config.get('mail.host')}`)
// console.log(`pass=${config.get('mail.password')}`)



app.use(express.json())
// app.use(logger.log)
// app.use(logger.authenticate)
app.use(helmet())
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('tiny'))
    startUpDebugger('Development Env, Morgan Enable')
}
else if(process.env.NODE_ENV === undefined){
    // app.use(morgan('tiny'))
    console.log('No Env, Morgan Enable')
}
dbDebugger('Connecting to database')
app.get('/',(req,res)=>{
    // res.send('Welcome to Vidly')
    res.render('index',{title:'Vidly',message:'Welcome to Vidly world'})
})
const port = process.env.port || 3000
app.listen(port,()=>console.log(`Listening at port ${port}`))