// src/data/dummyDesks.ts
import { Schreibtisch } from '../types/deskTypes';

const dummySchreibtische: Schreibtisch[] = [
  { id: 1, name: 'Schreibtisch 1', ort: 'Stockwerk 1', istBelegt: false },
  { id: 2, name: 'Schreibtisch 2', ort: 'Stockwerk 1', istBelegt: true, belegtVon: 'benutzer1', reservierungsDatum: new Date() },
  { id: 3, name: 'Schreibtisch 3', ort: 'Stockwerk 1', istBelegt: false },
  { id: 4, name: 'Schreibtisch 4', ort: 'Stockwerk 1', istBelegt: false },
  { id: 5, name: 'Schreibtisch 5', ort: 'Stockwerk 2', istBelegt: true, belegtVon: 'benutzer2', reservierungsDatum: new Date() },
  { id: 6, name: 'Schreibtisch 6', ort: 'Stockwerk 2', istBelegt: false },
  { id: 7, name: 'Schreibtisch 7', ort: 'Stockwerk 2', istBelegt: false },
  { id: 8, name: 'Schreibtisch 8', ort: 'Stockwerk 2', istBelegt: false },
  { id: 9, name: 'Schreibtisch 9', ort: 'Stockwerk 3', istBelegt: true, belegtVon: 'benutzer1', reservierungsDatum: new Date() },
  { id: 10, name: 'Schreibtisch 10', ort: 'Stockwerk 3', istBelegt: false },
  { id: 11, name: 'Schreibtisch 11', ort: 'Stockwerk 3', istBelegt: false },
  { id: 12, name: 'Schreibtisch 12', ort: 'Stockwerk 3', istBelegt: false },
  { id: 13, name: 'Schreibtisch 13', ort: 'Stockwerk 4', istBelegt: false },
  { id: 14, name: 'Schreibtisch 14', ort: 'Stockwerk 4', istBelegt: true, belegtVon: 'benutzer4', reservierungsDatum: new Date() },
  { id: 15, name: 'Schreibtisch 15', ort: 'Stockwerk 4', istBelegt: false },
  { id: 16, name: 'Schreibtisch 16', ort: 'Stockwerk 4', istBelegt: false },
  { id: 17, name: 'Schreibtisch 17', ort: 'Stockwerk 5', istBelegt: false },
  { id: 18, name: 'Schreibtisch 18', ort: 'Stockwerk 5', istBelegt: false },
  { id: 19, name: 'Schreibtisch 19', ort: 'Stockwerk 5', istBelegt: true, belegtVon: 'benutzer5', reservierungsDatum: new Date() },
  { id: 20, name: 'Schreibtisch 20', ort: 'Stockwerk 5', istBelegt: false },
  { id: 21, name: 'Schreibtisch 21', ort: 'Stockwerk 6', istBelegt: false },
  { id: 22, name: 'Schreibtisch 22', ort: 'Stockwerk 6', istBelegt: true, belegtVon: 'benutzer6', reservierungsDatum: new Date() },
  { id: 23, name: 'Schreibtisch 23', ort: 'Stockwerk 6', istBelegt: false },
  { id: 24, name: 'Schreibtisch 24', ort: 'Stockwerk 6', istBelegt: false },
  { id: 25, name: 'Schreibtisch 25', ort: 'Stockwerk 7', istBelegt: false },
  { id: 26, name: 'Schreibtisch 26', ort: 'Stockwerk 7', istBelegt: false },
  { id: 27, name: 'Schreibtisch 27', ort: 'Stockwerk 7', istBelegt: true, belegtVon: 'benutzer7', reservierungsDatum: new Date() },
  { id: 28, name: 'Schreibtisch 28', ort: 'Stockwerk 7', istBelegt: false },
  { id: 29, name: 'Schreibtisch 29', ort: 'Stockwerk 8', istBelegt: false },
  { id: 30, name: 'Schreibtisch 30', ort: 'Stockwerk 8', istBelegt: false },
];

export default dummySchreibtische;
