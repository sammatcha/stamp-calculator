
const postageRates = {
    forever : {
        name: "Forever Stamp",
        cost: 0.73
    },
    additional: {
        name: "Additional Ounce",
        cost: 0.28
    },
    
    nonMachineable: {
        name: "Non-Machineable",
        cost: 1.19
    },
           limit: 3.5,
}
    

export function calculatePostage(userInput, isChecked){
    const baseType = isChecked ? 'nonMachineable' : 'forever';
    const breakdown = [];
    
    let total = 0

    if (userInput <=0){
        return "Please enter valid weight";
    }

    if (userInput > postageRates.limit ){
        return "Weight exceeds maximum limit of 3.5 oz";
    }

    breakdown.push({
        type: baseType,
        quantity: 1,
        
    });


    if (userInput > 1){
       const additionalOz = Math.ceil(userInput-1);
        breakdown.push({
            type: 'additional',
            quantity: additionalOz
        });
    }

    breakdown.forEach((item) => {
        total += postageRates[item.type].cost * item.quantity;
    })
    
    return {breakdown:breakdown, 
        total: total
        }
        
    

  

   
}
 


