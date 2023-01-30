import Report from "../models/Report.js";

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
  const { templateName, type, details } = req.body;
  try {
    if (!templateName || !type)
      return res.status(400).json({ msg: "Please provide all values" });

    const file = "";
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
        img: async (
          url = "https://res.cloudinary.com/epcorn/image/upload/v1674627399/signature/No_Image_Available_ronw0k.jpg"
        ) => {
          const resp = await fetch(url);
          const buffer = resp.arrayBuffer
            ? await resp.arrayBuffer()
            : await resp.buffer();
          return {
            width: 8,
            height: 8,
            data: buffer,
            extension: ".jpg",
          };
        },
      },
    });

    fs.writeFileSync(
      path.resolve(__dirname, "../files/", `report2.docx`),
      buffer
    );
    res.status(201).json({ msg: "ok" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error, try again later" });
  }
};
