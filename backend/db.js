const mongoose = require("mongoose");
require("dotenv").config(); // To load environment variables

const mongoURI = "mongodb+srv://supreme:yUp0rUcN62DFJbPa@dbset.if0te.mongodb.net/myDatabase?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

  module.exports = mongoose;