const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');

dotenv.config();
const app = express();
app.use(express.json());

const connect = async () => {

    mongoose.connect(process.env.MONGO).then(() => {
        console.log("DB connection successful.");
    }).catch(err => {
        console.log(err);
    })
}

app.use("/api/users", userRoute);
app.use("/api/auth",authRoute);

app.listen(5000, () => {

    connect();
    console.log("Backend server is running.");
})