import React, { useState, useEffect } from 'react';
import { useDesk } from '../context/DeskContext';
import Desk from '../components/Desk';
import { Schreibtisch } from '../types/deskTypes';
import { Container, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Box, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { schreibtische, aktualisierenSchreibtisch } = useDesk(); 
  const { user } = useAuth();

  const [ortFilter, setOrtFilter] = useState<string>('');
  const [belegtFilter, setBelegtFilter] = useState<string>('');
  const [meineSchreibtische, setMeineSchreibtische] = useState<Schreibtisch[]>([]);

//// Zu merken: Ich musste useEffect verwenden, um meine initial reservierten Tische zu laden.

  useEffect(() => {
    if (user) {
      const reservierteSchreibtische = schreibtische.filter(desk => desk.belegtVon === user.username);
      setMeineSchreibtische(reservierteSchreibtische);
    }
  }, [user, schreibtische]);

  const handleReserve = (id: number) => {
    const updatedDesk = schreibtische.find(desk => desk.id === id);
    const username = user ? user.username : 'Unbekannt';
    
    if (updatedDesk && !updatedDesk.istBelegt) {
      const now = new Date();
      const reservierterSchreibtisch = { ...updatedDesk, istBelegt: true, belegtVon: username, reservierungsDatum: now };
      aktualisierenSchreibtisch(reservierterSchreibtisch);
    }
  };

  const handleCancelReserve = (id: number) => {
    const updatedDesk = schreibtische.find(desk => desk.id === id);
    
    if (updatedDesk && updatedDesk.istBelegt && updatedDesk.belegtVon === user?.username) {
      const freierSchreibtisch = { ...updatedDesk, istBelegt: false, belegtVon: '', reservierungsDatum: undefined };
      aktualisierenSchreibtisch(freierSchreibtisch);
    }
  };

  const filteredDesks = schreibtische.filter(desk => {
    const matchesOrt = ortFilter ? desk.ort === ortFilter : true;
    const matchesBelegt = belegtFilter ? desk.istBelegt === (belegtFilter === 'belegt') : true;
    return matchesOrt && matchesBelegt;
  });
//Anzahl für die Leiste oben
  const freieTischeAnzahl = filteredDesks.filter(desk => !desk.istBelegt).length;
  const belegteTischeAnzahl = filteredDesks.filter(desk => desk.istBelegt).length;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom mt={6}>
        Schreibtische
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', bgcolor: '#f5f5f5', borderRadius: 1 }}> 
          <Typography variant="h6">
            Freie Tische: {freieTischeAnzahl}
          </Typography>
          <Typography variant="h6">
            Belegte Tische: {belegteTischeAnzahl}
          </Typography>
        </Paper>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Ort</InputLabel>
            <Select
              value={ortFilter}
              onChange={(e) => setOrtFilter(e.target.value)}
              label="Ort"
            >
              <MenuItem value="">Alle Orte</MenuItem>
              <MenuItem value="Stockwerk 1">Stockwerk 1</MenuItem>
              <MenuItem value="Stockwerk 2">Stockwerk 2</MenuItem>
              <MenuItem value="Stockwerk 3">Stockwerk 3</MenuItem>
              <MenuItem value="Stockwerk 4">Stockwerk 4</MenuItem>
              <MenuItem value="Stockwerk 5">Stockwerk 5</MenuItem>
              <MenuItem value="Stockwerk 6">Stockwerk 6</MenuItem>
              <MenuItem value="Stockwerk 7">Stockwerk 7</MenuItem>
              <MenuItem value="Stockwerk 8">Stockwerk 8</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Belegungsstatus</InputLabel>
            <Select
              value={belegtFilter}
              onChange={(e) => setBelegtFilter(e.target.value)}
              label="Belegungsstatus"
            >
              <MenuItem value="">Alle</MenuItem>
              <MenuItem value="frei">Frei</MenuItem>
              <MenuItem value="belegt">Belegt</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 3 }}>
        Meine reservierten Schreibtische: {meineSchreibtische.length === 0 ? "Du hast noch keinen Tisch reserviert" : ""}
      </Typography>
      
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {meineSchreibtische.map(schreibtisch => (
          <Grid item xs={12} sm={6} md={4} key={schreibtisch.id}>
            <Desk schreibtisch={schreibtisch} onCancelReserve={handleCancelReserve} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {filteredDesks.map(schreibtisch => (
          <Grid item xs={12} sm={6} md={4} key={schreibtisch.id}>
            <Desk schreibtisch={schreibtisch} onReserve={handleReserve} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
