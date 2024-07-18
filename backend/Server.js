require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express')
const route = require('./Routers/UserRoute')
const UserDataRoute = require('./Routers/DataRoute')
const cors = require('cors')
const url = process.env.MONGODB_URI;

const app = express();
app.use(cors());

async function connectToMongodb(){
    try {
        await mongoose.connect(url);
        console.log("DB Connected")
    } catch (error) {
        console.log("Failed to connect")
    }
}
connectToMongodb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});

app.use(route);
app.use(UserDataRoute);



