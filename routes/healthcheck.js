const express = require("express");

const app = express();

app.get("/", async function (req, res) {
  res.status(200).send("Sent GET request");
});

module.exports = app;
