const express = require('express');
const app = express();
const morgan = require('morgan') // a package to log incoming requests in terminal
const bodyParser = require('body-parser') //allows to parse body of incoming request because it's not formatted in node.js and we can use that data, It supports url encoded bodies and json data 


const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/order')

app.use(morgan('dev')) //logger middleware
app.use(bodyParser.urlencoded({extended:false})) //urlencoded. extended: true allows to parse extended bodies with rich data.
app.use(bodyParser.json()) //will extract json data and use it in routes

app.use('/products', productRoutes);
app.use('/orders', orderRoutes)

//hanle errors, stuff that makes it past the router
app.use((req, res, next)=>{
    const error = new Error("Not found") //Error is global object
    error.status = 404
    next(error)
})
app.use((error, req, res, next)=>{
   res.status(error.status || 500);
   res.json({
       error: {
           message: error.message
       }
   }) 
})






module.exports = app;










// app.use((req, res, next)=> {
//     res.status(200).json({
//         message: "HELLO wordl"
//     })
// })