const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./db/connect');
const route =  require("./routes/userroute");

app.use(express.json());

connectDB();

app.use('/api',route);

const PORT = 3000;
app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`);
})