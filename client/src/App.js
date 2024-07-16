import React, { useState, createContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainBruker from './components/MainComponent'
import MainAdmin from './components/MainComponentAdmin'
import { BrowserRouter } from 'react-router-dom';
import A_Lager from './components/Admin/A_LagerComponent';


//LEGG INN VALG: BRUKER ELLER ADMIN HER FOR PROTOTYPE, BYTTES MED IP FUNKSJON ETTERHVERT
//Dummy metode kan forbedres med å sjekke storage (Cookies) for å lagre valget
//var aksess;
//do{
//var aksess = prompt("1 for Brukere, 2 for admin");} while (aksess == "0");

export const AppContext = createContext();

function App() {
  const [aksess, setAksess] = useState(1);

  return (
    <div className="App">
      <AppContext.Provider value={{ aksess, setAksess }}>
        <BrowserRouter>
          {aksess == "1" ? <MainBruker /> : <MainAdmin />}
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );

};


export default App;
