const express = require("express");
const {
  createJob,
  getJobs,
  getJob,
  deleteJob,
  updateJob,
} = require("../controllers/jobController.js");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//require auth for all Job routes
router.use(requireAuth);

//GET All Jobs
router.get("/", getJobs);

//GET single Job
router.get("/:id", getJob);

//POST a new Job
router.post("/", createJob);

//DELETE a Job
router.delete("/:id", deleteJob);

//UPDATE a job
router.patch("/:id", updateJob);

module.exports = router;
