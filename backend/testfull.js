const {getAuthToken} = require('./helpers/uspsHelper');
const {letterSearch} = require('./services/postageService');

const testfull = async() =>{
    try{
        console.log("This is testing it in full")
         const result = await letterSearch(1, false)
         console.log("results:", result)

         const result2= await letterSearch(1, true)
         console.log("results:", result2)
    }catch(error){
        throw error;
    }
}
testfull();