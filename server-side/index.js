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
// const allowedOrigins = ["https://datawizdipsy.netlify.app/"];
const allowedOrigins = ["http://localhost:3000"];

var corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(
  cors({
    origin: "*", // Replace with your domain or use '*' to allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify the methods you want to allow
    allowedHeaders: ["Content-Type", "Authorization"], // Specify the headers you want to allow
    credentials: true, // If you need to allow cookies or other credentials
    optionsSuccessStatus: 200,
  })
);

app.options('*', cors(corsOptions)); // Handle preflight requests

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, Authorization,Origin, X-Requested-With"
  );
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
