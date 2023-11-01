const express = require('express'); //express module 가져오기
const app = express();
const port = 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://twkim7683:charls4740@boilerplate.13bahyi.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp')
  .then(() => console.log('MongoDb Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World! 안녕하세요~~'));

app.listen(port, () => console.log(`Example app listening on port ${port}`));