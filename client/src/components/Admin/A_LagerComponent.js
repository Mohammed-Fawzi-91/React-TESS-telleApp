/*
 * A_LagerComponent
 * Denne komponenten tar seg av gjengivelsen av lagersiden for admin.
 * Den lager en dynamisk tabell ut ifra hvor mange lagere som befinner
 * seg i databasen og viser dem frem basert på navn, lokasjon, adresse,
 * telefon, og epost.
 * Den har også noen input-bokser for å søke blant varehus, legge inn
 * et nytt varehus og modals for å behandle varehus; sletting/endring
 * osv.
 * 
 * [Legg inn her hvem som har lagd hva: Agostino & Carl]
 */

import React from 'react';
import { Card, Table, Button, Form } from 'react-bootstrap';
import WarehouseSearch from '../WarehouseSearch';
import WarehouseHandler from '../WarehouseHandler';
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO
// - [ ] Legge inn knapp for håndtering av varehus
//   - [ ] Pop-up for å gjøre endringer av varehus

// Kopiert og tilpasset fra A_InventarComponent.js.
function A_Lager() {
    const {
        warehouses,
        filteredWarehouses,
        setWarehouseName,
        setWarehouseLocation,
        setWarehouseAddress,
        setWarehousePhone,
        setWarehouseEmail,
        handleSearch,
        handleSubmit
    } = WarehouseHandler();
    return (
        <React.Fragment>
            <div className="mb-3 p-3 m-3">
                <h1>Liste over lagere</h1>
                <hr></hr>
                <WarehouseSearch warehouses={warehouses} onSearch={handleSearch} />
                <br></br>
                <Table striped bordered style={{ padding: "10px" }}>
                    <thead>
                        <tr>
                            <th style={{ padding: "10px" }}>Lager</th>
                            <th style={{ padding: "10px" }}>Lokasjon</th>
                            <th style={{ padding: "10px" }}>Adresse</th>
                            <th style={{ padding: "10px" }}>Telefon</th>
                            <th style={{ padding: "10px" }}>E-post</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWarehouses.map((warehouse, index) => {
                            return (
                                <tr key={warehouse._id || index}>
                                    <td>{warehouse.name}</td>
                                    <td>{warehouse.location_name}</td>
                                    <td>{warehouse.address}</td>
                                    <td>{warehouse.tlf}</td>
                                    <td>{warehouse.email}</td>
                                </tr>
                            );
                        })}
                        {/* Legger til en rad for å legge til nytt varehus */}
                        <tr>
                            <td>
                                <input type="text" placeholder="Legg inn navn..." onChange={(e) => setWarehouseName(e.target.value)}></input>
                            </td>
                            <td>
                                <input type="text" placeholder="Legg inn lokasjon..." onChange={(e) => setWarehouseLocation(e.target.value)}></input>
                            </td>
                            <td>
                                <input type="text" placeholder="Legg inn adresse..." onChange={(e) => setWarehouseAddress(e.target.value)}></input>
                            </td>
                            <td>
                                <input type="text" placeholder="Legg inn telefonnummer..." onChange={(e) => setWarehousePhone(e.target.value)}></input>
                            </td>
                            <td>
                                <input type="text" placeholder="Legg inn epost..." onChange={(e) => setWarehouseEmail(e.target.value)}></input>
                            </td>
                            <td>
                                {/* Legger til knapper for å legge til nye terminaler og slette valgte terminaler */}
                                <Button variant="outline-success" onClick={handleSubmit}>Legg til nytt</Button>{' '}
                                <Button variant="danger">SLETT VALGTE</Button>{' '}
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
                            Lorem ipsum
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

        </React.Fragment>
    );
};

export default A_Lager;