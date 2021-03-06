require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(userRoutes);

const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5
});

app.use(authLimiter);

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
