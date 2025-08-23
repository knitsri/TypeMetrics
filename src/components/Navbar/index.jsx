import React, { useState } from 'react'
import './index.css'
import { Link, useNavigate } from 'react-router-dom'

const onClickLogoutBtn = () => {
  localStorage.removeItem("isLoggedIn")
}

function Navbar() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const onClickPracticeItem = () => {
    navigate('/instructions')
    setMenuOpen(false)
  }

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className='nav-bar-container'>
      <div className='logo-container'>
        <h1 className='app-name'>TypeMetrics</h1>
      </div> 
      <div className={`nav-items-container ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className='nav-link-item' onClick={() => setMenuOpen(false)}>
           <h2 className='home-text'>Home</h2>
        </Link>
        <h2 className='practice-text' onClick={onClickPracticeItem}>Practice</h2>
        <Link to="/scores" className='nav-link-item' onClick={() => setMenuOpen(false)}>
            <h2 className='leader-board-name'>My Scores</h2>
        </Link>
        <Link to="/login" className='nav-link-item' onClick={() => { onClickLogoutBtn(); setMenuOpen(false) }}>
           <h2 className='logout-text'>Log out</h2>
        </Link>
      </div>
      <div className="hamburger" onClick={handleToggleMenu}>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
      </div>
    </div>
  )
}

export default Navbar
