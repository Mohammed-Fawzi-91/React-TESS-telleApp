/*
 * WarehouseSearch
 *
 * Denne filen lager et søkefelt i A_LagerComponent og
 * behandler events derav.
 * 
 * Kopiert fra TerminalHandler og tilpasset deretter.
 * 
 * Lagd av 243335
 */

import React, { useState } from 'react';

function WarehouseSearch({ warehouses = [], onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    // Koden ville ikke submitte formen når man trykket 'enter'
    // Stjålet fra https://bobbyhadz.com/blog/react-enter-key-submit-form
    event.preventDefault(); // Hindrer default (måtte trykke på button)
    onSearch(warehouses, query);
  };

  // '<form onSubmit={handleSearch}>' submitter formen ved å trykke enter i stedet for knappen
  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Søk..."
      />
      <button onClick={handleSearch}>Søk</button>
    </form>
  );
};

export default WarehouseSearch;
