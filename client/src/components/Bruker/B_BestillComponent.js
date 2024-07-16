/*
 * B_BestillComponent
 *
 * [Legg inn beskrivelse av komponenten her og hvem som har lagd hva]
 */

import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import Telleboks from "../Telleboks";
import Kalender from "../Kalender";

import axios from 'axios';
import { StorageLocationContext } from "../StorageLocationContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* TODO
 * - [UVIKTIG] Variabler omskrives til engelsk
 * - [UVIKTIG] Man forholder seg til naming conventions
 * - [VIKTIG]  Knyttes opp til backend (sending av antall og datoer)
 */

function B_Bestill() {
  const [num, setNum] = useState(1); // Startverdi er 1 i boksen

  // Array av to elementer: start- og sluttdato. Må ikke initialiseres med "new",
  // da dette byr på køddet som skjedde tidligere; må initialiseres med "null"s
  const [dateRange, setDateRange] = useState([null, null]);

  /*
   * Egenmekka metode for å (muligens) forenkle POSTing/GETting
   * Fjerner tidspunkt og gjengir det med formatet DD-MM-YYYY
   * OBS! +1 må brukes fordi månedene i arrayet telles f.o.m. 0 t.o.m. 11
   */
  const formatDate = (date) => {
    const dag = date.getDate().toString().padStart(2, '0');
    const mnd = (date.getMonth() + 1).toString().padStart(2, '0');
    const aar = date.getFullYear();

    return `${dag}-${mnd}-${aar}`; // Output endres her
  };

  const { selectedStorage } = useContext(StorageLocationContext);

  const knappetrykksHandler = () => {
    if (num <= 0)
      alert("Antall kan ikke være null eller mindre!")
    else if (dateRange[0] === null || dateRange[1] === null)
      alert("Start- og sluttdato MÅ velges!\nSlutt- og statdato kan være samme dag.")
    else {
      const orderData = {
        amount: num,
        requestedBy: selectedStorage,
        requestedDate: formatDate(new Date()),
        startDate: formatDate(dateRange[0]),
        endDate: formatDate(dateRange[1])
      };

      axios.post('http://localhost:3500/api/v1/orders', orderData)
        .then(response => {
          console.log(response.data);
          toast.success('Ordre forespørsel sendt!');
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <React.Fragment>
      <ToastContainer></ToastContainer>
      <h1>Bestillinger</h1><hr />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Card style={{ width: '18rem' }}>
          <Telleboks num={num} setNum={setNum} />
          <Kalender dateRange={dateRange} setDateRange={setDateRange} />
          <Button variant="primary" onClick={knappetrykksHandler}>Send forespørsel</Button>{' '}
        </Card>
        <br></br>
      </div>

      <div>
        <Card>
          <Card.Header>Informasjon til sluttbruker</Card.Header>
          <Card.Body>
            <Card.Title>Slik fungerer denne siden</Card.Title>
            <Card.Text style={{ wordWrap: "break-word" }}>
              Velg ønsket antall håndterminaler du ønsker å bestille
              <br></br>
              Deretter trykk på kalenderen for å velge startdato, deretter trykk en gang til for å velge sluttdato
              <br></br>
              Til slutt trykk send forespørsel, du kan nå gå under fanen "Aktive Bestilligner" for å se status på din ordre
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      
    </React.Fragment>
  );
};

export default B_Bestill;


//Toastify kode ble funnet her: https://fkhadra.github.io/react-toastify/introduction/ 