const express =require('express');
const ejs =require('ejs')
const path = require('path');
const app = express()
const expressLayout =require('express-ejs-layouts');
// const PORT = process.env.PORT || 3000

app.use(express.json());

//server static files
app.use(express.static("public"));




//set Template engine 
app.use(expressLayout)
app.set('views',path.join(__dirname,'resources','views'))
 app.set('view engine', 'ejs')


 app.get("/",(req,res)=>{
    res.render('home')
})

app.get("/cart",(req,res)=>{
res.render('customers/cart');
})

app.get("/login",(req,res)=>{
    res.render('auth/login');
    })


app.get("/register",(req,res)=>{
res.render('auth/register');
})
    


app.listen(3000,()=>{
    console.log('Listening on port 3000')
})