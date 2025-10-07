
const postageService = require('../services/postageService');

exports.letterSearch = async(formData) => {
    try{
        const{weight, nonMachinable} = formData;
        const search = await postageService.letterSearch(weight, nonMachinable);
       return search;
      
    }catch(error)
    {
        throw error;
    }
   
}