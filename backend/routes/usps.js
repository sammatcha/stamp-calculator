const { calculatePostage } = require('../utils/calculatePostage');
const postageController = require('../controllers/postageController');
const express = require('express');
const router = express.Router();

router.post('/postage', async function(req,res) {
    try {       
        const {weight, nonMachinable} = req.body;
        const result = await postageController.letterSearch(weight, nonMachinable);
        const hard = calculatePostage(weight, nonMachinable);
        return res.json({hardcoded:hard, metered:result});
        }catch(error) {
        const errorMessage = error.response?.data || error.message || 'Unknown error';
        res.status(500).json({ 
            error: 'postage controller is not working', 
            message: 'Failed to fetch metered pricing',
            details: error.response?.data || error.stack
        });
    }
});

module.exports = router;
