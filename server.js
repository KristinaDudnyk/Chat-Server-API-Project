const express = require("express");
const cors = require("cors");

const PORT = 3001;

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(express.static("public"));

const messages = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
];

//This array is our "data store".
app.get("/", function (req, res) {
  // console.log("Server is up");
  res.send("testing");
  // res.sendFile(__dirname + "./public/index.html");
});

app.get("/messages", (req, res) => {
  // res.status(200).send(welcomeMessage);
  res.send(messages);
});

app.post("/messages", (req, res) => {
  // console.log(req.body)
  const { from, text } = req.body;

  if (!from) {
    res.status(400).send("You missing your name");
  } else if (!text) {
    res.status(404).send("You missing your message");
  } else if (!from && !text) {
    res.status(400).send("Your missing everything");
  } else if (from && text) {
    messages.push({
      id: messages.length + 1,
      from: from,
      text: text,
    });
    res.status(201).redirect("/");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
