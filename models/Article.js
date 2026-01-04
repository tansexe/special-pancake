const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: String,
    normalizedTitle: String,
    link: { type: String, unique: true },
    source: String,
    bias: String,
    publishedAt: Date,
    guid: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
