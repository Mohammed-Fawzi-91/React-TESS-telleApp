/*
 * WarehouseHandler
 *
 * Denne filen tar seg av logikken rundt behandlingen av varehus.
 * Dette er ting som søking, oppretting, oppdatering, og sletting.
 * 
 * Kopiert fra 'TerminalHandler.js' og tilpasset deretter.
 * 
 * Lagd av 243335
 */

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function WarehouseHandler() {
    const url = 'http://localhost:3500/api/v1/warehouse'; // URL til API-endpoint

    // Definerer states
    const [warehouses, setWarehouses] = useState([]); // Liste over varehus
    const [filteredWarehouses, setFilteredWarehouses] = useState([]); // Liste over filtrerte varehus
    const [warehouseName, setWarehouseName] = useState(""); // Varehusnavn
    const [warehouseLocation, setWarehouseLocation] = useState(""); // Lokasjon
    const [warehouseAddress, setWarehouseAddress] = useState(""); // Lokasjon
    const [warehousePhone, setWarehousePhone] = useState(""); // Lokasjon
    const [warehouseEmail, setWarehouseEmail] = useState(""); // Lokasjon

    // Bruker useEffect for å hente terminaldata fra API
    useEffect(() => {
        axios.get(url)
            .then(response => {
                // Setter terminaler og filtrerte terminaler til responsdata
                setWarehouses(response.data.warehouses);
                setFilteredWarehouses(response.data.warehouses);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // Håndterer søk i terminaler
    const handleSearch = (warehouseList, query) => {
        const lowerCaseQuery = query.toLowerCase(); // Konverterer søkeresultat til lowercase
        const filtered = warehouseList.filter((warehouse) => {
            // "Spørring" i søkefeltet søker blant disse JSON-variablene
            return ['name', 'location_name', 'address', 'tlf', 'epost'].some((field) => {
                const value = warehouse[field];
                return typeof value === 'string' && value.toLowerCase().includes(lowerCaseQuery);
            });
        });
        setFilteredWarehouses(filtered); // Returnerer søkeresultat
    };

    // Håndtering av registrering for ny(e) terminal(er)
    const handleSubmit = () => {
        // Sender POST-forespørsel for å legge til ny terminal
        axios.post(url, {
            name: warehouseName,
            location_name: warehouseLocation,
            address: warehouseAddress,
            tlf: warehousePhone,
            email: warehouseEmail
        }).then(_ => {
            // Etter en vellykket POST-forespørsel, gjør en ny GET-forespørsel for å hente den oppdaterte listen over terminaler
            axios.get(url)
                .then(response => {
                    setWarehouses(response.data.warehouses);
                    setFilteredWarehouses(response.data.warehouses);
                })
                .catch(error => {
                    console.log(error);
                });
        }).catch(error => {
            console.log(error);
        });
    }

    /* 
     * Fikset bug hvor sletting av flere terminaler ikke viste med mindre man refreshet siden
     *https://www.w3schools.com/js/js_promise.asp
     *https://www.javascripttutorial.net/es6/javascript-promise-all/
     *https://dmitripavlutin.com/promise-all/
     */
    /*
        const handleDelete = () => {
            // Lager en array av slettingsforespørsler
            const deleteRequested = selectedWarehouses.map((terminalId) => {
                return axios.delete(`${url}/${terminalId}`);
            });
    
            // Venter på at alle forespørsler blir fullført
            Promise.all(deleteRequested)
                .then(() => {
                    // Så straks alle slettingene er fullført, oppdateres listen med terminaler
                    axios.get(url)
                        .then(response => {
                            setTerminals(response.data.terminals);
                            setFilteredTerminals(response.data.terminals);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log(error);
                });
    
            setSelectedTerminals([]); // Tilbakestiller valgte terminaler til en tom liste
        }
    */
    // Returnerer alle state og funksjoner for å kunne brukes i andre komponenter
    return {
        warehouses,
        setWarehouses,
        filteredWarehouses,
        setFilteredWarehouses,
        warehouseName,
        setWarehouseName,
        warehouseLocation,
        setWarehouseLocation,
        warehouseAddress,
        setWarehouseAddress,
        warehousePhone,
        setWarehousePhone,
        warehouseEmail,
        setWarehouseEmail,
        handleSearch,
        handleSubmit
        //handleDelete
    };
}
