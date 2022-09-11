const express = require('express');
const AdModel = require('../models/ad');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const uploads = multer({ storage: storage });

router.post('/add', uploads.single('image'), async (req, res) => {
    console.log(req.file);
    let uploadedfile = process.env.BASE_URL + 'uploads/' + req.file.filename;
    const { title, description, price, category } = req.body;
    
    if (!title || !description || !price || !category) {
        res.status(400).send("All fields are required");
    }
    const newAd = new AdModel({
        title: title,
        description: description,
        price: price,
        sellerId: req.userInfo.id,
        category: category,
        imageUrl: uploadedfile
    })
    try {
        const savedAd = await newAd.save();
        res.status(200).send("New Ad added");
        return;
    }
    catch (e) {
        res.status(501).send(e.message);
        return;
    }
});

router.get('/all', async (req, res) => {
    const ads = await AdModel.find({});
    let accessedads = ads.filter(ad => ad.sellerId !== req.userInfo.id);
    res.status(200).send(accessedads);
});

router.delete('/delete', (req, res) => {

});

router.post('/interest', (req, res) => {

});

router.post('/close', (req, res) => {

})

module.exports = router;