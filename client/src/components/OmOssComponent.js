import React from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from 'react-bootstrap';
import '../index.css';

const cards = [
    {
        image: "https://steamuserimages-a.akamaihd.net/ugc/931590576199931035/DF623A30179155B506BEE1743F03B75482B44337/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
        title: "Pedram Nourian",
        text: "Back-End dev"
    },
    {
        image: "https://i.imgur.com/cLrSmOc.gif",
        title: "Mohammed Fawzi",
        text: "Back-End dev"
    },
    {
        image: "https://64.media.tumblr.com/tumblr_lya3k9hi701r1ukgao1_400.gif",
        title: "Carl Chr. Roll-Lund",
        text: "Front-End dev"
    },
    {
        image: "https://i.redd.it/ah8mmdl1i3c41.gif",
        title: "Agostino Montanaro",
        text: "Front-End dev"
    }
];

// Feilen med at innholdet så "rart" ut var at det ikke ble brukt 'Container'
// Huskeliste:
//   - 'React.Fragment': brukes for å returnere flere elementer fra en component (lager ingen ekstra DOM-node)
//   - 'hr': "horisontal linjal" for visuell separasjon
//   - 'Container': brukes til å sentrere innhold (i dette tilfellet angitt til å begrense inline stylingen til en bredde på max 1200px)
//   - 'xs' og 'md': props for dyamisk skalering av kolonner
//   - 'justify-content-md-center': Bootstrap utility klasse for å sentrere innhold (for 'md' og større skjermer)
//   - 'd-flex': klasse for å lage en flex-konteiner (brukes sammen med'justify-content-center' for å sentrere kortet innad i kolonnen)

function OmOss() {
    return (
        <React.Fragment>
            <h1>Om Oss</h1>
            <hr />
            <Container style={{ maxWidth: "1200px" }}>
                <Row xs={1} md={2} className="g-4 justify-content-md-center">
                    {cards.map((card, index) => (
                        <Col className="d-flex justify-content-center" key={index}>
                            <Card className="omosscard">
                                <Card.Img variant="top" src={card.image} />
                                <Card.Body>
                                    <Card.Title>{card.title}</Card.Title>
                                    <Card.Text>{card.text}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default OmOss;

