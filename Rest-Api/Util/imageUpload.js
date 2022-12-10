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

const uploadToCloudinary = (filePath) => cloudinary.uploader.upload(filePath);

exports.deleteCloudinaryImage = (id) => cloudinary.uploader.destroy(id);

const asyncUnlink = (img) => promisify(unlink)(img);

exports.getImagesUrl = async (files) => {
  const promises = [];
  const localImagePromises = [];

  for (let i = 0; i < files.length; i++) {
    promises.push(uploadToCloudinary(files[i].path));
  }

  const imagesUrl = await Promise.all(promises);

  for (let i = 0; i < files.length; i++) {
    localImagePromises.push(asyncUnlink(files[i].path));
  }

  await Promise.all(localImagePromises);

  return imagesUrl.map((img) => img.url);
};
