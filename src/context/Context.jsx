
import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider =(props) =>{

    const [input,setInput]=useState('');
    const [recentPrompt,setRecentPrompt]=useState('');
    const [prevPrompt,setPrevPrompts]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loading,setLoading]=useState(false);
    const [resultData,setResultData]=useState('');

    const delaypara =(index,nextword)=>{
        setTimeout(function(){
              setResultData(prev=>prev+nextword);
        },75*index)
    }
  
    const newChat=()=>{
        setLoading(false)
        setShowResult(false)
    }
     
    const onSent = async(prompt) =>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        
        let response;
        if(prompt !==undefined){
            response =await run(prompt)
            setRecentPrompt(prompt)
        }

        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response =await run(input)
            
        }

        // setRecentPrompt(input)
        // const response =await run(input)
        // setPrevPrompts(prev=>[...prev,input])
        let responseArray=response.split("**");
        // console.log(responseArray)
         //remove ** and bolding the import word
        let newArray="";
        for(let i=0;i<responseArray.length;i++){
            if(i==0 || i%2!==1){
                newArray+=responseArray[i];
            }
            else{
                newArray +='<b>'+responseArray[i]+'</b>'
            }
        }
        let newArray2=newArray.split('*').join('<br/>')
        let newResponseArray=newArray2.split(" ");
        for(let i=0;i<newResponseArray.length;i++){
            const nextword=newResponseArray[i]
            delaypara(i,nextword+" ");
        }
        setLoading(false)
        setInput('')

    }

     

    // onSent('what is html')
    
    const contextValue ={
          prevPrompt,
          setPrevPrompts,
          onSent,
          setRecentPrompt,
          recentPrompt,
          showResult,
          loading,
          resultData,
          input,
          setInput,
          newChat
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;