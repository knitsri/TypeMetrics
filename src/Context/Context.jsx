import React, { useState, createContext , useEffect} from 'react'

export const ScoreBoardContext = createContext()

const Context = ({ children }) => {
  const [resultList, setResultList] = useState([])
  
  useEffect(() => {
  const stored = localStorage.getItem("results");
  if (stored) {
    setResultList(JSON.parse(stored));
  }
}, []);

useEffect(() => {
  localStorage.setItem("results", JSON.stringify(resultList));
}, [resultList]);


  return (
    <ScoreBoardContext.Provider value={{ resultList, setResultList }}>
      {children}
    </ScoreBoardContext.Provider>
  )
}

export default Context
