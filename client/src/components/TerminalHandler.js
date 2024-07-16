/*
 * TerminalHandler
 *
 * Denne filen tar seg av logikken rundt behandlingen av terminaler.
 * Dette er ting som søking, oppretting, og sletting.
 * 
 * Lagd av 243335
 */

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function TerminalHandler() {
    const url = 'http://localhost:3500/api/v1/terminals'; // URL til API-endpoint

    // Definerer states
    const [terminals, setTerminals] = useState([]); // Liste over terminaler
    const [filteredTerminals, setFilteredTerminals] = useState([]); // Liste over filtrerte terminaler
    const [terminalName, setTerminalName] = useState(""); // Teminalnavn (modell)
    const [terminalLocation, setTerminalLocation] = useState(""); // Lokasjon
    const [terminalOS, setTerminalOS] = useState(""); // OS
    const [terminalSN, setTerminalSN] = useState(""); // Serienummer
    const [terminalAvailability, setTerminalAvailability] = useState(""); // Tilgjengelighet
    const [selectedTerminals, setSelectedTerminals] = useState([]); // Terminalvalg

    // Bruker useEffect for å hente terminaldata fra API
    useEffect(() => {
        axios.get(url)
            .then(response => {
                // Setter terminaler og filtrerte terminaler til responsdata
                setTerminals(response.data.terminals);
                setFilteredTerminals(response.data.terminals);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // Håndterer søk i terminaler
    const handleSearch = (terminalsList, query) => {
        const lowerCaseQuery = query.toLowerCase(); // Konverterer søkeresultat til lowercase
        const filtered = terminalsList.filter((terminal) => {
            // "Spørring" i søkefeltet søker blant disse JSON-variablene
            return ['modell', 'location', 'serienummer', 'operativsystem'].some((field) => {
                const value = terminal[field];
                return typeof value === 'string' && value.toLowerCase().includes(lowerCaseQuery);
            });
        });
        setFilteredTerminals(filtered); // Returnerer søkeresultat
    };

    // Håndterer avkryssing av terminaler
    const checkboxHandler = (event, id) => {
        if (event.target.checked) {
            // Hentet hvordan man kan returnere et array med flere objekter fra her:
            // https://codeburst.io/what-are-three-dots-in-javascript-6f09476b03e1
            setSelectedTerminals([...selectedTerminals, id]); // Legger til terminal i listen over valgte terminaler
        } else {
            setSelectedTerminals(selectedTerminals.filter((terminalId) => terminalId !== id)); // Fjerner terminal fra listen over valgte terminaler
        }
    }

    // Håndtering av registrering for ny(e) terminal(er)
    const handleSubmit = () => {
        let availability;
        if (typeof terminalAvailability === 'boolean') {
            availability = terminalAvailability;
        } else {
            switch (terminalAvailability.toLowerCase()) {
                case 'ja':
                    availability = true;
                    break;
                case 'nei':
                    availability = false;
                    break;
                default:
                    console.log(`Ugyldig input: ${terminalAvailability}`);
                    return;
            }
        }

        // Sender POST-forespørsel for å legge til ny terminal
        axios.post(url, {
            modell: terminalName,
            location: terminalLocation,
            operativsystem: terminalOS,
            serienummer: terminalSN,
            available: availability
        }).then(_ => {
            // Etter en vellykket POST-forespørsel, gjør en ny GET-forespørsel for å hente den oppdaterte listen over terminaler
            axios.get(url)
                .then(response => {
                    setTerminals(response.data.terminals);
                    setFilteredTerminals(response.data.terminals);
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
    const handleDelete = () => {
        // Lager en array av slettingsforespørsler
        const deleteRequested = selectedTerminals.map((terminalId) => {
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

    // Returnerer alle state og funksjoner for å kunne brukes i andre komponenter
    return {
        terminals,
        filteredTerminals,
        terminalName,
        setTerminalName,
        terminalLocation,
        setTerminalLocation,
        terminalOS,
        setTerminalOS,
        terminalSN,
        setTerminalSN,
        terminalAvailability,
        setTerminalAvailability,
        selectedTerminals,
        handleSearch,
        checkboxHandler,
        handleSubmit,
        handleDelete
    };
}
