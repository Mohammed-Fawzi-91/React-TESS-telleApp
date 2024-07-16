//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020

const mongoose = require('mongoose')


mongoose.set('strictQuery', false)


//Forbedret kode med generell errorhandling for feilet oppkobling,
const connectDB = (url) => {
    return mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => {
        console.log('Connected to Database/MongoDB') //la til melding i konsoll som bekrefter at vi er koblet til mongodb
      })
      .catch((error) => {
        console.error('Connection error: ', error) //Skriv ut errormelding
        process.exit(1); // Avslutt prosessen hvis tilkobling til databasen feiler
      })
  };
  


module.exports = connectDB
