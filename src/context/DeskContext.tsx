import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Schreibtisch } from '../types/deskTypes';
import dummySchreibtische from '../data/dummyDesks';
import { DeskContextType } from '../types/deskTypes';
const DeskContext = createContext<DeskContextType | undefined>(undefined);

export const DeskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [schreibtische, setSchreibtische] = useState<Schreibtisch[]>(() => {
    const savedDesks = localStorage.getItem('schreibtische');
    return savedDesks ? JSON.parse(savedDesks) :dummySchreibtische; // Lade Schreibtische aus localStorage
  });

  useEffect(() => {
    localStorage.setItem('schreibtische', JSON.stringify(schreibtische)); // Speichere Schreibtische in localStorage
  }, [schreibtische]);

  const aktualisierenSchreibtisch = (updatedDesk: Schreibtisch) => {
    setSchreibtische(prevDesks =>
      prevDesks.map(desk => (desk.id === updatedDesk.id ? updatedDesk : desk))
    );
  };

  return (
    <DeskContext.Provider value={{ schreibtische, aktualisierenSchreibtisch }}>
      {children}
    </DeskContext.Provider>
  );
};

export const useDesk = () => {
  const context = React.useContext(DeskContext);
  if (context === undefined) {
    throw new Error('useDesk must be used within a DeskProvider');
  }
  return context;
};
