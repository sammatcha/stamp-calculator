const {getAuthToken} = require('./helpers/uspsHelper');
require('dotenv').config();


const testToken = async () => {
    try{
        const token = await getAuthToken();
    }catch(error){
        throw error;
        console.log("error", error.message)
    }
    
};
testToken();