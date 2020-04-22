const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const app = express();

app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, 'views')); //default 'views'
 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use(require('./routes/index'));


// 404 handler
app.use((req, res, next) => {
  res.status(404).render('404');
});




app.listen(3000, () => console.log('server listen on port 3000'));