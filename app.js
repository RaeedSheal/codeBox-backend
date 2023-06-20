import express, { json } from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import {} from "dotenv/config";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";

// Use
const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Get Routes

import userApiRouter from "./routes/userApiRouter.js";
import adminApiRouter from "./routes/adminApiRouter.js";
import ideaApiRouter from "./routes/ideaApiRouter.js";
import submitionApiRouter from "./routes/submitionApiRouter.js";

// mongoose
connect(process.env.DB_URL)
    .then(() => console.log("--DB Connected--"))
    .catch((e) => {
        console.log("--DB Error Connection--");
        console.log(e);
        console.log("--DB Error Connection--");
    });

// Use Routes

app.use("/api", userApiRouter);
app.use("/api", adminApiRouter);
app.use("/api", ideaApiRouter);
app.use("/api", submitionApiRouter);

//

app.get("/", (req, res) => {
    res.send("hi");
});

app.listen(8000, () => {
    console.log("Listening");
});
