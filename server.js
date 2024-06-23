require('dotenv').config()
const express = require("express");
const poart = process.env.PORT;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyparser = require("body-parser");
const db = require("./config/mongoose");

//setup the view Engine
app.set("view engine", "ejs");
app.set("views","./views");

app.use(bodyparser.urlencoded({ extended: false }));

app.use(expressLayouts);


// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use("/assets", express.static("assets"));


// use routes
app.use("/", require("./routes"))

app.listen(poart,(err)=>{
    if(err){
        console.log(`error in running server${err}`)
    }
    else{
        console.log(`server is running${poart}`)
    }
});