const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  Address: {
    type: String,
    required: true
  },

  ContactNumber: {
    type: Number,
    required: true
  }},
  {
    collection: "Customer"
}
);

module.exports =
  mongoose.model("Customer", customerSchema);