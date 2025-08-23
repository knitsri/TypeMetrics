import React from 'react'
import './index.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const [name, setName] = useState('')
  const [pwd, setPwd] = useState('')
  const [nameInputErr, setNameInputErr] = useState('')
  const [pwdInputErr, setPwdInputErr] = useState('')
  const [pwdLenErr, setPwdLenErr] = useState('')

  const navigate = useNavigate() 
  let isValid=false

  const onChangeInputName = event => {
    setName(event.target.value)
  }

  const onChangeInputPwd = event => {
    setPwd(event.target.value)
  }

  const onSubmitLoginForm = event => {
    event.preventDefault()
    setNameInputErr('')
    setPwdInputErr('')
    setPwdLenErr('')

    isValid=!isValid
     if(name == "" || pwd == "") {
        if(name == "") {
          setNameInputErr('*Please enter your name')
          isValid = false 
        }
        if(pwd == "") {
          setPwdInputErr('*Please enter the password')
          isValid = false
        }
     }
     if(pwd != "" && pwd.length<6){
      setPwdLenErr('*Password must be at least 6 characters.')
      isValid = false
     }

     if(isValid){
      localStorage.setItem("isLoggedIn", 'true')
      navigate("/",{replace:true})
     }
  }
  return (
    <div className='form-container'>
      <form className='form' onSubmit={onSubmitLoginForm}>
        <h1 className='typemetrics-heading'>TypeMetrics</h1>
        <div className='name-input-container'>
            <label htmlFor='name'>Name</label>
            <input id="name" type="text" className='input-field' value={name} onChange={onChangeInputName} placeholder='Enter name'/>
            {nameInputErr && <p className='errMsg'>{nameInputErr}</p>}
            
        </div>
        <div className='name-input-container'>
            <label htmlFor='pwd'>Password</label>
            <input id="pwd" type="password" className='input-field' value={pwd} onChange={onChangeInputPwd} placeholder='Enter password'/>
            {pwdInputErr && <p className='errMsg'>{pwdInputErr}</p>}
            {pwdLenErr && <p className='errMsg'>{pwdLenErr}</p>}
            
        </div>
        <div className='button-container'>
           <button className='logIn-button'>Login In</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
