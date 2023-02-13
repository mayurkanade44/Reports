import Report from "../models/Report.js";
import Admin from "../models/Admin.js";
import newdoc from "docx-templates";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import { uploadFile } from "./AdminController.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const allTemplates = [
  {
    templateType: "Single Picture",
    reportType: "RIM",
    file: "SinglePictureRIM",
  },
  {
    templateType: "Double Pictures",
    reportType: "RIM",
    file: "DoublePicturesRIM",
  },
  {
    templateType: "Double Picture B/A",
    reportType: "RIM",
    file: "BeforeAfterRIM",
  },
];

export const createReport = async (req, res) => {
  const {
    reportName,
    templateType,
    reportType,
    details,
    meetTo,
    meetContact,
    shownTo,
    shownContact,
    inspectionDate,
    meetEmail,
    shownEmail,
    contract,
  } = req.body;
  try {
    if (!reportName || !templateType || !reportType)
      return res.status(400).json({ msg: "Please provide all values" });

    const adminValues = await Admin.find();

    let file = "",
      width = 16;
    adminValues.forEach((x) => {
      if (
        x.template &&
        x.template.templateType === templateType &&
        x.template.reportType === reportType
      ) {
        file = x.template.file;
      }
    });

    const resp = await axios.get(file, {
      responseType: "arraybuffer",
      // headers: {
      //   Accept:
      //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      // },
    });

    const template = Buffer.from(resp.data);

    // const template = fs.readFileSync(
    //   path.resolve(__dirname, "../templates/", `${file}.docx`)
    // );

    if (templateType !== "Single Picture") width = 8;

    const buffer = await newdoc.createReport({
      cmdDelimiter: ["{", "}"],
      template,

      additionalJsContext: {
        meetTo: meetTo,
        meetContact: meetContact,
        meetEmail: meetEmail,
        shownTo: shownTo,
        shownContact: shownContact,
        shownEmail: shownEmail,
        inspectionBy: req.user.name,
        inspectionDate: inspectionDate,
        contract: contract,
        data: details,
        image: async (url) => {
          const resp = await axios.get(url, {
            responseType: "arraybuffer",
          });
          const buffer = Buffer.from(resp.data, "binary").toString("base64");
          return {
            width: width,
            height: 9,
            data: buffer,
            extension: ".jpg",
          };
        },
      },
    });

    fs.writeFileSync(
      path.resolve(__dirname, "../files/", `${reportName}.docx`),
      buffer
    );

    const result = await cloudinary.uploader.upload(
      `files/${reportName}.docx`,
      {
        resource_type: "raw",
        use_filename: true,
        folder: "reports",
      }
    );

    req.body.link = result.secure_url;
    req.body.inspectionBy = req.user.name;

    fs.unlinkSync(`./files/${reportName}.docx`);

    const newReport = await Report.create(req.body);

    res
      .status(201)
      .json({ msg: "Report successfully generated.", link: newReport.link });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const uploadImages = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: "reports",
        quality: 30,
      }
    );
    fs.unlinkSync(req.files.image.tempFilePath);

    return res.status(201).json({
      msg: "ok",
      link: result.secure_url,
      imageCount: req.body.imageCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const editReport = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await Report.findById(id);
    if (!report) return res.status(404).json({ msg: "Report not found" });

    if (req.files.file) {
      const link = await uploadFile(req.files.file);
      report.link = link;
      await report.save();
    }

    return res.status(200).json({ msg: "Report has been updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const allReports = async (req, res) => {
  const { search } = req.query;
  const searchObject = {};
  try {
    if (search) searchObject.reportName = { $regex: search, $options: "i" };

    let reports = await Report.find(searchObject)
      .sort("-createdAt")
      .select(
        "reportName reportType inspectionBy inspectionDate link approved email"
      );
    if (req.user.role === "Field") {
      reports = reports.filter((item) => item.inspectionBy === req.user.name);
    }

    const approved = reports.filter((item) => item.approved === true).length;
    const email = reports.filter((item) => item.email === true).length;

    return res.status(200).json({ reports, approved, email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const verifyReport = async (req, res) => {
  const { id } = req.params;
  try {
    const _id = id.split("-")[0];
    const verify = id.split("-")[1];
    const report = await Report.findById({ _id });
    if (verify === "Approve") report.approved = true;
    if (verify === "Send Email") report.email = true;
    //send mail function

    await report.save();

    res.status(200).json({ msg: "ok" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};
