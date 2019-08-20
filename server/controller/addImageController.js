const Image = require('../model/image')
const fs = require('fs')
exports.saveImage = async (req, res) => {
  const new_img = new Image({
    name: req.file.filename,
    image: req.file.path
  });
  await new_img.save();
  res.status(202).send({ message: 'New image added to the db!' });
}


exports.getImage = async (req, res) => {
  const images = await Image.find({});
  res.status(200).json(images)
}