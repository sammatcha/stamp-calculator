const postageController = require('../controllers/postageController');
const express = require('express');
const router = express.Router();

router.post('/postage', async function(req,res) {
    try {
         const formData = req.body;
        console.log('received form from frontend')
        const result = await postageController.letterSearch(formData)
        return res.json(result);
    }catch(error){
       res.status(500).send(`postage controller is not working ${error.message}`)
    }
   
});


module.exports = router;