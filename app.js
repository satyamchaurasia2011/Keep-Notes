const express = require('express');

const app = express();
const mongoose = require('mongoose')
const {Mongoose_URI} = require("./config/keys");

require('./model/user');
require('./model/note');
app.use(express.json());
 app.use(require('./routes/auth'));
 app.use(require('./routes/notes'));

mongoose.connect(Mongoose_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected',() => {
    console.log("successfully connected to Mongo DB server Database.");
} );

mongoose.connection.on('error',(err) => {
    console.log("error occured!!", err);
} );

const PORT = process.env.PORT || '8000';

if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log("Server started on port 5000");
})