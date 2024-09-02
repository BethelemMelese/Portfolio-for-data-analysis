const ImageFiles = require("../models/imageFile.model.js");

const UploadImageFile = async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file;
    const file = await ImageFiles.create({
      fileName: req.body.fileName,
      imageFile: {
        filename: originalname,
        data: buffer,
        contentType: mimetype,
      },
    });
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const RetrieveImageFile = async (req, res) => {
  try {
    const files = await ImageFiles.find({});
    const response=files.map((item)=>{
        return{
            id:item._id,
            fileName:item.fileName,
            imageFile:item.imageFile
        }
    })
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { UploadImageFile, RetrieveImageFile };
