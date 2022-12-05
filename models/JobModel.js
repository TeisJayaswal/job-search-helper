const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    company: {
      type: String,
      required: false,
    },
    applied: {
      type: Boolean,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
