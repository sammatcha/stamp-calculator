const {getAuthToken} = require('./helpers/uspsHelper');
require('dotenv').config();


const testToken = async () => {
    try{
        console.log("testing token function")
        const token = await getAuthToken();
        console.log("token received:", token.substring(0,20) + '')
    }catch(error){
        throw error;
        console.log("error", error.message)
    }
    
};
testToken();