const express = require('express');
const swig = require('swig');
const mongoose = require('mongoose');
let bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/lsd', { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error',(err)=>{
	throw err;
});
db.once('open',()=>{
	console.log('connect ok ing...')
});

const app = express();

app.engine('html',swig.renderFile);
app.set('views','./view');
app.set('view engine','html');

app.use(express.static('static'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/',require('./router/index.js'));
app.use('/wish',require('./router/wish.js'));


app.listen(3000, function(){
	console.log("server running in 3000");
})