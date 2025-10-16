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
     
    }

    function handleToolTipClick(e){
        e.stopPropagation();
    setShowToolTip(prev => !prev);
    }

    return(
        <form method= 'post' onSubmit={handleSubmit} className="w-full mx-auto flex justify-center items-center relative z-10 flex-col  ">
               
                    <div className="flex flex-col w-full max-w-md sm:max-w-xl lg:max-w-2xl 2xl:max-w-3xl dark:text-slate-700 border-transparent pb-20
                    min-h-[400px] sm:min-h-[450px] lg:min-h-[550px] py-8 sm:py-10 lg:py-14 2xl:py-16 rounded shadow-xl bg-white/60 
                    ">
                    
                        <div className='flex flex-col justify-center items-center space-y-5 font-nunitoSans '>
                            <label className='text-xl md:text-2xl lg:text-3xl font-bold sm:mt-10 '>
                                Weight (oz)
                
                            </label>
                            <input className="rounded w-2/3 sm:w-1/2 lg:w-2/5 text-gray-500 px-1 bg-gray-400 dark:bg-gray-100 border-uspsBlue/60 border-2 placeholder-gray-400 text-[14px] " 
                            name="userInput" 
                            value={userInput}
                            type='number'
                            onChange ={(e)=> setUserInput(e.target.value)}
                            placeholder="weight" 
                            />
                            <div className='relative flex space-x-3 px-7 mb-20 '>
                                <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} className='cursor-pointer ' />
                                    Is envelope rigid or 1/4 inch thick?
                    
                            
                                    <CircleQuestionMark className='cursor-help w-4 ml-1 md:ml-5' onClick={(e) => {handleToolTipClick(e)}}
                                    />
                                    {showToolTip && (
                                        <div className='absolute top-full left-1/2 -translate-x-1/2 mt-2
                                        md:left-full md:top-1/2 md:translate-x-2 md:-translate-y-1/2 md:mt-0 md:ml-6
                                         text-sm px-3 md:px-5 bg-black text-white z-50 w-max max-w-[240px] rounded whitespace-normal text-center'>
                                        If it feels thick, it might need a non-machineable
                                        </div>
                                    )}
                              
                                    
                            </div>
                                
                            <button type="submit" onClick={handleSubmit} 
                            className="bg-white rounded text-slate-900
                            cursor-pointer w-2/3 sm:w-1/2 lg:w-2/5 hover:bg-uspsBlue/90 border-uspsBlue border-2 hover:focus:ring-2 focus:ring-[#0071E3] hover:text-white font-bold">
                                Enter
                            </button>
                        </div>      
                    </div>
                                
            <div className='flex items-center justify-center mt-5'>
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
                            <p className=' text-amber-500 text-xl font-manRope'>Standard Total: ${roundedTotal}</p>
                           
                            
                         )}

                         {meteredResult?.metered?.totalBasePrice && (
                            <p className='text-sm text-gray-700 dark:text-black font-manRope'>Metered total price ${meteredResult.metered.totalBasePrice}</p>
                         )}
              
      
        </form>
           
        
    )
}

