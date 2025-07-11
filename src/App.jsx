import Header from "./components/Header"
import Result from "./components/Result"
import UserInput from "./components/UserInput"
import { useState } from "react"

function App() {
  const [investmentData, setInvestmentData] = useState({
          initialInvestment: 1000, 
          annualInvestment: 1200, 
          expectedReturn: 6, 
          duration: 10
      })
      
  const handleChange = (data, newValue) => {
      setInvestmentData(prev => {
          return {
              ...prev, 
              [data]: +newValue
          }
      })
  }

  const inputIsValid = investmentData.duration >=1 ;

  return (
    <>
      <Header />
      <UserInput onChange={handleChange} investmentData={investmentData}/>
      {!inputIsValid && <p className="center">Please enter a valid duration.</p>}
      {inputIsValid && <Result investmentData={investmentData}/>}
    </>
    
  )
}

export default App
