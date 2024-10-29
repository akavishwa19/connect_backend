import { ApiResponse } from "../Utils/ApiResponse.js";
import { ApiError } from "../Utils/ApiError.js";
import { getStorage } from "firebase-admin/storage";

const bucket = getStorage().bucket();

const imageUpload = async (req, res) => {
  try {
    const acceptedImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/tiff",
      "image/svg+xml",
      "image/webp",
      "image/heic",
      "image/heif",
    ];

    const file = req.file;
    if (!acceptedImageTypes.includes(file.mimetype)) {
      return res
        .status(500)
        .json(
          new ApiError(
            500,
            "The given file is not supported to upload to the server"
          )
        );
    }
    const nameOfFile = file.originalname;
    let date = Date.now();
    let filename = `${date}_${file.originalname.replaceAll(/\s/g, "")}`;
    let originalImage = `original${filename}`;

    const upload = await bucket
      .file(originalImage)
      .createWriteStream()
      .end(file.buffer);
    setTimeout(() => {
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            filename: `original${filename}`,
          },
          "File uploded successfully"
        )
        // filename:  https://firebasestorage.googleapis.com/v0/b/connect-1d92d.appspot.com/o/${filename}?alt=media
      );
    }, 500);
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

const generalUpload = async (req, res) => {
  try {
    const file = req.file;
    const nameOfFile = file.originalname;
    let date = Date.now();
    let filename = `${date}_${file.originalname.replaceAll(/\s/g, "")}`;
    let originalImage = `original${filename}`;

    const upload = await bucket
      .file(originalImage)
      .createWriteStream()
      .end(file.buffer);
    setTimeout(() => {
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            filename: `original${filename}`,
          },
          "File uploded successfully"
        )
        // filename:  https://firebasestorage.googleapis.com/v0/b/connect-1d92d.appspot.com/o/${filename}?alt=media
      );
    }, 500);
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export { imageUpload, generalUpload };
