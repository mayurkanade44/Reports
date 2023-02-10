import Admin from "../models/Admin.js";

export const addValues = async (req, res) => {
  try {
    const values = await Admin.create(req.body);
    res.status(201).json({ msg: "created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const getValues = async (req, res) => {
  try {
    const values = await Admin.find();
    let findings = [],
      suggestions = [];
    for (let value of values) {
      if (value.finding && value.finding !== null) findings.push(value.finding);
      if (value.suggestion && value.suggestion !== null)
        suggestions.push(value.suggestion);
    }

    res.status(201).json({ findings, suggestions });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};
