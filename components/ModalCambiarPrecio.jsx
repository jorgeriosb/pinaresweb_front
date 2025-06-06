"use client";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { object } from 'hume/core/schemas';
import 'dayjs/locale/es';

dayjs.locale('es');




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalCambiarPrecio({is_open=false, handleClose, inmueble, handlePost}) {
    const [cantidad, setCantidad] = useState('');
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
      setLoading(true)
      e.preventDefault();
      await handlePost({"inmueble":inmueble, "precio":cantidad})
      setLoading(false)
    };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={is_open}
        onClose={()=>{handleClose()}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Cambiar Precio M2 Inmueble: {inmueble}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Cantidad"
              type="number"
              fullWidth
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
            />
          </Grid>
        
        </Grid>
        <br/>
        {!loading && <Button variant="contained" color="primary" type="submit" fullWidth>
              Guardar
            </Button>}
      </form>
    </div>
        </Box>
      </Modal>
    </div>
  );
}