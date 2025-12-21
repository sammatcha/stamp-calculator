const { calculatePostage } = require('../utils/calculatePostage');
const postageController = require('../controllers/postageController');
const express = require('express');
const router = express.Router();

router.post('/postage', async function(req,res) {
     console.log('=== POSTAGE ROUTE START ===');
    try {       

        const {weight, nonMachinable} = req.body;
        const result = await postageController.letterSearch(weight, nonMachinable);

        console.log('letterSearch result:', JSON.stringify(result, null, 2));
        // const hard = calculatePostage(weight, nonMachinable);
        
        return res.json({ metered:result});
        console.log("res", res.json)
    } catch(error) {
        console.log("postage api error:", error)
        const errorMessage = error.response?.data || error.message || 'Unknown error';
        res.status(500).json({ 
            error: 'postage controller is not working', 
            message: 'Failed to fetch metered pricing',
            details: error.response?.data || error.stack
        });
    }
});

module.exports = router;
// hardcoded:hard,