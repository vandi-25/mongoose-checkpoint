// ======================================================
// Mongoose checkpoint: create, read, update and delete people
// Every function takes a `done` callback, following the
// Node convention: done(error, data)
// ======================================================

// Load the variables from the .env file (MONGO_URI)
require("dotenv").config();

const mongoose = require("mongoose");
const Person = require("./models/Person");

// Keep Mongoose's current query behaviour (and hide its warning about it)
mongoose.set("strictQuery", false);

// Connect to the database using the URI stored in .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ---------- Create and save one record ----------
const createAndSavePerson = (done) => {
  // Create a document instance with the Person constructor
  const person = new Person({
    name: "John Doe",
    age: 28,
    favoriteFoods: ["pizza", "pasta"],
  });

  // Save it to the database
  person.save(function (err, data) {
    if (err) return done(err);
    done(null, data);
  });
};

// ---------- Create many records with Model.create() ----------
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return done(err);
    done(null, people);
  });
};

// ---------- Find all people with a given name ----------
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, people) {
    if (err) return done(err);
    done(null, people); // always an array (can be empty)
  });
};

// ---------- Find ONE person who likes a certain food ----------
const findOneByFood = (food, done) => {
  // MongoDB matches the food against every item in the favoriteFoods array
  Person.findOne({ favoriteFoods: food }, function (err, person) {
    if (err) return done(err);
    done(null, person); // a single document (or null)
  });
};

// ---------- Find the person with a given _id ----------
const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, person) {
    if (err) return done(err);
    done(null, person);
  });
};

// ---------- Classic update: find, edit, then save ----------
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // 1. Find the person
  Person.findById(personId, function (err, person) {
    if (err) return done(err);

    // 2. Edit: add "hamburger" to the favorite foods
    person.favoriteFoods.push(foodToAdd);

    // 3. Save the updated person (inside the find callback).
    //    favoriteFoods is declared as [String], so markModified() is not needed.
    person.save(function (err, updatedPerson) {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

// ---------- New update with findOneAndUpdate() ----------
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName }, // search by name
    { age: ageToSet }, // what to change
    { new: true }, // return the updated document, not the old one
    function (err, updatedPerson) {
      if (err) return done(err);
      done(null, updatedPerson);
    }
  );
};

// ---------- Delete one person by _id ----------
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, removedPerson) {
    if (err) return done(err);
    done(null, removedPerson); // the document that was deleted
  });
};

// ---------- Delete everyone named "Mary" ----------
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, function (err, result) {
    if (err) return done(err);
    done(null, result); // e.g. { acknowledged: true, deletedCount: 2 }
  });
};

// ---------- Chain query helpers ----------
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch }) // people who like burritos
    .sort({ name: 1 }) // sort by name (A to Z)
    .limit(2) // only 2 results
    .select({ age: 0 }) // hide the age field
    .exec(function (err, people) {
      if (err) return done(err);
      done(null, people);
    });
};

module.exports = {
  Person,
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain,
};
