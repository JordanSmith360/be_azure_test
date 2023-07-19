// const http = require("http");
// const port = process.env.PORT || 5000;

// http
//   .createServer(function (req, res) {
//     let url = req.url;

//     res.writeHead(200, {
//       "Content-Type": "text/html",
//       "Access-Control-Allow-Origin": "*" /* @dev First, read about security */,
//       "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
//       "Access-Control-Max-Age": 2592000, // 30 days
//     });

//     res.write(`Hello From API ${port}`);
//     res.end();
//   })
//   .listen(port, function () {
//     console.log("Server listening");
//   });

// Installed multer for receiving a pdf from the front end
// import express from "express";
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import routes from './src/routes/aiRoutes.js'
// import cors from "cors";
// import multer from 'multer'
// import dotenv from 'dotenv'
// dotenv.config();
// import  config  from './config/config.js'

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express(); //creating an app
const PORT = process.env.PORT || 8080; // port to run our server, this will dynamically listen to a port provided by azzure during production

// mongoose connection

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://processordb:MMzP5vSRKVNgNq3qN1deqdPfLxsSjBsxi8INvC6TrdYBO5iHCtsXTuzzOi4MGKhlgLZN0AoSUlhuACDbgkxeHQ==@processordb.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@processordb@",
  {
    useNewUrlParser: true,
  }
);

// bodyparser setup
// app.use(bodyParser.urlencoded({limit: '50mb',extended:true}));
// app.use(bodyParser.json({limit: '50mb'}));

app.use(cors());

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// routes(app); //run our routes by passing it to the app

// // Set up multer storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads/'); // Directory to save the uploaded files
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
//   });

// const upload = multer({ storage: storage });

// Handle file upload
// app.post('/upload', upload.single('file'), (req, res) => {
//   console.log('File received:', req.file);

//   res.send('File uploaded successfully');
// });

// This is our end point when we go to the browser
app.get(
  "/",
  (req, res) => res.send(`Node and express sever is running on port ${PORT}`) // this will be the response
);

const Schema = mongoose.Schema;

const TestSchema = new Schema({
  test: {
    type: String,
    required: "Enter po number",
  },
});

const Test = mongoose.model("TestSchema", TestSchema);

app.get("/write", async (req, res) => {
  const test = new Test({ test: "Hello World" });
  const result = await test.save();

  res.send(`We wrote to the comos db: ${test} ${result}`); // this will be the response
});

// This is to show something on our console
app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));
