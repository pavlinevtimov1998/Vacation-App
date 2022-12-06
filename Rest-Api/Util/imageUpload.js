const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { promisify } = require("util");
const { unlink } = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

exports.upload = multer({ storage: storage });

const uploadToCloudinary = async (filePath) =>
  cloudinary.uploader.upload(filePath);

exports.getImagesUrl = async (files) => {
  const imagesUrl = [];
  const localUrls = [];

  for (let i = 0; i < files.length; i++) {
    const localFilePath = files[i].path;
    localUrls.push(localFilePath);

    await uploadToCloudinary(localFilePath).then((result) => {
      imagesUrl.push(result.url);
    });
  }

  return [imagesUrl, localUrls];
};

exports.asyncUnlink = (arr) => {
  const func = promisify(unlink);

  return arr.map((i) => func(i));
};
