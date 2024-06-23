const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    taitle: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    labele: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Issue", issueSchema);
