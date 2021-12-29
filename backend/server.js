const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./db");
const Todo = require("./todo");
const User = require("./user");
// console.log(Todo);

app.use(express.json());
app.use(cors());

// use uuid and array if mongoDB didn't work for you
const arrServer = [
  {
    _id: "61c420a96096f17c23ba1ab7",
    title: "444444444",
    isCompleted: false,
    __v: 0,
  },
  {
    _id: "61c420ac6096f17c23ba1abd",
    title: "5555555555555",
    isCompleted: true,
    __v: 0,
  },
];

app.get("/", (req, res) => {
  res.json("GET / is Working");
});

// CRUD: Create, Read, Update, Delete

app.get("/tasks", (req, res) => {
  // use this if mongoDB didn't work for you
  // res.json(arrServer);

  Todo.find({}, (err, data) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      res.json(data);
    }
  });
});

//              ?key=value&key=value
app.get("/filter", (req, res) => {
  console.log(req.query);
  Todo.find({ isCompleted: req.query.isCompleted }, (err, data) => {
    if (err) {
      console.log("ERR", err);
    } else {
      // console.log(data);
      res.json(data);
    }
  });
});

app.post("/tasks", (req, res) => {
  // console.log('25:',req.body);

  Todo.create(req.body, (err, newTask) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      res.status(201).json(newTask);
    }
  });
});

app.delete("/tasks/:id", (req, res) => {
  // console.log("37:", req.params.id);

  Todo.deleteOne({ _id: req.params.id }, (err, deleteObj) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      deleteObj.deletedCount === 1
        ? res.json("Delete one todo successfully")
        : res.status(404).json("This todo is not found");
    }
  });
});

app.delete("/tasks", (req, res) => {
  // console.log("37:", req.params.id);

  Todo.deleteMany({ isCompleted: true }, (err, deleteObj) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      console.log(deleteObj);
      deleteObj.deletedCount === 0
        ? res.status(404).json("There is no completed todo found")
        : res.json("Delete all completed todos successfully");
    }
  });
});

app.put("/tasks/:id", (req, res) => {
  // console.log("37:", req.params.id);
  Todo.updateOne(
    { _id: req.params.id },
    { title: req.body.newTitle },
    (err, updateObj) => {
      if (err) {
        // console.log("ERROR: ", err);
        res.status(400).json(err);
      } else {
        console.log(updateObj);
        updateObj.modifiedCount === 1
          ? res.json("Update one todo successfully")
          : res.status(404).json("This todo is not found");
      }
    }
  );
});

app.put("/tasks/:id/:isCompleted", (req, res) => {
  console.log("124:", req.params);
  Todo.updateOne(
    { _id: req.params.id },
    { isCompleted: req.params.isCompleted },
    (err, updateObj) => {
      if (err) {
        // console.log("ERROR: ", err);
        res.status(400).json(err);
      } else {
        console.log(updateObj);
        updateObj.modifiedCount === 1
          ? res.json("Update one todo successfully")
          : res.status(404).json("This todo is not found");
      }
    }
  );
});

// USER
app.post("/users/register", (req, res) => {
  User.create(req.body, (err, newUser) => {
    if (err) {
      // console.log("ERROR: ", err);
      res.status(400).json({ message: "This email already taken" });
    } else {
      // res.status(201).json(newUser);
      res.status(201).json({ message: "Create New User Successfully" });
    }
  });
});

app.post("/users/login", (req, res) => {
  User.find({ email: req.body.email }, (err, arrUserFound) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      // console.log(arrUserFound);
      if (arrUserFound.length === 1) {
        // we found the user
        if (req.body.password === arrUserFound[0].password) {
          // password correct
          res.status(200).json({
            message: "Login Successfully",
            username: arrUserFound[0].username,
          });
        } else {
          // password incorrect
          res.status(400).json({
            message: "Wrong Password",
          });
        }
      } else {
        res.status(404).json({
          message: "The email entered is not registered",
        });
      }
    }
  });
});

app.listen(5000, () => {
  console.log("SERVER IS WORKING ..");
});

/*
the up endpoint is replace to these two
app.get("/completed", (req, res) => {
  Todo.find({ isCompleted: true }, (err, data) => {
    if (err) {
      console.log("ERR", err);
    } else {
      // console.log(data);
      res.json(data);
    }
  });
});

app.get("/not_completed", (req, res) => {
  Todo.find({ isCompleted: false }, (err, data) => {
    if (err) {
      console.log("ERR", err);
    } else {
      // console.log(data);
      res.json(data);
    }
  });
});
*/
