const express = require('express');
const CategoryModel = require('../models/category');
const router = express.Router();

router.post('/add', async (req, res) => {
    let { name } = req.body;
    if (!name) {
        return res.status(400).send("Please Enter the category name");
    }
    const newCategory = new CategoryModel({
        name: name
    })
    try {
        const savedCategory = await newCategory.save()
        res.status(200).send('New Category Created');
        return;
    }
    catch (e) {
        console.log(e);
        res.status(501).send(e.message);
        return;
    }
});

router.get('/getlist',async(req,res)=>{
    const categories = await CategoryModel.find({});
    res.send(categories);
})
module.exports = router;