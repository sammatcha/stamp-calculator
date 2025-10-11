const axios = require('axios');
const { getAuthToken } = require('../helpers/uspsHelper');
require('dotenv').config();

const letterSearch = async (weight, nonMachinable) => {
    try {

        const token = await getAuthToken();
        console.log('Token received:', token.substring(0, 20) + '...');
        
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
        
        console.log('Response:', response.data);
        return response.data;
        
    } catch(error) {
        throw error;
    }
}
    
module.exports = {letterSearch};
