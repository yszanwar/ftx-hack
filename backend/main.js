var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
var cors = require('cors')
var x = 0.6
var max = 500
var invest = 0
var bal = 0
var add = 0;
var withd = 0;


const api = axios.create({
    baseURL: 'https://rzp_test_bEwx7ogwj1sGft:EOaDkTpw9QpQBrpbqnqdswWG@api.razorpay.com/v1/',
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    crossdomain: true
  })


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/transactions', function (req, res) {
    api.get('/payments/?from=1400826740').then((rest)=>{
     sum = 0
      for(i=0; i<Object.keys(rest.data.items).length; i++){
        rest.data.items[i].amount = rest.data.items[i].amount / 100.0
        rest.data.items[i].invested = rest.data.items[i].amount * x;
        rest.data.items[i].num = i;
        sum = sum + rest.data.items[i].amount
        } 
        rest.data.total_invested = sum * x + add - withd;
        rest.data.balance = sum + withd -add;
        rest.data.total_return = sum * x * 0.05;
        
        invest = sum * x
        bal = sum
        add = 0
        withd = 0
        res.send(rest.data);
        res.statusCode = 200;
    });
  })


app.post('/setting', (req, res)=>{
  x = req.body.percent / 100.0
  max = req.body.max
  res.send('done')
  res.statusCode=200
});


app.post('/add', (req, res)=>{
  add =  parseInt(req.body.add)
  res.send('done')
  res.statusCode=200
});

app.post('/with', (req, res)=>{
  withd = parseInt(req.body.with)
  res.send('done')
  res.statusCode=200
});

app.listen(9000);