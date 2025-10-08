
import React, { useState, createContext , useEffect} from 'react'

/* eslint-disable react-refresh/only-export-components */
export const ScoreBoardContext = createContext()

const Context = ({ children }) => {
  const [resultList, setResultList] = useState([])

  const currentUser = localStorage.getItem("username")

  
  useEffect(() => {
   if(currentUser){
      const stored = localStorage.getItem(`results_${currentUser}`);
      if (stored) {
        setResultList(JSON.parse(stored));
      }
   }
}, [currentUser]);

useEffect(() => {
  localStorage.setItem(`results_${currentUser}`, JSON.stringify(resultList));
}, [currentUser,resultList]);


  return (
    <ScoreBoardContext.Provider value={{ resultList, setResultList }}>
      {children}
    </ScoreBoardContext.Provider>
  )
}

export default Context
