/* 
 * [Beksrivelse av component]
 */

import React from "react";
import { Card, Form, Table, Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
 * TODO:
 *   - Knapper:
 *     - [V] Slett
 *     - [V] Last opp
 *   - Tabell:
 *     - [V] Filnavn
 *     - [V] Beskrivelse
 *     - [ ] Last ned
 */

/* 
 * 'mongoimport' funker kun for filer i JSON-format. For å kunne laste opp filer
 * i andre format, ser det ut som om man må benytte seg av GridFS dette benytter
 * seg av BSON-objekter i stedet; frykter dette kan bli noe kukeri.
 * Man kan benytte seg av 'mongoimport' for å laste inn txt-filer, men da må
 * innholdet konverteres til JSON-objekt.
 */

/* 
 * Første div under fragment er nødvendig for ikke å gjengi knappegruppen
 * ved siden av "Bytt til..."-knappen.
 * Posisjonering av "SLETT"-knappen er litt "jalla". Taes opp med gruppa om den
 * kan være sentrert. Akkurat nå posisjonerer den seg dårlig iht. vindusskalering.
 */

function A_Dokumentasjon() {
    return (
        <React.Fragment>
            <div>
                <br></br>
                <>
                    <ButtonGroup size="lg" className="mb-2">
                        <Button>Region 1</Button>
                        <Button>Region 2</Button>
                        <Button>Region 3</Button>
                        <Button>Region 4</Button>
                        <Button>Region 5</Button>
                        <Button>Region 6</Button>
                    </ButtonGroup>
                </>
            </div>

            <div className="mb-3 p-3 m-3">
                <Table hover bordered>
                    <thead>
                        <tr>
                            <th>Filnavn</th>
                            <th>Velg</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Telleliste_2020.csv</td>
                            <td><Form.Check type="checkbox" /></td>
                        </tr>
                        <tr>
                            <td>Telleliste_2019.csv</td>
                            <td><Form.Check type="checkbox" /></td>
                        </tr>
                    </tbody>
                </Table>

                <div style={{ textAlign: "right" }}>
                    <Button variant="danger" style={{ marginRight: "120px" }}>SLETT</Button>
                </div>

                <div>
                    <>
                        <Form.Group
                            controlId="formFile"
                            className="mb-3 p-3 m-3"
                            style={{
                                marginTop: "10px",
                                marginBottom: "10px",
                                marginLeft: "10px",
                                marginRight: "10px",
                            }}
                        >
                            <div className="d-flex align-items-center">
                                <Form.Control type="file" />
                                <Button variant="primary" type="submit">
                                    Upload
                                </Button>{' '}
                            </div>
                        </Form.Group>
                    </>
                </div>
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

export default A_Dokumentasjon;

/* ALTERNATIV FOR Å LASTE OPP FLERE FILER
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Velg flere filer</Form.Label>
            <Form.Control type="file" multiple />
          </Form.Group>
*/