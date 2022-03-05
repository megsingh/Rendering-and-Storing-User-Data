var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
// const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
const client_data = require('./model/client');

mongoose.connect('mongodb://localhost:27017/form_data')


var app = express()

app.use(express.static(path.resolve(__dirname,'public')))
app.use(bodyParser.urlencoded({extended: false}))

app.set("views","./views")
app.set("view engine","ejs")

// var url = 'mongodb://localhost:27017';
// var client  = new MongoClient(url)




// var dbConn = client.connect();
// var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017');
// const dbName = 'myProject';

// async function main() {
  // Use connect method to connect to the server
  // await client.connect();
  // console.log('Connected successfully to server');
  // const db = client.db(dbName);
  // const collection = db.collection('feedbacks');

  app.post('/post-feedback', async (req,res)=>{
      const data = await client_data.create({
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment
    })

    console.log(data);
      // collection.insertOne(req.body)
      //.then(
      //res.send('data received:\n' + JSON.stringify(req.body)))
})

  app.get('/view-feedbacks',async (req,res)=>{
    const data = await client_data.find()
    console.log(data);
    res.render("table.ejs",{data})
    // collection.find({}).toArray().then((entries)=>{
    //     console.log(entries);
    //     res.render("table.ejs",{entries})
    // })
    })

//   return 'done.';
// }

// main()
//   .then(console.log)
//   .catch(console.error)

app.listen(3000,()=>{
  console.log(`listening on port ${3000}`);
})








