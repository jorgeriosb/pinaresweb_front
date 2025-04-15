"use client";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField, Grid, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { object } from 'hume/core/schemas';
import 'dayjs/locale/es';

dayjs.locale('es');
import React, { useEffect, useState } from 'react';





const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70%",
  height:"90%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function calcularInteresSimple(documento, tasainteresanual) {
  console.log("viendo esto ", tasainteresanual)
  const tasaAnual = parseFloat(tasainteresanual) /100
  const unDia = 1000 * 60 * 60 * 24; // milisegundos en un día
  const inicio = new Date(documento["fechadevencimiento"]);
  const fin = new Date();

  const dias = Math.floor((fin - inicio) / unDia);
  const tiempoEnAnios = dias / 360;

  console.log("dias ", dias)
  const interes = documento["saldo"] * tasaAnual * tiempoEnAnios;
  return interes.toFixed(2)
}

export default function ModalPagarVarios({is_open=false, handleClose, documentos, handlePost, tasainteresanual}) {
  const [cantidad, setCantidad] = useState('');
  const [numrecibo, setNumrecibo] = useState('');
  const [var_fecha, setFecha] = React.useState(dayjs(new Date()));
  const [flagBotonPagar, setFlagBotonPagar]  = useState(false);
  const [formData, setFormData] = useState([])
  const [referencia, setReferencia] = useState("")
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    let fecha = var_fecha.format("YYYY-MM-DD")
    await handlePost({formData, fecha, cantidad, referencia})
    setLoading(false)
  };

  const handleChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  useEffect(()=>{
    let sumcatidad = 0;
    formData.forEach((item)=>{
      sumcatidad = parseFloat(sumcatidad)+parseFloat(item["cantidad"])+parseFloat(item["intereses"])
    })
    if(parseFloat(sumcatidad) === parseFloat(cantidad)){
      setFlagBotonPagar((prev)=>{
        return true
      })
    }else{
      setFlagBotonPagar((prev)=>{
        return false
      })
    }

  }, [formData])

  useEffect(() => {
    if(documentos.length>0){
      setFormData(documentos.map((item) => ({id:item["id"], cantidad: 0, intereses: calcularInteresSimple(item, tasainteresanual), saldo:item["saldo"], "fechadevencimiento":item["fechadevencimiento"] })));
    }
  }, [documentos]);

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
  <Box
    sx={{
      maxHeight: '100%',
      overflowY: 'auto',
      pr: 2, // space for scrollbar
    }}
  >
        <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12} style={{textAlign:"center"}}>
      <Typography variant="h5" gutterBottom>
        Pagar Documentos
      </Typography>
      </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DemoContainer components={['DatePicker']}>
      <DatePicker
          label="Fecha"
          value={var_fecha}
          onChange={(newValue) => setFecha(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Cantidad Total"
              type="number"
              fullWidth
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
            />
          </Grid>
          {formData.map((item, index) => (
  <React.Fragment key={item.id || index}>
    <Grid item xs={12}>
    </Grid>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <div style={{marginLeft:"10%", marginTop:"5%"}}>Documento {formData[index]["id"]} Saldo ${formData[index]["saldo"]}</div>
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Cantidad"
          type="number"
          fullWidth
          value={parseFloat(formData[index]["cantidad"])}
          onChange={(e) => handleChange(index, 'cantidad', e.target.value)}
          required
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Intereses"
          type="number"
          fullWidth
          value={parseFloat(formData[index]["intereses"])}
          onChange={(e) => handleChange(index, 'intereses', e.target.value)}
        />
      </Grid>

    </Grid>
  </React.Fragment>
))}
<Grid item xs={12}>
        <TextField
          label="referencia"
          type="text"
          fullWidth
          value={referencia}
          onChange={(e) => {setReferencia((prev)=>{return e.target.value})}}
        />
      </Grid>
          <Grid item xs={12}>
            <div style={{textAlign:"center", alignItems:"center"}}>
            {flagBotonPagar && <Button disabled={loading} style={{width:"120px"}} variant="contained" color="primary" type="submit" fullWidth>
              Pagar
            </Button>}
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
        </Box>
        </Box>
      </Modal>
    </div>
  );
}