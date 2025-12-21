function calculatePostage(userInput, isChecked){
     console.log("=== calculatePostage called ===");
    console.log("userInput:", userInput, "type:", typeof userInput);
    console.log("isChecked:", isChecked, "type:", typeof isChecked);
    const rates = {
        forever:        { cost: 0.78 },
        nonMachinable:  { cost: 1.27 },
        additional:     { cost: 0.29 },
        limit: 3.5,
    };

    const baseType = isChecked ? 'nonMachinable' : 'forever';
    const breakdown = [];
    
    let total = 0

    if (userInput <=0){
        return "Please enter valid weight";
    }

    if (userInput > rates.limit ){
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
          console.log("Processing item:", item);
    console.log("Looking for rates key:", item.type);
    console.log("rates[item.type]:", rates[item.type]);
     
        total += rates[item.type].cost * item.quantity;
        
    })
    
    return { breakdown:breakdown,total: total }
}

module.exports = { calculatePostage };
