const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const ProjectRoute = require("./routes/project.route.js");
const ResumeRoute = require("./routes/resume.route.js");
const UserRoute = require("./routes/user.route.js");
const ContactRoute = require("./routes/contact.route.js");
const BlogRoute = require("./routes/blog.route.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Allowing incoming request from any IP
// configuration file
dotenv.config();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, 'Content-Type' : 'multipart/form-data' ,* "
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Connection with Mongodb Database and run the server
let PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });

app.get("/", (req, res) => {
  res.send("Hello World from Node API");
});

// all the end points / routes of backend
app.use("/api/project", ProjectRoute);
app.use("/api/resume", ResumeRoute);
app.use("/api/user", UserRoute);
app.use("/api/contact", ContactRoute);
app.use("/api/blog/", BlogRoute);
