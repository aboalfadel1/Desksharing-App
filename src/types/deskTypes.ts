export interface Schreibtisch {
    id: number;
    name: string;
    ort: string;
    istBelegt: boolean;
    belegtVon?: string; // Optional, könnte ein Benutzername oder eine Kennung sein
    reservierungsDatum?: Date; // Optional, könnte das Datum der Reservierung anzeigen
  }
  
  export interface DeskContextType {
    schreibtische: Schreibtisch[];
    aktualisierenSchreibtisch: (updatedDesk: Schreibtisch) => void;
  }
  export interface DeskProps {
    schreibtisch: Schreibtisch;
    onReserve: (id: number) => void;
  }