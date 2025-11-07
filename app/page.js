import Form from "./components/CalculatorForm";
import ThemeToggle from "./components/ThemeToggle";
import { calculatePostage } from "./utils/calculatePostage";

export default function MainPage(){
 
  return(
    <div className="min-w-screen min-h-screen relative flex flex-col p-10 xl:p-20 bg-gradient-to-b from-[#F7F9FC] to-[#E3E9F3] dark:bg-gradient-to-br dark:from-midnightIndigo dark:to-skyBlue">
      <div className="flex justify-end">
        <ThemeToggle/>
      </div>
      
         <h1 className="text-3xl md:text-4xl lg:text-5xl mb-5 md:mb-12 text-center font-caveatBrush dark:font-bold dark:text-transparent bg-clip-text text-gray-800 tracking-wide
       dark:bg-linear-to-r dark:from-skyBlue dark:to-vibrantBlue">
          Stamp Calculator
        </h1>
    
        <Form/>
    </div>
  )
}