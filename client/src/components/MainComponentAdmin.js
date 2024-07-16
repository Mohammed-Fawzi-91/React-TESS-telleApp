//Import IF == Admin Else Import Bruker?
import React, { useContext } from 'react';
import { AppContext } from '../App';

//ADMIN SIDER
import A_Bestillinger from './Admin/A_BestillingerComponent';
import A_Lager from './Admin/A_LagerComponent';
import A_Dokumentasjon from './Admin/A_DokumentasjonComponent';
import A_Header from './Admin/A_HeaderComponent';
import A_Inventar from './Admin/A_InventarComponent';
import A_Tellelister from './Admin/A_TellelisterComponent';

//GENERISKE SIDER
import Footer from './FooterComponent';
import OmOss from './OmOssComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

// TODO: Opprette en variabel for å tilknytte brukerID, deretter skiftes ruting til enten B_ eller A_ Header
// Også en mulighet å lage 2 main funksjoner her og sette spørringen i App.js

// TODO: Variabel tilknyttet Redirect
// TODO: skrives om til engelsk

function MainAdmin() {
    const { aksess, setAksess } = useContext(AppContext);

    const toggleAksess = () => {
        setAksess(aksess === 1 ? 2 : 1);
    };

    return (
        <React.Fragment>
            <A_Header toggleAksess={toggleAksess} />
            <button onClick={toggleAksess}>Bytt til BRUKER</button>
            <Switch>
                <Route path='/A_Inventar' component={A_Inventar} />
                <Route path='/A_Bestillinger' component={A_Bestillinger} />
                <Route path='/A_Tellelister' component={A_Tellelister} />
                <Route path='/A_Dokumentasjon' component={A_Dokumentasjon} />
                <Route path='/A_Lager' component={A_Lager} />
                <Route path='/OmOss' component={OmOss} />
                <Redirect to="/A_Inventar" />
            </Switch>
            <hr />
            <Footer />
        </React.Fragment>
    );
};

export default withRouter(MainAdmin);

/*
Inventar
Bestillinger
Tellelister
Dokumentasjon
Brukere
OmOss
*/