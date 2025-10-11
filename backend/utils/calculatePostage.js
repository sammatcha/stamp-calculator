function calculatePostage(userInput, isChecked){
    const rates = {
        forever:        { cost: 0.68 },
        nonMachinable:  { cost: 1.06 },
        additional:     { cost: 0.24 },
    };

    const baseType = isChecked ? 'nonMachineable' : 'forever';
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
        total += rates[item.type].cost * item.quantity;
    })
    
    return { breakdown:breakdown,total: total }
}

module.exports = { calculatePostage };
