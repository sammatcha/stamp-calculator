const { calculatePostage } = require('../../app/utils/calculatePostage');
const postageController = require('../controllers/postageController');
const express = require('express');
const router = express.Router();

router.post('/postage', async function(req,res) {
    try {        
        const {weight, nonMachinable} = req.body;
        const result = await postageController.letterSearch(weight, nonMachinable);
        const hard = calculatePostage(weight, nonMachinable);
        return res.json({hardcoded:hard, metered:result});
    } catch(error) {
        res.status(500).send(`postage controller is not working ${error.message}`);
    }
});

module.exports = router;