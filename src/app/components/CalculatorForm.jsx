'use client'
import React from 'react';
import { useState } from 'react';
import { calculatePostage } from '../utils/calculatePostage';
import { CircleQuestionMark } from 'lucide-react';

export default function Form(){
    const [userInput, setUserInput] = useState("");
    const [results, setResults] = useState('');
    const [isChecked, setIsChecked ] = useState(false);
    const [showToolTip, setShowToolTip] = useState(false);

    function handleSubmit(e) {
    e.preventDefault(); // prevent refresh
    const calculated =  calculatePostage(userInput, isChecked);
    setResults(calculated); 
    console.log(calculated); 
} 

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked)
        console.log("ischecked", isChecked);
    }

    function handleToolTipClick(e){
        e.stopPropagation();
    setShowToolTip(prev => !prev);
    }

    return(
        <form method= 'post' onSubmit={handleSubmit} className="w-full  max-w-sm mx-auto ">
            
            <div className="flex flex-col w-full items-center justify-center space-y-6">
                <label className='text-md lg:text-xl xl:text-2xl'>
                        Weight (oz)
                
                </label>
                <input className="rounded text-gray-500 px-1 w-64 bg-gray-500 dark:bg-white placeholder-gray-400 " 
                        name="userInput" 
                        value={userInput}
                        type='number'
                        onChange ={(e)=> setUserInput(e.target.value)}
                        placeholder="weight" 
                    />
                <div className='relative  items-center justify-center inline-flex space-x-3'>
                       
                            <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange}  />
                            Is envelope rigid or 1/4 inch thick
                    
                      
                   <CircleQuestionMark className='cursor-help ml-1 w-4' onClick={(e) => {handleToolTipClick(e)}}/>

                    {showToolTip && (
                            <div className='md:absolute md:left-full flex text-slate-300 text-xs sm:text-sm px-5'>
                             If it feels thick, it might need a non-machineable
                            </div>
                        )}
                </div>
                       
                    <button type="submit" onClick={handleSubmit} 
                    className="bg-white text-gray-500 rounded  
                       cursor-pointer w-64">
                    Enter
                  
                    </button>
                        <div className='flex items-center justify-center'>
                        {results?.breakdown && (
                            results?.breakdown.map((item, index) => {
                                const src = (() => {
                                 if(item.type === 'forever'){
                                    return '/assets/standard-stamp.png'
                                    }else if(item.type === 'nonMachineable'){
                                        return '/assets/non-machineable.svg'
                                }else{
                                    return '/assets/add-oz.svg'
                                }
                            })();
                                return (
                                    Array.from({length: item.quantity}).map((_, i) => (
                                    <img src={src} alt={item.type} key={`${index}-${i}`} className="aspect-[4/3] m-2" />
                                ))
                              
                        )})
                     )}
                 
                    </div>
                        {results.total && (
                            <p>total: ${results.total}</p>
                         )}
                    </div>
            
        </form>
           
        
    )
}

