import React, { useState, useEffect,useContext } from 'react'
import './index.css'
import { FaClock } from "react-icons/fa";
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { useNavigate } from 'react-router-dom';
import { ScoreBoardContext } from "../../Context/Context";
import { useRef } from 'react';
const sampleTexts = [
  "Hard work beats talent when talent doesn’t work hard.",
  "Dreams don’t work unless you do. Push your limits every day.",
  "Discipline is the bridge between goals and achievements.",
  "Success is no accident. It is hard work and perseverance.",
  "Great things never come from staying in your comfort zone.",
  "Consistency and patience are the real keys to success.",
  "Small daily improvements lead to stunning long-term results.",
  "Believe in your infinite potential and trust your journey.",
  "Effort and courage are not enough without purpose and direction.",
  "Winners are not afraid of losing; they learn and grow from it."
];

function Challenge() {
  const {setResultList} = useContext(ScoreBoardContext)
  const [time, setTime] = useState(60) 
  const [isCompleted, setIscompleted] = useState(false)
  const [duration , setDuration] = useState(0) 
  const [userInput, setuserInput] = useState('')
  const userInputRef = useRef(userInput)
  const [accuracy, setAccuracy] = useState(0) 
  const [actualText] = useState(() => {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length)
    return sampleTexts[randomIndex]
  })
 
  // const [resultList, setResultList] = useState([])
  const { width, height } = useWindowSize()  

  const navigate = useNavigate()

  useEffect(() => {
    userInputRef.current = userInput
  },[userInput])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(prev => {
        if (prev <= 0) {
          clearInterval(intervalId)
          console.log(userInput)
          const acc = calculateAccuracy(actualText, userInputRef.current);
          setDuration(60)
          setAccuracy(acc)
          setIscompleted(true)
          const now = new Date().toLocaleString();
          setResultList(prev => [...prev,{k:60,acc,timeStamp:now}])
          return 0;
        } else {
          return prev - 1;
        }
      })
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  const calculateAccuracy = (actualText, userInput) => {
    let count = 0;
    for (let i = 0; i < actualText.length; i++) {
      if (actualText[i] === userInput[i]) {
        count += 1;
      }
    }
    const acc =  (count / actualText.length) * 100
    return acc;
  }

  const onClickSubmitBtn = () => {
    const k=60-time
    setDuration(60 - time)
    const acc = calculateAccuracy(actualText, userInput)
    setAccuracy(acc)
    setIscompleted(true)
    const now = new Date().toLocaleString();
    setResultList(prev => [...prev,{acc,k,timeStamp:now}])
  }

  const onChangeInputArea = event => {
    const typedValue = event.target.value
    setuserInput(typedValue)
    
  }

  const onClickRetryBtn = () => {
    navigate('/instructions')
  }

  const onClickHomeBtn = () => {
    navigate('/')
  }

  return (
    <div className='challenge-bg-container'>
      {isCompleted ? (
        <div className="result-card" style={{ position: 'relative', overflow: 'hidden' }}>
          
          {/* 🎉 Confetti only inside card */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}>
            <Confetti
              width={width}  
              height={height} 
              numberOfPieces={250}
              gravity={0.4}
              recycle={false}
            />
          </div>

          {/* 🎯 Result Details */}
          <h2 className="result-heading">🎉 Challenge Completed!</h2>
          <p className="result-line">⏱ Duration: {duration}s</p>
          <p className="result-line">✅ Accuracy: {accuracy.toFixed(2)}%</p>

          <div className="result-buttons">
            <button className="retry-button" onClick={onClickRetryBtn}>Retry</button>
            <button className="home-button" onClick={onClickHomeBtn}>Go to Home</button>
          </div>
        </div>
      ) : (
        <div className='card-container'>
          <div className='timer-section'>
            <FaClock className='clock-icon' />
            <p className='timer-text'>Time Left: {time}s</p>
          </div>

          <div className='para-section'>
            <p className='challenge-paragraph'>
              {actualText}
            </p>
          </div>

          <div className='input-section'>
            <textarea
              className='typing-area'
              placeholder='Start typing here...'
              rows={5}
              onChange={onChangeInputArea}
              value={userInput}
            />
          </div>

          <div className='submit-section'>
            <button className='submit-button' onClick={onClickSubmitBtn}>Submit</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Challenge
