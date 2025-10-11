
const postageService = require('../services/postageService');

exports.letterSearch = async(weight, nonMachinable) => {
    try{
        const search = await postageService.letterSearch(weight, nonMachinable);
       return search;
      
    }catch(error)
    {
        throw error;
    }
   
}