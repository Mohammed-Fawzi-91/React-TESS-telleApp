/*
 * A_InventarComponent
 * Denne komponenten tar seg av gjengivelsen av inventarsiden for admin.
 * Den lager en dynamisk tabell ut ifra hvor mange terminaler som befinner
 * seg i databasen og viser dem frem basert på navn, lokasjon, OS, serie-
 * nummer og terminalens ledighet.
 * Den har også noen input-bokser for å søke blant termnialer, legge inn
 * en ny terminal og sjekkbokser for å markere terminal(er) for sletting.
 * 
 * [Legg inn her hvem som har lagd hva: Agostino & Carl]
 */

/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Card, Table, Button, Form } from 'react-bootstrap';
import TerminalHandler from '../TerminalHandler';
import TerminalSearch from '../TerminalSearch';
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO
// Legge inn clear() i tekstfeltene når man har trykket på 'Legg til ny'

function A_Inventar() {
  // Henter nødvendige state-variabler og funksjoner fra TerminalHandler
  const {
    terminals,
    filteredTerminals,
    setTerminalName,
    setTerminalLocation,
    setTerminalOS,
    setTerminalSN,
    setTerminalAvailability,
    handleSearch,
    checkboxHandler,
    handleSubmit,
    handleDelete
  } = TerminalHandler();

  return (
    <React.Fragment>
      <div className="mb-3 p-3 m-3">
        <h1>Liste over terminaler</h1>
        <hr></hr>
        {/* Bruker TerminalSearch-komponenten for å tillate søk blant terminaler */}
        <TerminalSearch terminals={terminals} onSearch={handleSearch} />
        <br></br>
        {/* Tabell for å vise terminalene */}
        <Table responsive hover bordered style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>Terminalnavn</th>
              <th>Lokasjon</th>
              <th>OS</th>
              <th>Serienummer</th>
              <th>Ledig</th>
              <th>Markér for sletting</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapper gjennom de filtrerte terminalene og lager en tabellrad for hver
            dersom ikke 'index' brukes, her og i 'key', får man opp feilmeldinger i konsoll */}
            {filteredTerminals.map((terminal, index) => {
              return (
                <tr key={terminal._id || index}>
                  <td>{terminal.modell}</td>
                  <td>{terminal.location}</td>
                  <td>{terminal.operativsystem}</td>
                  <td>{terminal.serienummer}</td>
                  <td>{terminal.available ? 'Ja' : 'Nei'}</td>
                  <td>
                    {/* Checkbox(er) for å kunne velge terminal(er) for sletting */}
                    <Form.Check
                      type="checkbox"
                      onChange={(event) => checkboxHandler(event, terminal._id)}
                    />
                  </td>
                </tr>
              );
            })}
            {/* Legger til en rad for å legge til nye terminaler */}
            <tr>
              <td>
                <input type="text" placeholder="Legg inn navn" onChange={(e) => setTerminalName(e.target.value)}></input>
              </td>
              <td>
                <input type="text" placeholder="Legg inn lokasjon" onChange={(e) => setTerminalLocation(e.target.value)}></input>
              </td>
              <td>
                <input type="text" placeholder="Legg inn operativsystem" onChange={(e) => setTerminalOS(e.target.value)}></input>
              </td>
              <td>
                <input type="text" placeholder="Legg inn serienummer" onChange={(e) => setTerminalSN(e.target.value)}></input>
              </td>
              <td>
                <input type="text" placeholder="Legg inn ledighet" onChange={(e) => setTerminalAvailability(e.target.value)}></input>
              </td>
              <td>
                {/* Legger til knapper for å legge til nye terminaler og slette valgte terminaler */}
                <Button variant="outline-success" onClick={handleSubmit}>Legg til ny</Button>{' '}
                <Button variant="danger" onClick={handleDelete}>SLETT VALGTE</Button>{' '}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div>
        <Card>
          <Card.Header>Informasjon til sluttbruker</Card.Header>
          <Card.Body>
            <Card.Title>Slik fungerer denne siden</Card.Title>
            <Card.Text style={{ wordWrap: "break-word" }}>
              Lorem ipsum...
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default A_Inventar;
