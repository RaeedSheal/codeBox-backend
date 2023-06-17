const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

// Use

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Get Routes

const userApiRouter = require("./routes/userApiRouter");

// mongoose
mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("--DB Connected--"))
    .catch((e) => {
        console.log("--DB Error Connection--");
        console.log(e);
        console.log("--DB Error Connection--");
    });

// Use Routes

app.use("/api", userApiRouter);

//

app.get("/", (req, res) => {
    res.send("hi");
});

app.listen(8000, () => {
    console.log("Listening");
});
