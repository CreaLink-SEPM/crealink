const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./components/routes/router.js");
const multer = require("multer");
const path = require("path");
const { init: initSocket } = require("./socket.js");
const AWS = require("aws-sdk");

dotenv.config();

const connectDB = require("./components/configs/db.js");
connectDB();

const port = process.env.PORT || 5000;
const app = express();



// Create new assistant
// openai.beta.assistants.create({
//   name: "Content creator assistant",
//   instructions: "You support content creators",
//   tools: [
//     {
//       type: "code_interpreter"
//     }
//   ],
//   model: "gpt-3.5-turbo-1106"
// })


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/components/images'));
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use(express.static(__dirname));
app.use(bodyParser.json());
routes(app);

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

const io = initSocket(server);
io.on("connection", (socket) => {
  console.log("Connection established");
});
