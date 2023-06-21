const express = require('express');
const mongoose = require('mongoose');
const port = 3000;
const router = express.Router();
const url = 'mongodb://172.17.0.3:27017/main';

mongoose.connect(url); //the end is the db name mongodb://127.0.0.1:27017/main
mongoose.set('debug', true);

const Message = require("./module");

const app = express();
app.use(express.json());

app.post('/message', function (req, res) {
    console.log(`THIS NAME: ${req.body.name}`);
    console.log(url);
    const message = new Message({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        message: req.body.message
      });
      message
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Handling POST requests to /message",
            createdProduct: result
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });

});

app.get('/message', function(req, res) {
  const db = mongoose.connection.useDb(`main`, {
    useCache: true
  });
  // Need to register models every time a new connection is created
  if (!db.models['Message']) {
    db.model('Message', mongoose.Schema({ name: String, message: String}));
  }
  console.log('Find Message from', db.name);
    db.model('Message').find().then(users => res.json(users))
});

app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      });






