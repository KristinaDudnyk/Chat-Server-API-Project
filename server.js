const PORT = 3001;
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
];

// level 1
// [X] Create a new message
// [X] Read all messages
// [ ] Read one message specified by an ID
// [ ] Delete a message, by ID

// level 2
// [x] reject requests to create messages if the message objects have an empty or missing text or from property.
// [x] In this case your server should return a status code of 400.

// level 3
// [ ] Read _only_ messages whose text contains a given substring: `/messages/search?text=express`

// level 4
// [ ] store a timestamp in each message object, in a field called `timeSent`.
// [ ] This should be set to the current time when the server first receives the message. This should be a DateTime object, which can be created with `new Date()`. It will NOT be submitted by the client.

// level 5
// [ ] add support for the client to be able to _update_ a message's `text` or `from` property. We'll cover this in the next week of the module, but you can research it easily.
// [ ] Your server should NOT update the `timeSent` timestamp property during an update, if the client passes it back to you.

//This array is our "data store".
app.get("/", function (req, res) {
  // console.log("Server is up");
  res.sendFile(__dirname + "./public/index.html");
});

app.get("/messages", (req, res) => {
  res.status(200).send(messages);
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

// app.get("/message", (req, res) => {
//   // const { id: id } = req.params;
//   const ID = Number(req.params.id);
//   const messageById = messages.find((element) => element.id === ID);

//   console.log("Requested ID:", ID);
//   console.log("Message Found:", messageById);

//   if (!messageById) {
//     res.status(404).send(`Message with ID: ${ID} was not found`);
//   } else {
//     res.status(200).send(messageById);
//   }
// });

app.get("/message", (req, res) => {
  // const { id: id } = req.params;
  const ID = Number(req.query.id);
  const messageById = messages.find((element) => element.id === ID);

  console.log("Requested req.query.id:", req.query.id);
  console.log("Requested ID:", ID);
  console.log("Message Found:", messageById);

  if (!messageById) {
    res.status(404).send(`Message with ID: ${ID} was not found`);
  } else {
    res.status(200).send(messageById);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
