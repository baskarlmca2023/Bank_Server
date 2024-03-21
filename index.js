// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();

// // Middleware setup
// app.use(cors());
// app.use(express.json());

// // Routes
// app.get("/", function(req,res){
//    res.send("welcome to express"); 
// });
// app.get('/data',function(req,res){
//    Data.find().then((item)=>res.send(item))
// })
// app.post('/create',function(req,res){
//     Data.create(req.body).then((item)=>res.send(item))
// })
// app.put('/update/:id',async(req,res)=>{
//     console.log(req.params.id);
//      console.log(req.body);
//    const amount = req.body.amount;
   
//   const userUpdate= await Data.findByIdAndUpdate(req.params.id,{amount:amount},{new:true,});
//     res.json({
//      data:userUpdate
// })
// })
// app.delete('/delete/:id',async(req,res)=>{
//     console.log(req.params.id);
//     const userDelete= await Data.findByIdAndDelete(req.params.id);
//     res.json({
//      data:userDelete
// })
// })


// mongoose.connect("mongodb+srv://baskar_l:baskar6253@cluster0.e5zjhnp.mongodb.net/").then(console.log("MongoDB Connected"));
// // mongoose.connect("mongodb+srv://baskar_l:baskar6253@cluster0.e5zjhnp.mongodb.net/").then(console.log("MongoDB Connected"));
// var newSchema=new mongoose.Schema({
//     id:Number,
//     name:String,
//     email:String,
//     password:String,
//     amount:Number


// })

// let Data=mongoose.model('mca',newSchema)



// app.listen(8080, function(){
//     console.log('Server running at http://localhost:8000/');
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes
app.get("/", function(req, res){
    res.send("Welcome to Express");
});

// Define your MongoDB Atlas connection URI
// const mongoURI = "mongodb+srv://baskar_l:baskar6253@cluster0.e5zjhnp.mongodb.net/baskar_l";
//const mongoURI = "mongodb://127.0.0.1:27017/";
//mongodb+srv://baskar_l:<password>@cluster0.e5zjhnp.mongodb.net/
const mongoURI="mongodb+srv://baskar_l:baskar@cluster0.e5zjhnp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test"
// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Define your Mongoose Schema
const newSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    amount: Number
});

// Create a Mongoose model based on the schema
const Data = mongoose.model('mca', newSchema);

// CRUD operations
// Get all data
app.get('/data', function(req, res){
    Data.find().then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Create data
app.post('/create', function(req, res){
    Data.create(req.body)
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update data
app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;
   
    try {
        const userUpdate = await Data.findByIdAndUpdate(id, { amount: amount }, { new: true });
        res.json({ data: userUpdate });
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Delete data
app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const userDelete = await Data.findByIdAndDelete(id);
        res.json({ data: userDelete });
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log(`Server running at http://localhost:${port}/`);
});
