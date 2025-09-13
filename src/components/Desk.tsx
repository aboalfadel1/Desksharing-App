import React from 'react';
import { Schreibtisch } from '../types/deskTypes';
import { Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

interface DeskProps {
  schreibtisch: Schreibtisch;
  onReserve?: (id: number) => void;
  onCancelReserve?: (id: number) => void;
}

const Desk: React.FC<DeskProps> = ({ schreibtisch, onReserve, onCancelReserve }) => {
  const user = localStorage.getItem('user');
  const username = user ? JSON.parse(user).username : 'Unbekannt';
  const isMine = schreibtisch.belegtVon === username;

  return (
    <Card
      sx={{
        minWidth: 275,
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: schreibtisch.istBelegt ? '#ffebee' : '#e3f2fd',
        transition: '0.3s',
        '&:hover': { boxShadow: 6, transform: 'scale(1.02)' },
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        {schreibtisch.istBelegt ? (
          <Cancel sx={{ color: '#d32f2f', fontSize: 50, mr: 2 }} />
        ) : (
          <CheckCircle sx={{ color: '#1976d2', fontSize: 50, mr: 2 }} />
        )}
        <Box>
          <Typography variant="h6" component="div" fontWeight={600}>
            {schreibtisch.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Ort: {schreibtisch.ort}
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {schreibtisch.istBelegt
              ? `Belegt von: ${schreibtisch.belegtVon}`
              : 'Verfügbar'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        {!schreibtisch.istBelegt && onReserve && (
          <Button
            size="small"
            onClick={() => onReserve(schreibtisch.id)}
            variant="contained"
            color="primary"
            sx={{ textTransform: 'none' }}
          >
            Reservieren
          </Button>
        )}
        {schreibtisch.istBelegt && isMine && onCancelReserve && (
          <Button
            size="small"
            onClick={() => onCancelReserve(schreibtisch.id)}
            variant="outlined"
            color="secondary"
            sx={{ textTransform: 'none' }}
          >
            Reservierung stornieren
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Desk;
