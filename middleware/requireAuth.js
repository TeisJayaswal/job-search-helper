/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization Token Required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
