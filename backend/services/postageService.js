const axios = require('axios');
const { getAuthToken } = require('../helpers/uspsHelper');
require('dotenv').config();

const letterSearch = async (weight, nonMachinable) => {
    try {

        const token = await getAuthToken();
        
        const response = await axios.post('https://apis.usps.com/prices/v3/letter-rates/search', {
            weight:parseFloat(weight),
            nonMachinableIndicators: {
                "isPolybagged": false,
                "hasClosureDevices": false,
                "hasLooseItems": false,
                "isRigid": nonMachinable,
                "isSelfMailer": false,
                "isBooklet": false
            },
            length: 11.5,
            height: 6.125,
            thickness: 0.25,
            processingCategory: "LETTERS"
    
        } , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
        
    } catch(error) {
        console.error('USPS API error:', error.response?.data || error.message);
        // Re-throw with more context
        if (error.response) {
            throw new Error(`USPS API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
            // The request was made but no response was received
            throw new Error('USPS API request failed: No response received');
        } else {
            // Something happened in setting up the request
            throw new Error(`USPS API error: ${error.message}`);
        }
    }
}
    
module.exports = {letterSearch};
