var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const client_data = require('./model/client');
var methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/form_data')

var app = express()

app.use(express.static(path.resolve(__dirname,'public')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.set("views","./views")
app.set("view engine","ejs")


app.post('/users/add', async (req,res)=>{
    const data = await client_data.create({
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment
  })
  console.log(data);
})

app.get('/users/view',async (req,res)=>{
  const data = await client_data.find()
  console.log(data);
  res.render("table.ejs",{data})
  })

app.delete("/users/:id/delete", async (req, res) => {
    await client_data.deleteOne({_id: req.params.id});
    res.redirect("/users/view");
})

app.listen(3000,()=>{
  console.log(`listening on port ${3000}`);
})








