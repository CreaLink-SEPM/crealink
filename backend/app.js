const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./components/routes/router.js");

dotenv.config();

const connectDB = require("./components/configs/db.js");
connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());



app.listen(port, () => console.log(`Server started on port ${port}`));
