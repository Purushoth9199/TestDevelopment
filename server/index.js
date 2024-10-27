const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");


const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://purushoth9199:Iwtky01@cluster0.uzoxppx.mongodb.net/testsignup"
);

const JWT_SECRET = "your_jwt_secret_key";


const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Failed to authenticate token" });
      }
      req.userId = decoded.id; // Add decoded user ID to the request
      next();
    });
  };

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email }).then((user) => {
    if (user) {
      if (user.password === password) {
        // Generate a JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
          expiresIn: "1h",
        });
        res.json({ message: "Login successful", token });
      } else {
        res.status(401).json({ message: "Password is incorrect" });
      }
    } else {
      res.status(404).json({ message: "No record exists" });
    }
  });
});
app.post("/signup", (req, res) => {
    EmployeeModel.create(req.body)
      .then((employee) => {
        res.status(201).json({ message: "Registration successful!", employee });
      })
      .catch((err) => {
        // You may want to customize the error message depending on the error
        res.status(400).json({ message: "Registration failed. Please try again.", error: err.message });
      });
  });
app.listen(3001, () => {
  console.log("Server is running successfully");
});
