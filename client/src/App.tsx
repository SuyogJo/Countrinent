import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import CardDefault from './components/CardDefault.tsx'
import CardShop from './components/CardShop.tsx'
import Navbar from './components/Navbar.tsx'


function App() {
  const [userDeck, setUserDeck] = useState([])
  const [shop, setShop] = useState([])
  const [newShop, setNewShop] = useState(0)
  const [score, setScore] = useState(0)
  const [token, setToken] = useState(5)
  const [leftRolls, setLeftRolls] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:3000/userHand')
    //.then(res => res.data)
    .then(d => setUserDeck((d.data)))
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/shop')
    .then(d => setShop((d.data)))
  }, [newShop]);

  const card = userDeck.map(x => (
    <div>
      <CardDefault name={x[0]} continent={x[1]}/>
    </div>
  ))

  const handleTitleClick = (x: never) => {
    // Update your state based on the title
    setUserDeck(prevDeck => [...prevDeck, x]) 
    setShop(prevShop => prevShop.filter(item => item !== x));
    // Example: setYourAppState(/* updated state */);
  };

  const theShop = shop.map(x => (
    <div>
      <CardShop name={x[0]} continent={x[1]} onTitleClick={() => handleTitleClick(x)}/>
    </div>
  ))

  let conti: any[] = []

  const onSubmit = () => {
    for (let x in userDeck) {
      axios.get(`https://restcountries.com/v3.1/name/${userDeck[x][0]}?fullText=true`)
      .then(d => d.data[0])
      .then(r => {
        if (!conti.includes(r.continents[0]) && (r.population <= 40000 || r.population >= 100000000)) {
          setScore(prev => prev+2)
          conti.push(r.continents[0])
        }
        if (!conti.includes(r.continents[0]) || r.population <= 40000 || r.population >= 100000000) {
          setScore(prev => prev+1)
          conti.push(r.continents[0])
        }
      })
    }
    setScore(prev => prev+token)
  }


  return (
    <>
      <Navbar/>

      <div className='flex flex-col justify-center'>

        <div className='flex justify-center items-center'></div>
          <div className='font-mono grid grid-cols-7 p-5 gap-4'>
            {[...Array(Math.max(0, Math.floor((7 - userDeck.length) / 2)))].map((_, index) => (
              <div key={`empty-left-${index}`} />
            ))}
            {card}
            {[...Array(Math.max(0, Math.ceil((7 - userDeck.length) / 2)))].map((_, index) => (
            <div key={`empty-right-${index}`} />
            ))}
          </div>

        <div className='flex justify-center font-mono text-xl font-bold'>
          <button type="button" onClick={onSubmit} className="font-mono focus:outline-none text-white bg-[#1E7C82] hover:bg-[#1E7C82]-400 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-[#1E7C82]-600 dark:hover:bg-[#1E7C82]-700 dark:focus:ring-cyan-800">
            Submit
          </button>
        </div>

          <div className='flex flex-col justify-center'>

            <div className='flex justify-center items-center'></div>
              <div className="font-mono grid grid-cols-7 p-5 gap-4">
              {[...Array(Math.max(0, Math.floor((7 - shop.length) / 2)))].map((_, index) => (
              <div key={`empty-left-${index}`} />
              ))}
              {userDeck.length<7 && theShop}
              {[...Array(Math.max(0, Math.ceil((7 - shop.length) / 2)))].map((_, index) => (
              <div key={`empty-right-${index}`} />
              ))}
              </div>

            <div className="flex flex-col justify-center items-center">
                <div className='font-mono text-xl font-bold'>Score: {score}</div>
                <div className='font-mono text-xl font-bold'>Token: {token}</div>
                { leftRolls && userDeck.length<7 &&
                <button type="button" onClick={() => {
                  if (token <= 1) {
                    setLeftRolls(prev => !prev)
                  }
                  setNewShop(x => x+1)
                  setToken(prev => prev-1)
                }} className="font-mono focus:outline-none text-white bg-[#1E7C82] hover:bg-[#1E7C82]-400 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-[#1E7C82]-600 dark:hover:bg-[#1E7C82]-700 dark:focus:ring-cyan-800">
                  Roll
                </button>}
            </div>

          </div>

      </div>
    </>
  )
}

export default App
