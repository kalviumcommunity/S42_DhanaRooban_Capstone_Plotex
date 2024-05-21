const mongoose = require('mongoose')
const express = require('express')
const route = require('./Routers/UserRoute')
const cors = require('cors')


require('dotenv').config();


const url = process.env.MONGODB_URI;

const app = express();
app.use(cors());
const port = 3000 || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


async function connectToMongodb(){
    try {
        await mongoose.connect(url);
        console.log("DB Connected")
    } catch (error) {
        console.log("Failed to connect",error)
    }
}


app.use(route);
app.use(express.json())

app.listen(port,()=>{
    connectToMongodb()
    console.log(`Server is running on Port ${port}`)
})


