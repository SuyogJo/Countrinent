const express = require('express'); 
const axios = require('axios');
const cors = require('cors')
const json = require('json')
const fs = require('fs');
const csv = require('csv-parser');
const data = require('./data/country.json')


  
const app = express(); 
const PORT = 3000; 

app.use(cors())
  
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running,and App is listening on port "+ PORT) 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 


// app.get("/country", async (req, res) => {
//     try {
//         const result = await axios.get('https://countriesnow.space/api/v0.1/countries')
//             .then(r => r.data.data)
//             .then(d => {
//                 for (let i=0; i < d.length; i++) {
//                     places.push(d[i].country)
//                 }
//                 return places
//             })
//             .then(p => res.send(p))
//     } catch (err) {
//         res.send(err.message)
//     }
// })

app.get("/hi", (req,res) => {
    res.send("Hello!!")
})


app.get("/shop", (req,res) => {
    let shop = []
    let shopC = []
    for (let i = 0; i < 5; i++) {
        let rand = Math.floor(Math.random() * 244)
        shop.push(data[rand].country)
        shopC.push(data[rand].continent)
    }
    const merge = shop.map((element, index) => [element, shopC[index]]);
    res.send(merge)
})

app.get("/userHand", (req,res) => {
    let randContinent = []
    let randCountries = []
    for (let j = 0; j < 3; j++) {
        let rand = Math.floor(Math.random() * 244)
        randCountries.push(data[rand].country)
        randContinent.push(data[rand].continent)
    }
    const merge = randCountries.map((element, index) => [element, randContinent[index]]);
    res.send(merge)
})
