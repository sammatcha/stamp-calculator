const {getAuthToken} = require('./helpers/uspsHelper');
const {letterSearch} = require('./services/postageService');

const testfull = async() =>{
    try{
         const result = await letterSearch(1, false)
         const result2= await letterSearch(1, true)
    }catch(error){
        throw error;
    }
}
testfull();