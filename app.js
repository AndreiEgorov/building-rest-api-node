const express = require('express');
const app = express();
const morgan = require('morgan'); // a package to log incoming requests in terminal
const bodyParser = require('body-parser'); //allows to parse body of incoming request because it's not formatted in node.js and we can use that data, It supports url encoded bodies and json data
const mongoose = require('mongoose'); //allows to connect with MONGO DB

mongoose.connect(
  'mongodb://andrei-egorov:' +
    process.env.MONGO_ATLAS_PW +
    '@cluster0-shard-00-00-nt2cx.mongodb.net:27017,cluster0-shard-00-01-nt2cx.mongodb.net:27017,cluster0-shard-00-02-nt2cx.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
  //   { useMongoClient: true },
  { useNewUrlParser: true },
);

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');

app.use(morgan('dev')); //logger middleware
app.use(bodyParser.urlencoded({ extended: false })); //urlencoded. extended: true allows to parse extended bodies with rich data.
app.use(bodyParser.json()); //will extract json data and use it in routes

//prevent CORS errors
app.use((req, res, next) => {
  //adding headers to response, !not sending response, but adjusting its headers
  res.header('Access-Control-Allow-Origin', '*'); //CORS error often complains that "no Access-Control... is present", so I added it here. The * is a value to give access to any orignin, not just certain url
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  ); //define what headers we want to accept
  if (res.method === 'OPTIONS') {
    //checking if method equals to OPTIONS, browser checks if you can make this request
    res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next(); //next so that other routes could take over
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//hanle errors, stuff that makes it past the router
app.use((req, res, next) => {
  const error = new Error('Not found'); //Error is global object
  error.status = 404;
  next(error);
});


app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;

// app.use((req, res, next)=> {
//     res.status(200).json({
//         message: "HELLO wordl"
//     })
// })
