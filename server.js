const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const productRoute = require('./routes/product.route');
const cartRoute = require('./routes/cart.route');
const orderRoute = require('./routes/order.route');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const connect = async () => {

    mongoose.connect(process.env.MONGO).then(() => {
        console.log("DB connection successful.");
    }).catch(err => {
        console.log(err);
    })
}

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(5000, () => {

    connect();
    console.log("Backend server is running.");
})