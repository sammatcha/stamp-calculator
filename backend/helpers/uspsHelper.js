const axios = require('axios');
require('dotenv').config();

let cachedToken= null;
let tokenExpiry=null;

const getAuthToken = async()=>{
    try{
        if(cachedToken && tokenExpiry && Date.now() < tokenExpiry){
            return cachedToken
        }else{
            console.log("🔵 [USPS] Requesting new token...");
            const token = await axios.post('https://apis.usps.com/oauth2/v3/token' , 
                'grant_type=client_credentials&client_id=' + process.env.USPS_CLIENT_ID + '&client_secret=' + process.env.USPS_SECRET,
               
            {
                headers:
                {
                    "Content-Type" : "application/x-www-form-urlencoded"
                }
            })
            console.log("🟢 [USPS] Token received:", token.data);
           cachedToken = token.data.access_token;
           tokenExpiry = Date.now() + (token.data.expires_in * 1000)
           return cachedToken;

        }
        
    }catch(error){
        console.error("🔴 [USPS] Token request failed:", error?.response?.data || error.message);
        throw error;
    }
}
module.exports = {getAuthToken};