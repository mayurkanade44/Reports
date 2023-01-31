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
    template: "Single Picture",
    type: "RIM",
    file: "SinglePictureRIM",
  },
  {
    template: "Double Picture",
    type: "RIM",
    file: "DoublePictureRIM",
  },
  {
    template: "Double Picture B/A",
    type: "RIM",
    file: "DoublePictureBARIM",
  },
];

export const createReport = async (req, res) => {
  const { reportName, templateName, type, details } = req.body;
  try {
    if (!reportName || !templateName || !type)
      return res.status(400).json({ msg: "Please provide all values" });

    let file = "";
    allTemplates.forEach((x) => {
      if (x.template === templateName && x.type === type) {
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
            height: 12 / len,
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
    res.status(201).json({ msg: "ok" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};

export const uploadImages = async (req, res) => {
  try {
    let images = [];

    if (req.files.image.length > 0) images = req.files.image;
    else images.push(req.files.image);

    const imageLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i].tempFilePath, {
        use_filename: true,
        folder: "reports",
        quality: 30,
      });
      fs.unlinkSync(images[i].tempFilePath);
      imageLinks.push({ img: result.secure_url, len: images.length });
    }
    return res.status(201).json({ imageLinks });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};
