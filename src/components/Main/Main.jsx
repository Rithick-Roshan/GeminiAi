import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
const Main = () => {

  const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}=useContext(Context)

  const handleKeyDown=(e)=>{
    if(e.key=='Enter'){
      onSent(input);
    }
  }
  

  return (
    <div className='main'>
        <div className='nav'>
          <p>Gemini</p>
          <img src={assets.user_icon} />
        </div>
        <div className='main-container'>
        {!showResult?
        <>
          <div className='greet'>
            <p><span>Hello, Rosh</span></p>
            <p>How can i help you today</p>
          </div>
          <div className='cards'>
            <div className='card'>
              <p>Help me plan a game night with 5 friends for under $100 </p>
              <img src={assets.compass_icon} />
            </div>
            <div className='card'>
              <p> Suggest beautiful places to see on an upcoming road trip  </p>
              <img src={assets.bulb_icon} />
            </div>
            <div className='card'>
              <p> Brainstorm ideas for a mocktail given specific ingredients </p>
              <img src={assets.message_icon} />
            </div>
            <div className='card'>
              <p> Help me compare these college majors  </p>
              <img src={assets.code_icon} />
            </div>
          </div>
        </>
        :
        
        <div className='result'>
            <div className='result-title'>
                <img src={assets.user_icon}/>
                <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
                <img src={assets.gemini_icon} />
                {loading?
                <div className='loader'>
                    <hr />
                    <hr />
                    <hr />

                </div>:
                <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                }
            </div>
        </div>

        }
          
          <div className='main-bottom'>
              <div className='search-box'>
                <input onChange={(event)=>setInput(event.target.value)} onKeyDown={handleKeyDown} value={input} className='search-input' type='text' placeholder='enter your input ' />
                <div>
                   <img src={assets.gallery_icon} />
                   <img src={assets.mic_icon} />
                  {input?<img onClick={()=>onSent()} src={assets.send_icon} />:null} 
                </div>
              </div>
              <p className='bottom-info'> Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps </p>
          </div>
        </div>
    </div>
  )
}

export default Main