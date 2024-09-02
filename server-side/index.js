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
const ImageRoute = require("./routes/imageFile.route.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

var whitelist = ["http://localhost:3000", "https://datawizdipsy.netlify.app/"];
var corsOptions = { origin: whitelist, credentials: true };
app.use(cors(corsOptions)); // Allowing incoming request from any IP
// configuration file

app.use(
  cors({
    origin: "*", // Replace with your domain or use '*' to allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify the methods you want to allow
    allowedHeaders: ["Content-Type", "Authorization"], // Specify the headers you want to allow
    credentials: true, // If you need to allow cookies or other credentials
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization,Origin, X-Requested-With');
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, Authorization, 'Content-Type' : 'multipart/form-data' ,* "
  // );
  // res.header(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  // );
  next();
});
// Middleware to serve static files
app.use(express.static("public"));

// Connection with Mongodb Database and run the server
let PORT = process.env.PORT || 5000;
mongoose
  .connect(
    "mongodb+srv://melesebety2673:Admin123@peronal-portfolio.dxihqri.mongodb.net/?retryWrites=true&w=majority&appName=peronal-portfolio"
  )
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
  res.send("The Server Side running Successfully");
});

// all the end points / routes of backend
app.use("/api/project", ProjectRoute);
app.use("/api/resume", ResumeRoute);
app.use("/api/user", UserRoute);
app.use("/api/contact", ContactRoute);
app.use("/api/blog/", BlogRoute);
app.use("/api/imageRoute", ImageRoute);
