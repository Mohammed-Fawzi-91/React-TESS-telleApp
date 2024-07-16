/*
 * A_BestillingerComponent
 *
 * [Legg inn beskrivelse av komponenten her og hvem som har lagd hva]
 */

import { Card, Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// TODO
// - [ ] Migrering av handling til egen handlerfil
function A_Bestillinger() {
    const [orders, setOrders] = useState([]); //Bestillinger opprettet av bruker
    const [terminals, setTerminals] = useState([]); //Håndterminaler
    const [showModal, setShowModal] = useState(false); //Pop-upvindu Bootstrap
    const [selectedOrder, setSelectedOrder] = useState(null); //Valgt bestilling
    const [selectedTerminals, setSelectedTerminals] = useState([]); //Valgte terminaler
    
    //Henter Bestillinger og tilgjengelige håndterminaler når siden lastes inn
    useEffect(() => {
      fetchOrders();
      fetchTerminals();
    }, []);
    
    //Funksjon for å hente bestillinger/orders fra database via server
    const fetchOrders = () => {
      axios.get('http://localhost:3500/api/v1/orders')
        .then(response => {
          setOrders(response.data.orders);
        })
        .catch(error => {
          console.log(error);
        });
    };
    
    //Funksjon for å hente terminaler fra database via server hvor 'available' = false
    const fetchTerminals = () => {
      axios.get('http://localhost:3500/api/v1/terminals')
        .then(response => {
          setTerminals(response.data.terminals.filter(terminal => terminal.available));
        })
        .catch(error => {
          console.log(error);
        });
    };
    
    //Håndterer 'klikk' på 'Håndter' knappen for å 'håndtere' en bestilling/rad
    const handleOrderHandling = (orderId) => {
      const selectedOrder = orders.find(order => order._id === orderId);
      if (selectedOrder) {
        setSelectedOrder(selectedOrder);
        fetchTerminals(); //Henter oppdatert liste av tilgjengelige terminaler (må gjengis her for å slippe å måtte refreshe siden)
        setShowModal(true);
      }
    };
    
    //Håndterer valg av termnialer og oppdaterer 'Terminals' slik at vi kan sette available: false på sendte terminaler
    const handleTerminalSelection = (index, terminal) => {
      const updatedTerminals = [...selectedTerminals];
      updatedTerminals[index] = terminal;
      setSelectedTerminals(updatedTerminals);
    };
    
    //Håndterer 'klikk' på 'Submit' knappen i popup vinduets form / oppdaterer ordrestatus og terminalstatus
    const handleOrderSubmit = () => {
      const orderData = {
        status: 'TRANSIT'
      };
      //Oppdaterer ordre fra pending til ->transit
      axios.patch(`http://localhost:3500/api/v1/orders/${selectedOrder._id}`, orderData)
        .then(response => {
          console.log(response.data);//Ved suksess skriver det som blir sendt i konsoll
        })
        .catch(error => {
          console.error(error);//Ved feil skriver feilmelding i konsoll
        });
      
     //Oppdaterer terminaler til -> false/utilgjengelig
      const updatedTerminals = selectedTerminals.map(terminalSerienummer => {
        const terminal = terminals.find(t => t.serienummer === terminalSerienummer);
          const updatedTerminal = { available: false };
          return axios.patch(`http://localhost:3500/api/v1/terminals/${terminal._id}`, updatedTerminal);
      });
      
      //Bruker axios.all for å sende flere Post requests, siden man kan velge flere terminaler
      axios.all(updatedTerminals) 
        .then(responses => {
          console.log(responses); //Ved suksess skriver det som blir sendt i konsoll
        })
        .catch(error => {
          console.error(error); //Ved feil skriver feilmelding i konsoll
        });
  
      setSelectedOrder(null);
      setSelectedTerminals([]);
      setShowModal(false);
      fetchOrders(); //Henter ordre pånytt på slutten av submit funksjonen for at siden skal oppdatere seg dynamisk
    };
    
    //Html med Boostrap React
    return (
      <React.Fragment>
        <div className="mb-3 p-3 m-3">
          <h1>Liste over bestillinger</h1>
          <hr></hr>
          <Table responsive hover bordered style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th style={{ padding: "10px" }}>Lager</th>
                <th style={{ padding: "10px" }}>Status</th>
                <th style={{ padding: "10px" }}>Antall</th>
                <th style={{ padding: "10px" }}>Dato Forespurt</th>
                <th style={{ padding: "10px" }}>Dato Start</th>
                <th style={{ padding: "10px" }}>Dato Slutt</th>
                <th style={{ padding: "10px" }}>Adresse</th>
                <th style={{ padding: "10px" }}>Håndtér</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id || index}>
                  <td>{order.requestedBy}</td>
                  <td>{order.status}</td>
                  <td>{order.amount}</td>
                  <td>{order.requestedDate}</td>
                  <td>{order.startDate}</td>
                  <td>{order.endDate}</td>
                  <td>{order.requestedBy}</td>
                  <td>
                    <Button variant="outline-warning" onClick={() => handleOrderHandling(order._id)}>Håndter</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
  
        <div>
          <Card>
            <Card.Header>Informasjon til sluttbruker</Card.Header>
            <Card.Body>
              <Card.Title>Slik fungerer denne siden</Card.Title>
              <Card.Text style={{ wordWrap: "break-word" }}>
                Her vises en oversikt over alle bestillinger fra bruker.
                Ved å trykke på håndter vil du få opp input-felt hvor velger en ledig håndterminal basert på serienummer
                <br />
                Serienummeret finner du typisk på baksiden av terminalen med en prefix: "S/N:"
                <br />
                Deretter "Submitter" du håndteringen og Bruker/Lageret får en oppdatert statuskode på sine aktive bestillinger
                <br />
                I det bruker mottar terminalene til sin lokasjon, kvitterer de mottak i applikasjonen som vil oppdatere status til: 'I BRUK'
                <br />
                Når lageret er ferdig med terminalen sender de den tilbake, da vil ordre ha status 'TRANSIT RETUR'
                <br />
                Til slutt kvitterer Administrator mottak og ordren er ferdigstilt med status 'GJENNOMFØRT'
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
  
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Order Handling</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Order Details:</h5>
            {selectedOrder && (
              <div>
                <p>Order ID: {selectedOrder._id}</p>
                <p>Amount: {selectedOrder.amount}</p>
              </div>
            )}
            <h5>Select Terminals:</h5>
            {selectedOrder && (
              <Form>
                {Array(selectedOrder.amount).fill().map((_, index) => (
                  <Form.Group controlId={`terminal-${index}`} key={index}>
                    <Form.Label>Terminal {index + 1}</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => handleTerminalSelection(index, e.target.value)}
                    >
                      <option value="">Select Terminal</option>
                      {terminals.map(terminal => (
                        <option key={terminal._id} value={terminal.serienummer}>
                          {terminal.serienummer}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                ))}
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleOrderSubmit}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
  
  export default A_Bestillinger;

  //Kilder: 
  //https://axios-http.com/docs/intro 
  //https://react-bootstrap.github.io/components/Modal +/Button +/Card +/Table +/Form