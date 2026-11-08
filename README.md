# Mongoose Checkpoint

Managing a MongoDB database with **Mongoose**: creating, reading, updating and deleting people.

- `models/Person.js`: the Person schema and model
- `myApp.js`: one function per task, each using a `done(err, data)` callback
- `run.js`: runs every function in order and prints the results

## Setup

1. Install the packages:
   ```
   npm install
   ```
2. Create a free database on **MongoDB Atlas** (https://www.mongodb.com/cloud/atlas):
   - Create a cluster (the free tier is fine).
   - Under **Database Access**, add a database user with a username and password.
   - Under **Network Access**, add your IP address (or `0.0.0.0/0` to allow any).
   - Click **Connect → Drivers** and copy the connection string.
3. Create a file named `.env` in this folder (copy `.env.example`) and paste your connection string, replacing `<password>` with your user's password:
   ```
   MONGO_URI="mongodb+srv://myuser:mypassword@cluster0.abcde.mongodb.net/mongoose-checkpoint?retryWrites=true&w=majority"
   ```
   No spaces around the `=`, and keep the quotes.
4. Run it:
   ```
   node run.js
   ```

`.env` is listed in `.gitignore`, so your password is never uploaded to GitHub.

## The tasks

| Task | Function | Mongoose method |
|---|---|---|
| Create and save a record | `createAndSavePerson` | `new Person(...)`, `document.save()` |
| Create many records | `createManyPeople` | `Model.create()` |
| Find by name | `findPeopleByName` | `Model.find()` |
| Find one by food | `findOneByFood` | `Model.findOne()` |
| Find by `_id` | `findPersonById` | `Model.findById()` |
| Find, edit, then save | `findEditThenSave` | `findById()`, `push()`, `save()` |
| Update with findOneAndUpdate | `findAndUpdate` | `Model.findOneAndUpdate()` with `{ new: true }` |
| Delete one by `_id` | `removeById` | `Model.findByIdAndRemove()` |
| Delete many | `removeManyPeople` | `Model.remove()` |
| Chain query helpers | `queryChain` | `.find().sort().limit().select().exec()` |

## Why Mongoose 6?

The instructions use callbacks (`save(function (err, data) {...})`), `findByIdAndRemove()` and `Model.remove()`. Mongoose 7 and later removed all of these, so this project uses **Mongoose 6**, the last version that supports them.

In newer projects you'd use `async`/`await` instead of callbacks, `findByIdAndDelete()` instead of `findByIdAndRemove()`, and `deleteMany()` instead of `remove()`.
