import { useEffect, useState } from "react"
import axios from 'axios'
import { ReactComponent as DesktopDivider } from './images/pattern-divider-desktop.svg'
import { ReactComponent as MobileDivider } from './images/pattern-divider-mobile.svg'
import { ReactComponent as DiceButton } from './images/icon-dice.svg'

function App() {
  const [advice, setAdvice] = useState('Loading...')
  const [adviceIndex, setAdviceIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const adviceService = () => {
    axios.get(`https://api.adviceslip.com/advice/${adviceIndex}`)
      .then(res => {
        setAdvice(res.data.slip.advice)
      })
      // Gets a new ID in case API has empty advice
      .catch(err => setAdviceIndex(getRandomId))
  }

  const handleResize = () => {
    if (window.innerWidth < 650) {
      setIsMobile(true)
    }
    else {
      setIsMobile(false)
    }
  }

  // Keeps track of users screensize, changes state to isMobile in case of a small screen
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  useEffect(() => {
    handleResize()
    if (adviceIndex === 0) {
      setAdviceIndex(getRandomId)
    }
    else {
      adviceService()
    }
  },[adviceIndex])

  const handleClick = (e) => {
    e.preventDefault()
    setAdviceIndex(getRandomId)
  }

  // Random IDs between 1-225 for API calls
  const getRandomId = () => Math.floor(Math.random() * 225)

  const dividerDecider = () => {
    if (isMobile) {
      return ( 
        <MobileDivider />
      )
    } 
    else { 
      return ( 
        <DesktopDivider />
      )
    }
  }

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="relative grid container place-items-center rounded-xl mx-auto bg-darkgrayishblue w-[347px] sm:w-[500px] h-auto ">
        <p className="font-manrope text-neongreen text-center pt-7">Advice #{adviceIndex}</p>
        <p className="font-manrope text-2xl text-lightcyan px-7 py-7 text-center max-w-md">"test{advice}"</p>
        {dividerDecider()}
        <div className="relative group">
          {/* Equal size <div> under the button for a glow effect on hover*/}
          <div className="absolute -bottom-6 right-2 bg-neongreen rounded-full pt-3 px-3 h-12 group-hover:blur-xl"></div>
          <button className="relative -bottom-6" onClick={handleClick}>
            <div className="bg-neongreen rounded-full flex justify-center pt-3 px-3 h-12">
              <DiceButton />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App;
