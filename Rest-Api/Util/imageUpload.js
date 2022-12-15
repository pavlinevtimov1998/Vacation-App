const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { promisify } = require("util");
const { unlink } = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Uploads");
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
  const filesPath = [];
  const localImagePaths = [];

  for (let i = 0; i < files.length; i++) {
    filesPath.push(files[i].path);
    localImagePaths.push(files.length[i]);
  }

  const imagesUrl = await Promise.all(
    filesPath.map((p) => uploadToCloudinary(p))
  );
  await Promise.all(filesPath.map((p) => asyncUnlink(p)));

  return imagesUrl.map((img) => img.url.replace("http", "https"));
};
