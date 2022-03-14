import { useEffect, useState } from "react";
import axios from 'axios';
import { ReactComponent as DesktopDivider } from './images/pattern-divider-desktop.svg'

function App() {
  const [advice, setAdvice] = useState('')
  const [adviceIndex, setAdviceIndex] = useState(0)

  useEffect(() => {
    axios.get('https://api.adviceslip.com/advice')
      .then(res => {
        setAdvice(res.data.slip.advice)
        setAdviceIndex(res.data.slip.id)
      })
  })

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="container rounded-xl mx-auto justify-center bg-darkgrayishblue w-96 h-60">
        <p className="font-manrope text-neongreen text-center pt-7">Advice #{adviceIndex}</p>
        <p className="text-2xl text-lightcyan px-7 py-7 text-center">"{advice}"</p>
        <DesktopDivider />
      </div>
    </div>
  );
}

export default App;
