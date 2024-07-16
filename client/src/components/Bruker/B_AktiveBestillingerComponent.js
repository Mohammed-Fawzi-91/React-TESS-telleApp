/*
 * B_AktiveBestillingerComponent
 *
 * [Legg inn beskrivelse av komponenten her og hvem som har lagd hva]
 */
import { Card, Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

// TODO:
//   - [V] Tabell
//   - [ ] Styling fungerer ikke foreløpig; skal fikses. Referansepunkt er 'B_TellelisterComponent.js'
//   - [ ] Hente ut informasjon dynamisk fra collections
//     - [ ] Terminal ID
//     - [ ] Status
//     - [ ] Mottak
//     - [ ] Sendingsstatus
//     - [ ] Skademelding
//   - [V] Knapper
//     - [V] Mottak
//     - [V] Sendingsstatus
//     - [V] Skademelding

function B_AktiveBestillinger() {
    const [orders, setOrders] = useState([]); //Bestillinger opprettet av bruker
    const [selectedOrder, setSelectedOrder] = useState([]); //Linjen man håndterer



     //Henter Bestillinger og tilgjengelige håndterminaler når siden lastes inn
     useEffect(() => {
        fetchOrders();
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


        //Håndterer 'klikk' på 'Kvitter Mottak' knappen for å 'Kvittere' mottak av terminaler i en ordre
        const handleMottak = (orderId) => {
            const selectedOrder = orders.find(order => order._id === orderId);
            if (selectedOrder) {
              setSelectedOrder(selectedOrder);
              fetchOrders(); //Henter oppdatert liste av ordre (må gjengis her for å slippe å måtte refreshe siden)
            }

            const orderData = {
                status: 'I BRUK'
              };
              //Oppdaterer ordre fra pending til ->transit
              axios.patch(`http://localhost:3500/api/v1/orders/${selectedOrder._id}`, orderData)
                .then(response => {
                  console.log(response.data);//Ved suksess skriver det som blir sendt i konsoll
                })
                .catch(error => {
                  console.error(error);//Ved feil skriver feilmelding i konsoll
                });

          };
        

        //Håndterer 'klikk' på 'Tilbakesend' knappen for å sende tilbake brukte terminaler fra en ordre
        const handleTilbakesending = (orderId) => {
            const selectedOrder = orders.find(order => order._id === orderId);
            if (selectedOrder) {
              setSelectedOrder(selectedOrder);
              fetchOrders(); //Henter oppdatert liste av ordre (må gjengis her for å slippe å måtte refreshe siden)
            }
            const orderData = {
                status: 'TRANSIT RETUR'
              };
              //Oppdaterer ordre fra pending til ->transit
              axios.patch(`http://localhost:3500/api/v1/orders/${selectedOrder._id}`, orderData)
                .then(response => {
                  console.log(response.data);//Ved suksess skriver det som blir sendt i konsoll
                })
                .catch(error => {
                  console.error(error);//Ved feil skriver feilmelding i konsoll
                });
          };

    return (
        <React.Fragment>
            <div className="mb-3 p-3 m-3">
                <Table responsive striped bordered style={{ padding: "10px" }}>
                    <thead>
                        <tr>
                            <th style={{ padding: "10px" }}>Status</th>
                            <th style={{ padding: "10px" }}>Antall</th>
                            <th style={{ padding: "10px" }}>Dato Forespurt</th>
                            <th style={{ padding: "10px" }}>Dato Start</th>
                            <th style={{ padding: "10px" }}>Dato Slutt</th>
                            <th style={{padding: "10px"  }}>Kvitter Mottak</th>
                            <th style={{padding: "10px"  }}>Tilbakesend</th>   
                        </tr>
                    </thead>
                    <tbody>
              {orders.map((order, index) => (
                <tr key={order._id || index}>
                  <td>{order.status}</td>
                  <td>{order.amount}</td>
                  <td>{order.requestedDate}</td>
                  <td>{order.startDate}</td>
                  <td>{order.endDate}</td>
                  <td>
                    <Button variant="outline-warning" onClick={() => handleMottak(order._id)}>Kvitter Mottak</Button>
                  </td>
                  <td>
                    <Button variant="outline-warning" onClick={() => handleTilbakesending(order._id)}>Tilbakesending</Button>
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin cursus sapien dolor, et tincidunt elit tempus nec. Praesent maximus, turpis in gravida dapibus, massa felis convallis lectus, quis mollis enim elit non nibh. Duis in lobortis nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam rutrum, tortor quis fermentum accumsan, ex mauris interdum nunc, eu efficitur velit diam condimentum mauris. Maecenas eleifend, ipsum et laoreet pretium, magna dolor mattis leo, vitae pretium magna purus vel dolor. Phasellus malesuada neque eu nisi maximus eleifend. Sed massa justo, congue in ullamcorper sit amet, cursus quis arcu.
                            <br></br>
                            Suspendisse condimentum, neque vitae sodales vehicula, magna augue accumsan lacus, vel imperdiet lacus orci et odio. Nullam dignissim, tellus venenatis iaculis condimentum, tortor lectus viverra neque, quis luctus lectus enim at dui. Integer ultricies nulla eu nibh facilisis, lobortis ultrices massa consequat. Nam vitae ligula ac turpis sodales iaculis sed sit amet leo. Praesent purus sapien, porta at erat et, porta lacinia dolor. Cras maximus pharetra sem id ultricies. Cras sit amet congue lectus. In a rutrum lectus, nec venenatis nulla.
                            <br></br>
                            Nunc molestie hendrerit rutrum. Sed interdum nulla in ante scelerisque finibus. Nunc dui nisi, sagittis sed velit sit amet, consectetur fermentum quam. Donec et augue at ex feugiat accumsan. Morbi auctor magna non rutrum malesuada. Integer non consequat urna. Sed varius ligula in elit vulputate, mattis vestibulum massa lacinia. Proin vel odio a felis porttitor congue in et lacus. Integer eu tristique augue, elementum cursus libero. Nunc fermentum, mauris vel ullamcorper lobortis, neque dolor ultricies lorem, eget semper turpis nisl nec massa. Sed condimentum neque mollis congue tincidunt. Nullam tincidunt, ex et tristique consequat, enim quam varius est, sit amet blandit felis leo eget enim. Quisque sed neque ut dui cursus vestibulum sed ac lorem. Ut porttitor, libero sit amet suscipit bibendum, diam odio mattis arcu, eget laoreet eros justo in risus. Curabitur volutpat tellus massa. Pellentesque vitae lorem vel arcu fermentum commodo.
                            <br></br>
                            Nam laoreet mi id varius tempor. Nunc elementum felis quis dui elementum gravida. Morbi sit amet hendrerit ante, quis viverra dolor. Donec lacinia molestie vestibulum. Nam sed ex eu purus molestie efficitur. Fusce nec porta nulla, vitae volutpat libero. Donec iaculis orci accumsan velit sodales rhoncus. Etiam ultricies quis nibh quis pretium. Curabitur scelerisque, libero eu ultricies gravida, dolor nisl vestibulum lacus, vitae sollicitudin nisl neque id ipsum.
                            <br></br>
                            Duis eget nisl quis nunc volutpat porta dignissim in leo. Pellentesque vitae aliquam velit. Fusce imperdiet ut sem nec viverra. Nulla purus est, condimentum at risus sit amet, pretium fermentum risus. Duis nec justo rutrum, tempor lacus ut, rhoncus justo. Nunc facilisis nibh non sapien tincidunt venenatis. Vivamus vulputate mi non nulla auctor consequat. Maecenas eleifend nec purus semper gravida. Integer a augue ac ipsum accumsan feugiat. Vivamus vel ornare enim. Maecenas eu dignissim metus. Mauris pellentesque, velit quis ornare pulvinar, nisl erat feugiat lorem, sit amet finibus lectus est ut ex. Vestibulum sed nulla velit. Pellentesque aliquet lacus libero, quis euismod dui elementum at. Sed et risus pharetra, fringilla magna nec, cursus elit.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

        </React.Fragment>
    );
};

export default B_AktiveBestillinger;