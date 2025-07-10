"use client";
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'
import {get_cuenta_id} from "../../api/cuenta"
import {get_inmueble_id} from "../../api/inmueble"
import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';





const CuentaId = ()=>{
    const [cuenta, setCuenta] = useState({})
    const [inmueble, setInmueble] = useState({})
    const params = useParams()
    useEffect(()=>{
        const get_data = async()=>{
            const val = await get_cuenta_id(params["id"])
            const rval = await val.json()
            setCuenta(rval)
            console.log("viendo r val ", rval)
            const req = await get_inmueble_id(rval["fk_inmueble"])
            const reqjson = await req.json()
            setInmueble(reqjson)
        }
        get_data()
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInmueble({
          ...inmueble,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // You can send the form data to an API or handle it as needed
        console.log('Form submitted:', cuenta);
      };
      return (
        <Box
          
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '90%',
            margin: 'auto',
            padding: '20px',
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
            <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '90%',
            margin: 'auto',
            padding: '20px',
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Cuenta
          </Typography>
    
          {/* Material UI Grid for organizing the form fields */}
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                label="Codigo"
                name="codigo"
                value={cuenta.codigo || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Fecha Cuenta"
                name="fecha"
                value={cuenta.fecha || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={3}>
            <TextField
                label="Saldo"
                name="saldo"
                value={cuenta.saldo || ''}
                type='number'
                onChange={handleChange}
                fullWidth
                margin="normal"
                //disabled
              />
            </Grid>
            </Grid>
            </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '90%',
            margin: 'auto',
            padding: '20px',
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Inmueble
          </Typography>
    
          {/* Material UI Grid for organizing the form fields */}
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                label="Codigo"
                name="codigo"
                value={inmueble.codigo || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                disabled
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Condominio"
                name="condominio"
                value={inmueble.condominio || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={3}>
              <TextField
                label="Cuentacatastral"
                name="cuentacatastral"
                value={inmueble.cuentacatastral || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Domicilio Oficial"
                name="domiciliooficial"
                value={inmueble.domiciliooficial || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={4}>
              <TextField
                label="Escriturado"
                name="escriturado"
                value={inmueble.escriturado || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Fecha de Venta"
                name="fechadeventa"
                value={inmueble.fechadeventa || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
    
            <Grid item xs={3}>
              <TextField
                label="Fecha Escriturado"
                name="fechaescriturado"
                value={inmueble.fechaescriturado || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Identificación 1"
                name="iden1"
                value={inmueble.iden1 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={3}>
              <TextField
                label="Identificación 2"
                name="iden2"
                value={inmueble.iden2 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Indiviso"
                name="indiviso"
                value={inmueble.indiviso || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="Inmueble"
                name="inmueble"
                value={inmueble.inmueble || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="Lindero 1"
                name="lindero1"
                value={inmueble.lindero1 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="Lindero 2"
                name="lindero2"
                value={inmueble.lindero2 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="Lindero 3"
                name="lindero3"
                value={inmueble.lindero3 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="Lindero 4"
                name="lindero4"
                value={inmueble.lindero4 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={3}>
              <TextField
                label="Precio"
                name="precio"
                value={inmueble.precio || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
              />
            </Grid>
    
            <Grid item xs={3}>
              <TextField
                label="Precio por Metro"
                name="preciopormetro"
                value={inmueble.preciopormetro || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
              />
            </Grid>
    
            <Grid item xs={3}>
              <TextField
                label="Referencia Pago"
                name="referenciapago"
                value={inmueble.referenciapago || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={3}>
              <TextField
                label="Superficie"
                name="superficie"
                value={inmueble.superficie || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="Superficie Casa"
                name="superficiecasa"
                value={inmueble.superficiecasa || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
                type="number"
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="Tipo"
                name="tipo"
                value={inmueble.tipo || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="Titulo 1"
                name="titulo1"
                value={inmueble.titulo1 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="Titulo 2"
                name="titulo2"
                value={inmueble.titulo2 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="Titulo 3"
                name="titulo3"
                value={inmueble.titulo3 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="Titulo 4"
                name="titulo4"
                value={inmueble.titulo4 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
    
          {/* Submit Button */}
          {/* <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
            Submit
          </Button> */}
        </Box>
        
        </Box>
      );
}

export default CuentaId