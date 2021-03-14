const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uri =
  "YOUR_URI";
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const PORT = 5000;
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to database");
    const db = client.db("test-task");
    const usersCollection = db.collection("users");
    const dataCollection = db.collection("data");

    app.post("/register", async (req, res) => {
      //!Registration
      try {
        const salt = await bcrypt.genSalt();
        const newUser = req.body;
        const hashedPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashedPassword;
        const user = await usersCollection.findOne({ email: req.body.email });
        if (user)
          return res
            .status(401)
            .json({ message: "Такой пользователь уже существует" });
        usersCollection.insertOne(newUser).then((result) => {
          res.status(201).json({ message: "Пользователь успешно создан" });
        });
      } catch (error) {
        res.status(500).send("Что то пошло не так");
      }
    });

    app.post("/data", async (req, res) => {
      //!Add data
      try {
        const salt = await bcrypt.genSalt();
        const data = req.body;
        const hashedINN = await bcrypt.hash(data.INN, salt);
        data.INN = hashedINN;
        dataCollection
          .insertOne(data)
          .then((result) => {
            console.log("Data added");
            res.status(201).json({ message: "Added" });
          })
          .catch((error) => console.error(error));
      } catch (error) {
        res.status(500).send();
      }
    });

    app.post("/login", async (req, res) => {
      //!Login
      try {
      usersCollection
          .findOne({
            email: req.body.email,
          })
          .then((response) => {
            bcrypt
              .compare(req.body.password, response.password)
              .then((resPass) => {
                if(resPass){
                  const jsonwebtoken = jwt.sign(req.body.email, "SEEEECREEET!")
                  res.status(200).json({token: jsonwebtoken})
                }
              }).catch(error=>{
                res.status(403).json({message:"Емейл или пароль неверны"})
              }).catch(error=>{
                res.status(403).json({message:"Емейл или пароль неверны"})
              })
          }).catch(error=>{
            res.status(403).json({message:"Емейл или пароль неверны"})
          })
       
      } catch (error) {
        res.status(500).send();
      }
    });

    app.get('/admin', async (req, res)=>{
     const result = await dataCollection.find().toArray().then(data=>{
      return data
      }).catch(e=>console.log(e))
      res.status(200).json({data: result})
    })
    app.listen(PORT, () => {
      //! Server started
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch(console.error);
