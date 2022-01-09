const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const pass = "eCLHCa0xud8dY4Jq";

// Configs
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect to mongodb
mongoose.connect(
  `mongodb+srv://duvron:${pass}@cluster0.ixynf.mongodb.net/contacts?retryWrites=true&w=majority`
);
// mongoose.connect(`mongodb+srv://duvron:${pass}@cluster0.ixynf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)

// data schema
const contactSchema = {
  name: {
    type: String,
    required: true,
  },
  descr: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
};

// data model
const Contact = mongoose.model("Contact", contactSchema);

// read route
app.get("/contacts", (req, res) => {
  Contact.find()
    .then((contacts) => res.json(contacts))
    .catch((err) => res.status(400).json(err));
});

// create route
app.post("/newContact", (req, res) => {
  console.log(req.body);
  const newContact = new Contact({
    name: req.body.name,
    descr: req.body.descr,
    number: req.body.number,
  });
  newContact
    .save()
    .then((contact) => console.log(contact))
    .catch((err) => res.status(400).json({ message: "Bad request", err }));
});

// delete route
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Contact.findByIdAndDelete({ _id: id }, (req, res, err) => {
    if (!err) {
      console.log("Deleted");
    } else {
      console.log(err);
    }
  });
});

// update route
app.put("/update/:id", (req, res) => {
  const updateContact = {
    name: req.body.name,
    descr: req.body.descr,
    number: req.body.number,
  };
  Contact.findByIdAndUpdate(
        { _id: req.params.id }, 
        { $set: updateContact },
        (req, res, err) => {
            if(!err) {
                console.log('Updated')
            } else {
                console.log(err)
            }
        }
        );
});

app.listen(5000, () => {
  console.log("Console log on port 5000...");
});

// mongodb password = eCLHCa0xud8dY4Jq
