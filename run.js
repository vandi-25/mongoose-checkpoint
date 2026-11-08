// ======================================================
// Runs every function from myApp.js in order and prints the results.
// Start it with:  node run.js
// ======================================================
const mongoose = require("mongoose");
const app = require("./myApp");

// Small helper: turns a callback function into one we can `await`,
// so the steps run one after another, in order.
const run = (fn, ...args) =>
  new Promise((resolve, reject) => {
    fn(...args, (err, data) => (err ? reject(err) : resolve(data)));
  });

// Print a title and the result of each step
const show = (title, data) => {
  console.log(`\n=== ${title} ===`);
  console.log(JSON.stringify(data, null, 2));
};

const arrayOfPeople = [
  { name: "Mary", age: 25, favoriteFoods: ["salad", "burrito"] },
  { name: "Mary", age: 31, favoriteFoods: ["sushi"] },
  { name: "Alice", age: 22, favoriteFoods: ["burrito", "tacos"] },
  { name: "Bob", age: 35, favoriteFoods: ["burrito", "steak"] },
  { name: "Charlie", age: 19, favoriteFoods: ["burrito"] },
];

async function main() {
  // Start with an empty collection so the results are easy to follow
  await app.Person.deleteMany({});

  const john = await run(app.createAndSavePerson);
  show("1. Create and save one person", john);

  show("2. Create many people", await run(app.createManyPeople, arrayOfPeople));

  show('3. Find people named "Mary"', await run(app.findPeopleByName, "Mary"));

  show('4. Find one person who likes "sushi"', await run(app.findOneByFood, "sushi"));

  show("5. Find John by _id", await run(app.findPersonById, john._id));

  show('6. Find, edit (add "hamburger"), then save John', await run(app.findEditThenSave, john._id));

  show('7. Set Alice\'s age to 20 with findOneAndUpdate', await run(app.findAndUpdate, "Alice"));

  show("8. Delete John by _id", await run(app.removeById, john._id));

  show('9. Delete everyone named "Mary"', await run(app.removeManyPeople));

  show("10. Burrito lovers: sorted by name, 2 results, no age", await run(app.queryChain));

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Something went wrong:", err.message);
  mongoose.disconnect();
});
