const axios = require('axios');

const length = 11.5;
const height = 6.125;
const thickness = 0.25;
const processingCategory = "LETTERS";

 const letterSearch = async (weight, nonMachineable) => {
    try {
            const response= await axios.post('https://apis-tem.usps.com/prices/v3/letter-rates/search',{
                weight: weight,
                nonMachineable: nonMachineable,
                length,
                height,
                thickness,
                processingCategory
            })
            return response.data
        }catch(error){
            console.error("problem fetching rates from usps", error.message);
            throw error;
        }
    }
    
module.exports = {letterSearch};