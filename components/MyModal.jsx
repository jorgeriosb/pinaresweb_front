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

export default function MyModal({is_open=false, handleClose, documento, handlePost}) {
    const [cantidad, setCantidad] = useState('');
  const [numrecibo, setNumrecibo] = useState('');
  const [var_fecha, setFecha] = React.useState(dayjs('2022-04-17'));
  const handleSubmit = async (e) => {
    e.preventDefault();
    let fecha = var_fecha.format("YYYY-MM-DD")
    handlePost(documento, {cantidad, numrecibo, fecha})
  };

  const handleFecha = (val)=>{
    console.log("fecha ", val);
  }
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
        Pagar Documento {documento}
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
          <Grid item xs={12}>
            <TextField
              label="Número de Recibo"
              type="number"
              fullWidth
              value={numrecibo}
              onChange={(e) => setNumrecibo(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
      <DatePicker
          label="Controlled picker"
          value={var_fecha}
          onChange={(newValue) => setFecha(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
        </Box>
      </Modal>
    </div>
  );
}