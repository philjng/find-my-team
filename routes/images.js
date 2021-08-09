var express = require("express");
var router = express.Router();

const { cloudinary } = require('./../utils/cloudinary')

router.get('/', async (req, res) => {
  const { resources } = await cloudinary.search
      .expression('folder:dev')
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

router.post('/', async (req, res) => {
  try {
      const fileString = req.body.data;
      const uploadResponse = await cloudinary.uploader.upload(fileString, {
          upload_preset: 'dev',
      });
      res.json(uploadResponse);
  } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Something went wrong with image upload' });
  }
});
module.exports = router;
