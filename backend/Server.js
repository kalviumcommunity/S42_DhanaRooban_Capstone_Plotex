require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express')
const route = require('./Routers/UserRoute')
const UserDataRoute = require('./Routers/DataRoute')
const cors = require('cors')
const url = process.env.MONGODB_URI;
const port = 5000;

const app = express();
app.use(cors());

async function connectToMongodb(){
    try {
        await mongoose.connect(url);
        console.log("DB Connected")
    } catch (error) {
        console.log("Failed to connect",error)
    }
}
connectToMongodb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(route);
app.use(UserDataRoute);

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});



