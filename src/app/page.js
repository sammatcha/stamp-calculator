import Form from "./components/CalculatorForm";
import { calculatePostage } from "./utils/calculatePostage";

export default function MainPage(){
 
  return(
    <div className="min-w-screen min-h-screen relative flex flex-col items-center p-10 xl:p-20 ">
     
         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-12 text-center">Stamp Calculator</h1>

        <Form/>

   
     





    </div>
  )
}