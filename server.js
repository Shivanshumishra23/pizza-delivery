const express =require('express');
const ejs =require('ejs')
const path = require('path');
const app = express()
const expressLayout =require('express-ejs-layouts');
// const PORT = process.env.PORT || 3000
app.get("/",(req,res)=>{
    res.render('home')
})

app.use(express.json());

//server static files
app.use(express.static("public"));
 

//set Template engine 
app.use(expressLayout)
app.set('views',path.join(__dirname,'resources','views'))
 app.set('view engine', 'ejs')




 
app.listen(3000,()=>{
    console.log('Listening on port 3000')
})