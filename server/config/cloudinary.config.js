const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png','jpeg'],
    params: async (req, file) => {
      // Xác định resource_type dựa trên loại tệp
      let resource_type;
      if (file.mimetype.startsWith('image')) {
          resource_type = 'image';
      } else if (file.mimetype.startsWith('video')) {
          resource_type = 'video';
      } else {
          throw new Error('Invalid file type');
      }

      return {
          folder: 'Phimmoi-clone',
          resource_type: resource_type
      };
  }
  });

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
