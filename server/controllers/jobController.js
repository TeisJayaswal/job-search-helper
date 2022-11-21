const Job = require("../models/JobModel");
const mongoose = require("mongoose");
//get all jobs
const getJobs = async (req, res) => {
  const user_id = req.user._id;

  const jobs = await Job.find({ user_id }).sort({ created: -1 });

  res.status(200).json(jobs);
};

//get a single job
const getJob = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such job" });
  }
  const job = await Job.findById(id);

  if (!job) {
    return res.status(404).json({ error: "No such job" });
  }

  res.status(200).json(job);
};
//create a new job
const createJob = async (req, res) => {
  const { title, company, applied, link, notes } = req.body;

  //logic for if all fields were required
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!company) {
    emptyFields.push("company");
  }
  if (!applied) {
    emptyFields.push("applied");
  }
  if (!link) {
    emptyFields.push("link");
  }
  if (!notes) {
    emptyFields.push("notes");
  }

  if (emptyFields.length === 5) {
    return res
      .status(400)
      .json({ error: "Please fill in at least one field", emptyFields });
  }

  try {
    const user_id = req.user._id;

    const job = await Job.create({
      title,
      company,
      applied,
      link,
      notes,
      user_id,
    });
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a job
const deleteJob = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such job" });
  }
  const job = await Job.findOneAndDelete({ _id: id });

  if (!job) {
    return res.status(404).json({ error: "No such job" });
  }

  res.status(200).json(job);
};
//update a job
const updateJob = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such job" });
  }
  const job = await Job.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!job) {
    return res.status(404).json({ error: "No such job" });
  }
  res.status(200).json(job);
};
module.exports = {
  createJob,
  getJobs,
  getJob,
  deleteJob,
  updateJob,
};
