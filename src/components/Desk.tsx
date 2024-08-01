import React from 'react';
import { Schreibtisch } from '../types/deskTypes';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

interface DeskProps {
  schreibtisch: Schreibtisch;
  onReserve?: (id: number) => void;
  onCancelReserve?: (id: number) => void;
}

const Desk: React.FC<DeskProps> = ({ schreibtisch, onReserve, onCancelReserve }) => {
  const user = localStorage.getItem('user');
  const username = user ? JSON.parse(user).username : 'Unbekannt';

  return (
    <Card
      sx={{
        minWidth: 275,
        mb: 2,
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: schreibtisch.istBelegt ? '#f0f4f8' : '#e3f2fd',
        '&:hover': {
          boxShadow: 6,
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        {schreibtisch.istBelegt ? (
          <Cancel sx={{ color: '#f44336', fontSize: 40, mr: 2 }} />
        ) : (
          <CheckCircle sx={{ color: '#1976d2', fontSize: 40, mr: 2 }} />
        )}
        <div>
          <Typography variant="h6" component="div">
            {schreibtisch.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Ort: {schreibtisch.ort}
          </Typography>
          <Typography variant="body2">
            {schreibtisch.istBelegt ? `Belegt von: ${schreibtisch.belegtVon}` : 'Verfügbar'}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        {!schreibtisch.istBelegt && onReserve && (
          <Button
            size="small"
            onClick={() => onReserve(schreibtisch.id)}
            variant="contained"
            color="primary"
          >
            Reservieren
          </Button>
        )}
        {schreibtisch.istBelegt && schreibtisch.belegtVon === username && onCancelReserve && (
          <Button
            size="small"
            onClick={() => onCancelReserve(schreibtisch.id)}
            variant="outlined"
            color="secondary"
          >
            Reservierung stornieren
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Desk;
