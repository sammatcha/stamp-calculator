export function validateInput(userInputOz){
    if (userInputOz <=0){
        return "Please enter valid weight";
    }
    if (userInputOz >3.5){
        return"Weight exceeds maximum limit of 3.5 oz";
    }
    return null;
}