import Report from "../models/Report.js";
import newdoc from "docx-templates";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

const __dirname = dirname(fileURLToPath(import.meta.url));

const allTemplates = [
  {
    templateType: "Single Picture",
    reportType: "RIM",
    file: "PictureRIM",
  },
  {
    templateType: "Double Picture",
    reportType: "RIM",
    file: "PictureRIM",
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
    inspectionBy,
    inspectionDate,
  } = req.body;
  try {
    if (!reportName || !templateType || !reportType)
      return res.status(400).json({ msg: "Please provide all values" });

    let file = "";
    allTemplates.forEach((x) => {
      if (x.templateType === templateType && x.reportType === reportType) {
        file = x.file;
      }
    });

    const template = fs.readFileSync(
      path.resolve(__dirname, "../templates/", `${file}.docx`)
    );

    const buffer = await newdoc.createReport({
      cmdDelimiter: ["{", "}"],
      template,

      additionalJsContext: {
        meetTo: meetTo,
        inspectionBy: inspectionBy,
        inspectionDate: inspectionDate,
        data: details,
        image: async (
          url = "https://res.cloudinary.com/epcorn/image/upload/v1674627399/signature/No_Image_Available_ronw0k.jpg",
          len
        ) => {
          const resp = await fetch(url);
          const buffer = resp.arrayBuffer
            ? await resp.arrayBuffer()
            : await resp.buffer();
          return {
            width: 16 / len,
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

    return res
      .status(201)
      .json({
        msg: "ok",
        link: result.secure_url,
        imageCount: req.body.imageCount,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};
