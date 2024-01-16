import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import CardDefault from './components/CardDefault.tsx'
import CardShop from './components/CardShop.tsx'


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

  const theShop = shop.map(x => (
    <div onClick={() => {
      setUserDeck(prevDeck => [...prevDeck, x]) 
      setShop(prevShop => prevShop.filter(item => item !== x));
      } }>
      <CardShop name={x[0]} continent={x[1]}/>
    </div>
  ))

  let conti: any[] = []

  const onSubmit = () => {
    for (let x in userDeck) {
      axios.get(`https://restcountries.com/v3.1/name/${userDeck[x][0]}?fullText=true`)
      .then(d => d.data[0])
      .then(r => {
        if (!conti.includes(r.continents[0])) {
          setScore(prev => prev+1)
          conti.push(r.continents[0])
        }
        if (r.population <= 40000 || r.population >= 100000000) {
          setScore(prevScore => prevScore+1)
        }
      })
    }
    setScore(prev => prev+token)
  }


  return (
    <>
      <div className="grid grid-cols-5 gap-2 p-10 place-content-center flex">
        {card}
      </div>
      <div className="grid grid-cols-5 gap-2 p-10">
        {theShop}
        <div className="p-10 col-span-5 flex justify-center items-center">
          { leftRolls && 
          <button type="button" onClick={() => {
            if (token <= 1) {
              setLeftRolls(prev => !prev)
            }
            setNewShop(x => x+1)
            setToken(prev => prev-1)
          }} className="focus:outline-none text-white bg-cyan-300 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">Roll</button>}
          <button type="button" onClick={onSubmit} className="focus:outline-none text-white bg-cyan-300 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">Submit</button>
        </div>
        {score}
        {token}
      </div>
    </>
  )
}

export default App
