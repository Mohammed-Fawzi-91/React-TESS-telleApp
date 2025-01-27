//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
//Denne skal formateres grundig før levering
//Built-in moduer
const express = require('express')
const app = express()
//Connection-modul
require('dotenv').config()
const cors = require('cors')
const connectDB = require('./db/connect')
const mongoSanitize = require('express-mongo-sanitize')
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit')


//Egenlagde moduler (routes)
const terminalsRouter = require('./routes/terminals.route')
const aboutRouter = require('./routes/about.route')
const ressursRouter = require('./routes/ressurs.route')
const ordersRouter = require('./routes/orders.route')
const tellelisteRouter = require('./routes/tellelister.route')
const userRouter = require('./routes/user.route')
const warehouseRouter = require('./routes/warehouse.route')
//const userrout = require('./routes/user_rout')
//const authRouter = require('./routes/auth.route')

//Begrense antall innloggingsforsøk pr. 5 minutt til 25 forsøk
//Kode hentet fra: https://www.npmjs.com/package/express-rate-limit
const logInLimiter = rateLimit({
    windowsMs: 5 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'For mange innlogginsforsøk, prøv igjen om 5 minutter' 
})

//ratelimiter for alle forespørsler 
const generellLimiter = rateLimit({
    windowsMs: 1 * 60 * 1000,
    max: 10000,
    standardHeaders : true,
    legacyHeaders: false,
    message: 'Serverens grense er nådd, maks 10000 forespørsler i minuttet'
})

//usikker på om dette funker? Lar det ligge da det ikke virker til å skade
//MongoSanitize er lagt inn i alle routes, det burde egentlig holde?
app.use(mongoSanitize())


app.use(cors())

app.use(express.json())
//parse form data, for å få tak i data som legges inn i form
app.use(express.urlencoded({ extended: false }))

//Besvergelser knyttet bodyparser
app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

//Denne gjelder nå for alle spørringer på alle adresser.
//Optimalt ville jeg implementert for hver enkelt route og tilpasset etter type spørring og kostnaden av den.
app.use(generellLimiter)

//For håndtering av terminaler (admin)
app.use('/api/v1/terminals', terminalsRouter)

//For bestilling av terminaler
app.use('/api/v1/orders', ordersRouter)

//For håndtering a tellelister (.csv til JSON parse)
app.use('/api/v1/tellelister', tellelisteRouter)

//For håndtering av brukere/users - denne har en egen limit da den skal ha færre spørringer pr. tidsintervall
app.use('/api/v1/user', logInLimiter, userRouter)

//For håndtering av lager(warehouse)
app.use('/api/v1/warehouse', warehouseRouter)

//For log-in
//app.use('/api/v1/login', authRouter)

//About us side
app.use('/api/v1/about', aboutRouter)

//For dokumenter/ressurser til varetelling
app.use('/api/v1/ressurser', ressursRouter);
//app.use("/api", userrout);



//generell håndtering av alle URL-requester som ikke spesifikt håndteres 
app.use('*', (req, res)=>{
    res.writeHead(200, { 'content-type': 'text/html' })
    res.write('404 Page not found <br> <a href="https://www.google.com">Tilbake til starsiden</a> ')
    res.end()
})


/* const port = process.env.PORT || 3500;
try {
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  })} catch (err) {
    console.log(err);
  } */

  const port = process.env.PORT || 3500

  const start = async () =>{
      try{
          await connectDB(process.env.MONGO_URI)
          app.listen(port, console.log(`server is listening on port ${port}...`))
      }catch(error){
          console.log(error)
      }
  }
  
  start() 

