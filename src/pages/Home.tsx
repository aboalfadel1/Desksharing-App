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

  const freieTischeAnzahl = filteredDesks.filter(desk => !desk.istBelegt).length;
  const belegteTischeAnzahl = filteredDesks.filter(desk => desk.istBelegt).length;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom mt={6}>
        Schreibtische
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-around', bgcolor: '#e3f2fd', borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h6" color="primary">
            Freie Tische: {freieTischeAnzahl}
          </Typography>
          <Typography variant="h6" color="secondary">
            Belegte Tische: {belegteTischeAnzahl}
          </Typography>
        </Paper>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Ort</InputLabel>
            <Select value={ortFilter} onChange={(e) => setOrtFilter(e.target.value)}>
              <MenuItem value="">Alle Orte</MenuItem>
              {[...Array(8)].map((_, i) => (
                <MenuItem key={i} value={`Stockwerk ${i + 1}`}>Stockwerk {i + 1}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Belegungsstatus</InputLabel>
            <Select value={belegtFilter} onChange={(e) => setBelegtFilter(e.target.value)}>
              <MenuItem value="">Alle</MenuItem>
              <MenuItem value="frei">Frei</MenuItem>
              <MenuItem value="belegt">Belegt</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom>
        Meine reservierten Schreibtische
        {meineSchreibtische.length === 0 && ": Du hast noch keinen Tisch reserviert"}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {meineSchreibtische.map(desk => (
          <Grid item xs={12} sm={6} md={4} key={desk.id}>
            <Desk schreibtisch={desk} onCancelReserve={handleCancelReserve} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {filteredDesks.map(desk => (
          <Grid item xs={12} sm={6} md={4} key={desk.id}>
            <Desk schreibtisch={desk} onReserve={handleReserve} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
