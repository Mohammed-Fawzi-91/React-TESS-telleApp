import { createContext } from 'react';

export const StorageLocationContext = createContext({ selectedStorage: null, setSelectedStorage: () => {} });