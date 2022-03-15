import { useEffect, useState } from "react"
import axios from 'axios'
import { ReactComponent as DesktopDivider } from './images/pattern-divider-desktop.svg'
import { ReactComponent as DiceButton } from './images/icon-dice.svg'

function App() {
  const [advice, setAdvice] = useState('')
  const [adviceIndex, setAdviceIndex] = useState(0)

  const adviceService = () => {
    axios.get('https://api.adviceslip.com/advice')
      .then(res => {
        setAdvice(res.data.slip.advice)
        setAdviceIndex(res.data.slip.id)
        console.log('advice, adviceIndex', advice, adviceIndex, res.data.slip)
      })
  }

  const handleClick = (e) => {
    e.preventDefault()
    console.log('click')
    adviceService()
  }

  useEffect(() => {
    adviceService()
    console.log('first')
  })

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="relative grid container place-items-center rounded-xl mx-auto bg-darkgrayishblue w-auto h-auto">
        <p className="font-manrope text-neongreen text-center pt-7">Advice #{adviceIndex}</p>
        <p className="text-2xl text-lightcyan px-7 py-7 text-center max-w-md">"{advice}"</p>
        <DesktopDivider />
        <button className="absolute -bottom-6" onClick={handleClick}>
          <div className="bg-neongreen rounded-full flex justify-center pt-2 px-2 h-10 hover:saturate-150">
            <DiceButton />
          </div>
        </button>
      </div>
    </div>
  )
}

export default App;
