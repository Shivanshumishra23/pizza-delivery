require('dotenv').config()

const express =require('express');
const ejs =require('ejs')
const path = require('path');
const app = express()
const expressLayout =require('express-ejs-layouts');
// const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore =require('connect-mongo')
const passport =require('passport')







//server static files
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//Database Connection
mongoose
// .connect('mongodb://127.0.0.1:27017/pizza')
.connect(`${process.env.MONGODB_URI}/pizza?retryWrites=true&w=majority`)
.then(()=>console.log("Mongodb connected"))
.catch((err)=>console.log("Mongo Error" ,err));

const connection =mongoose.connection;
 

// let mongoStore =new MongoDbStore({
//           mongooseConnection: connection,
//           collection :'sessions'
// })



//Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl :process.env.MONGODB_URI+"/pizza"
    }),
    saveUninitialized:false,
    cookie:{maxAge: 1000*60*60*24} //24 hours
}))


// Passport config
const passportInit =require ('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())

//Global middleware

app.use((req,res,next)=>{
    res.locals.session =req.session
    res.locals.user =req.user
    next()
})

 
//set Template engine 
app.use(expressLayout)
app.set('views',path.join(__dirname,'resources','views'))
 app.set('view engine', 'ejs')





require('./routes/web')(app)





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});