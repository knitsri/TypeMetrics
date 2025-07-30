import React from 'react'
import Navbar from '../Navbar'
import './index.css'
import { useNavigate } from 'react-router-dom'


function Home() {
  const navigate = useNavigate()
  const onClickChallengeBtn = () => {
       navigate('/instructions')
  }
  return (
    <div className='home-container'>
      <Navbar/>
      <div className='bg-container'>
        <div className='bg-content-wrapper'>
             <h1 className='main-heading'>Welcome to TypeMetrics</h1>
             <h3 className="sub-heading">Master your speed. Beat the board.</h3>
             <button className='bg-challenge-button' onClick={onClickChallengeBtn}>Begin Challenge</button>  
        </div>
      </div>
    </div>
  )
}

export default Home
