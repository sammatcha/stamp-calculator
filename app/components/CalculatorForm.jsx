'use client'
import React from 'react';
import { useState } from 'react';
import { calculatePostage } from '../utils/calculatePostage';
import { CircleQuestionMark, XIcon } from 'lucide-react';
import { basePath } from '../utils/config';

export default function Form(){
    const [userInput, setUserInput] = useState("");
    const [results, setResults] = useState('');
    const [isChecked, setIsChecked ] = useState(false);
    const [showToolTip, setShowToolTip] = useState(false);
    const [meteredResult, setMeteredResult] = useState('');
    const roundedTotal = Math.round(results.total *100)/ 100;
    const [error,setError] = useState(false);

    async function handleSubmit(e) {
    e.preventDefault(); // prevent refresh
    const calculated =  calculatePostage(userInput, isChecked);
        if (typeof calculated === 'string'){
            setError(calculated)
            setResults('')
             console.log("error", calculated)
            return;
           
        }
        setError('')
        setResults(calculated)
        
    try{
         const metered = await fetch('https://usps.dangnas.cloud/api/postage', {
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
        <form method= 'post' onSubmit={handleSubmit} className="w-full mx-auto flex flex-col justify-center items-center relative z-10   ">
            <div className='max-w-5xl flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 w-full items-center md:items-stretch  ' >
                    <div className="dark:bg-formBox1 dark:shadow-2xl dark:outline-outlineColor dark:outline-2 dark:outline-offset-2 flex flex-col max-w-md sm:max-w-xl lg:max-w-2xl 2xl:max-w-3xl dark:text-slate-700 dark:border-transparent pb-20
                     rounded shadow-xl  bg-white/60 hover:shadow-lg dark:hover:shadow-indigo-600/50 w-full lg:w-1/2  border-gray-300 border 
                    ">
                    
                        <section className='flex flex-col justify-center items-center space-y-5 font-nunitoSans '>
                            <label className='text-lg md:text-xl lg:text-2xl font-bold mt-4 sm:mt-10 dark:text-white text-uspsBlue'>
                               Letter Weight
                
                            </label>
                                <div className='flex'>
                                    <input className="text-lg md:text-xl lg:text-2xl bg-transparent border-b text-slate-800 placeholder-slate-500  dark:text-gray-500 px-1 dark:bg-duskyBlue border-uspsBlue/60 dark:placeholder-gray-400 text-center " 
                                    name="userInput" 
                                    value={userInput}
                                    type='number'
                                    onChange ={(e)=> setUserInput(e.target.value)}
                                    placeholder="weight" 
                                    />
                                    <div >
                                        <h2 className='text-xl md:text-2xl text-slate-800  dark:text-gray-500'>oz</h2>
                                    </div>
                                </div>
                            <div className='relative flex space-x-3 px-3 md:px-7 text-slate-700  dark:text-white'>
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
                            className="bg-uspsBlue rounded-lg text-white dark:text-white font-extrabold text-lg lg:text-xl outline-white outline-offset-2 dark:bg-gradient-to-bl dark:from-vibrantBlue dark:to-80% dark:to-skyBlue
                            cursor-pointer hover:bg-uspsBlue/90 border-white border-2 hover:focus:ring-2 focus:ring-[#0071E3] hover:text-white max-w-xl mx-auto px-2 py-2 lg:px-5 lg:py-2 ">
                               Calculate Postage
                            </button>
                        </section>      
                    </div>
                <div className='flex flex-col items-center justify-evenly w-full lg:w-1/2 hover:shadow-lg bg-white/60 border-gray-300 border dark:bg-formBox1 dark:shadow-2xl dark:outline-outlineColor dark:outline-2 dark:outline-offset-2 dark:border-transparent rounded shadow-xl space-y-5 dark:hover:shadow-indigo-600/50'>      
                    <div className='mt-5 flex border-b'>
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
                                    <img src={src} alt={item.type} key={`${index}-${i}`} className="size-30 mx-2 object-contain bg-beige " />
                                ))
                              
                                )})
                        )}
                 
                    </div>

                    <div className='space-y-3 text-center md:pb-10 max-w-lg mx-auto h-full items-center justify-center flex '>
                        {error ? (
                            <div className='flex flex-col text-red-800 dark:text-red-400 text-center items-center justify-center text-lg lg:text-xl '><span className='inline-flex items-center justify-center mb-5'>
                                <XIcon className='w-15 '/> Error
                                </span>
                                {error}
                            </div>
                        ) : (
                           
                              results.total ? (
                             <div>
                                <div className=' border rounded dark:bg-gradient-to-bl dark:from-vibrantBlue dark:to-80% dark:to-skyBlue w-full px-4 py-2 md:px-15 md:py-1 bg-uspsBlue '>
                                    <p className=' text-white text-base md:text-lg font-nunitoSans flex flex-col font-bold'>Standard Total <span className='text-lg md:text-2xl font-extrabold'>${roundedTotal}</span></p>
                                </div>
                                <div className='border py-1 rounded dark:bg-formBox1 w-full bg-uspsBlue '>
                                    {meteredResult?.metered?.totalBasePrice && ( 
                                        <p className='text-base text-slate-200 font-nunitoSans flex flex-col font-bold dark:bg-gradient-to-bl dark:from-vibrantBlue dark:to-80% dark:to-skyBlue dark:text-white'>Metered Price <span className='text-slate-200 dark:text-white font-extrabold'>${meteredResult.metered.totalBasePrice}</span></p>
                                    )}
                                </div>
                            </div>
                            ):(
                                <div className='flex items-center w-full text-slate-500 dark:text-slate-200' >
                                    <p className='flex justify-center items-center'>Enter weight to calculate postage</p>
                                </div> 
                            )
                            
                        
                        )}
                    </div>

                </div>  
            </div>
        </form>
    )
}


   