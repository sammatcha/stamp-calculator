'use client'
import React from 'react';
import { useState } from 'react';
import { calculatePostage } from '../utils/calculatePostage';
import { CircleQuestionMark } from 'lucide-react';
import { basePath } from '../utils/config';

export default function Form(){
    const [userInput, setUserInput] = useState("");
    const [results, setResults] = useState('');
    const [isChecked, setIsChecked ] = useState(false);
    const [showToolTip, setShowToolTip] = useState(false);
    const [meteredResult, setMeteredResult] = useState('');
    const roundedTotal = Math.round(results.total *100)/ 100;
    
    async function handleSubmit(e) {
    e.preventDefault(); // prevent refresh
    const calculated =  calculatePostage(userInput, isChecked);

    try{
         const metered = await fetch('https://stamp-calculator.onrender.com/api/postage', {
            method: "POST",
            headers : {
                "Content-Type":"application/json"
            },
     
        body: JSON.stringify({
            weight:userInput,
            nonMachinable: isChecked
         })
    });
        if(!metered.ok){
            throw new Error(`Response status:,${metered.status}`);
        }
        const data = await metered.json();
        
        setMeteredResult(data);
    }catch(error) {
        console.error('API call failed:', error);
    }
   
    
     setResults(calculated); 
    } 

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked)
        // console.log("ischecked", isChecked);
    }

    function handleToolTipClick(e){
        e.stopPropagation();
    setShowToolTip(prev => !prev);
    }

    return(
        <form method= 'post' onSubmit={handleSubmit} className="min-w-full lg:px-20 mx-auto flex justify-center items-center relative z-10 flex-col container">
           
                <div className=" w-full flex flex-col  aspect-square dark:text-slate-700 border py-10 border-uspsBlue/20 bg-white/70 backdrop-blur-sm max-w-md ">
                    <div className='flex flex-col justify-center items-center space-y-6'>
                    <label className='text-md lg:text-3xl xl:text-4xl font-bold font-robotoMono mt-10 '>
                        Weight (oz)
                
                    </label>
                    <input className="rounded text-gray-500 px-1 w-64 bg-gray-400 dark:bg-gray-100 border-uspsBlue/60 border-2 placeholder-gray-400 " 
                        name="userInput" 
                        value={userInput}
                        type='number'
                        onChange ={(e)=> setUserInput(e.target.value)}
                        placeholder="weight" 
                    />
                    <div className='items-center justify-center inline-flex space-x-3'>
                       <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} className='cursor-pointer ' />
                            Is envelope rigid or 1/4 inch thick
                    
                      
                   <CircleQuestionMark className='cursor-help ml-1 w-4' onClick={(e) => {handleToolTipClick(e)}}/>

                    {showToolTip && (
                            <div className='md:absolute md:left-full flex text-slate-500 text-xs sm:text-md z-20 px-5'>
                             If it feels thick, it might need a non-machineable
                            </div>
                        )}
                    </div>
                       
                    <button type="submit" onClick={handleSubmit} 
                    className="bg-white rounded text-slate-900
                       cursor-pointer w-64 hover:bg-uspsBlue/90 border-uspsBlue border-2 hover:focus:ring-2 focus:ring-[#0071E3] hover:text-white">
                    Enter
                    </button>
                  </div>      
                </div>
            
            <div className='flex items-center justify-center '>
                        {results?.breakdown && (
                            results?.breakdown.map((item, index) => {
                                const src = (() => {
                                 if(item.type === 'forever'){
                                    return `./assets/standard-stamp-4.png`
                                    }else if(item.type === 'nonMachineable'){
                                        return `./assets/non-machineable-4.png`
                                }else{
                                    return `./assets/add-oz-4.png`
                                }
                            })();
                                return (
                                    Array.from({length: item.quantity}).map((_, i) => (
                                    <img src={src} alt={item.type} key={`${index}-${i}`} className=" w-42 h-42 mx-2 object-contain bg-beige " />
                                ))
                              
                                )})
                        )}
                 
            </div>
                        {results.total && (
                            <p className='font-semibold text-amber-500'>Standard Total: ${roundedTotal}</p>
                         )}

                         {meteredResult?.metered?.totalBasePrice && (
                            <p className='text-xl text-gray-700 dark:text-black'>Metered total price ${meteredResult.metered.totalBasePrice}</p>
                         )}
              
          
        </form>
           
        
    )
}

// https://usps.dangnas.cloud/api/postage'