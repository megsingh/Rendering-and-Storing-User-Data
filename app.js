var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');


var app = express()

app.use(express.static(path.resolve(__dirname,'public')))
app.use(bodyParser.urlencoded({extended: false}))

app.set("views","./views")
app.set("view engine","ejs")

var url = 'mongodb://localhost:27017';
var client  = new MongoClient(url)


app.listen(3000,()=>{
    console.log(`listening on port ${3000}`);
})

// var dbConn = client.connect();
// var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017');
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('feedbacks');

  app.post('/post-feedback',(req,res)=>{
      collection.insertOne(req.body)
      //.then(
      //res.send('data received:\n' + JSON.stringify(req.body)))
})

  app.get('/view-feedbacks',(req,res)=>{
    collection.find({}).toArray().then((entries)=>{
        console.log(entries);
        res.render("table.ejs",{entries})
    })
    
            })

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)








