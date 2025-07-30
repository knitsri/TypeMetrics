import React from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'


function InstructionsPage() {
  const navigate = useNavigate()
  const onClickStartBtn = () => {
       navigate("/challenge")
  }
  return (
      <div className='instructions-bg-container'>
      <h1 className='instructions-heading'>Instructions</h1>
      <p className="instructions-subheading">Before you begin, please read carefully:</p>
      <ul className="instructions-list">
      <li>🔹 Click “Start” to begin the challenge.</li>
      <li>🔹 The timer starts as soon as you click "Start", so begin typing right away.</li>
      <li>🔹 Type the text exactly as shown — including capital letters and punctuation.</li>
      <li>🔹 Don’t refresh or switch tabs during the challenge.</li>
    </ul>
    <button className="start-button" onClick={onClickStartBtn}>Start</button>
    </div>
  )  
}

export default InstructionsPage
