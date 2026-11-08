// The Person model: describes what a person document looks like in MongoDB
const mongoose = require("mongoose");

// A schema lists the fields, their types and their rules
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // every person must have a name
  },
  age: Number,
  favoriteFoods: {
    type: [String], // an array of strings
    default: [], // empty list if none are given
  },
});

// A model is the "constructor" we use to create, find, update and delete people.
// Mongoose stores "Person" documents in the "people" collection.
const Person = mongoose.model("Person", personSchema);

module.exports = Person;
