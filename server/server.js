/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

//express app
const app = express();
const PORT = process.env.PORT || 3030;

const jobRoutes = require("./routes/jobs");
const userRoutes = require("./routes/user");
const healthCheckRoutes = require("./routes/healthcheck");

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/jobs", jobRoutes);
app.use("/api/user", userRoutes);
app.use("/api/healthcheck", healthCheckRoutes);

//connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
