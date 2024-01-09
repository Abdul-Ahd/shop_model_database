const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Login_model = require("./model");
const bodyParser = require("body-parser");
const app = express();
dotenv.config();
mongoose.connect("mongodb://localhost:27017", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// Use bodyParser middleware
app.use(bodyParser.json());
app.use(cors());

const db = mongoose.connection;

db.once("open", () => console.log("conect to db"));
db.on("error", () => console.log("not conect to db"));

app.get("/task", async (request, response) => {
  //response.send('welcome')
  try {
    const task = await Login_model.find({});
    response.json(task);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});
app.patch("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Login_model.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.delete("/task/:id", async (request, response) => {
  //response.send('welcome')
  try {
    const { id } = request.params;
    const user = await Login_model.findByIdAndDelete(id, request.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(user);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});
app.post("/task", async (request, response) => {
  //response.send('welcome')
  try {
    const task = new Login_model(request.body);
    await task.save();
    response.status(201).json(task);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});
app.get("/", (request, response) => {
  response.send("welcome");
});

app.listen(3000, console.log("app is runing"));
