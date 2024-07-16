/*
 * B_VeiledningerComponent
 *
 * [Legg inn beskrivelse av komponenten her og hvem som har lagd hva]
 */

import React from "react";
import { Card, Table, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// TODO: tabell med veiledningsfiler man kan laste ned

function B_Veiledninger() {
    return (
        <React.Fragment>
            <div className="mb-3 p-3 m-3">
                <Table hover bordered>
                    <thead>
                        <tr>
                            <th>Veiledninger</th>
                            <th>Last ned</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Opptellingsveiledning.pdf</td>
                            <td><Button variant="primary">Last ned</Button>{' '}</td>
                        </tr>
                        <tr>
                            <td>Forsendelseveiledning.pdf</td>
                            <td><Button variant="primary">Last ned</Button>{' '}</td>
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

export default B_Veiledninger;

/*
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Velg flere filer</Form.Label>
            <Form.Control type="file" multiple />
          </Form.Group>
*/