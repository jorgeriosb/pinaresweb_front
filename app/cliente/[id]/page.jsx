"use client"; // This is a client component 👈🏽
import React, { useEffect, useState } from 'react';
import { Button, TextField, Grid, Container, Typography } from '@mui/material';

import {get_cliente_id} from "../../api/cliente"
import useAuth from '../../hooks/useAuth';



const ClienteForm = () => {
  useAuth();
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    rfc: '',
    nacionalidad: '',
    lugardenacimiento: '',
    fechadenacimiento: '',
    estadocivil: '',
    situacion: '',
    regimen: '',
    ocupacion: '',
    domicilio: '',
    colonia: '',
    cp: '',
    ciudad: '',
    estado: '',
    telefonocasa: '',
    telefonotrabajo: '',
    conyugenombre: '',
    conyugenacionalidad: '',
    conyugelugardenacimiento: '',
    conyugefechadenacimiento: '',
    conyugerfc: '',
    conyugeocupacion: '',
    contpaq: '',
    curp: '',
    conyugecurp: '',
    email: '',
    numeroidentificacion: '',
    identificacion: '',
    edad: ''
  });

  useEffect(()=>{
    let url = window.location.href;
    let id_user = url.split("/")[4];
    const get_cliente =async ()=>{
      get_cliente_id
      let response = await get_cliente_id(id_user)
      response = await response.json()
      setFormData(response)
    }
    get_cliente()
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to backend)
    console.log('Form data submitted:', formData);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cliente Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Código"
              type="number"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="RFC"
              type="text"
              name="rfc"
              value={formData.rfc}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nacionalidad"
              type="text"
              name="nacionalidad"
              value={formData.nacionalidad}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Lugar de Nacimiento"
              type="text"
              name="lugardenacimiento"
              value={formData.lugardenacimiento}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Fecha de Nacimiento"
              type="date"
              name="fechadenacimiento"
              value={formData.fechadenacimiento}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Estado Civil"
              type="text"
              name="estadocivil"
              value={formData.estadocivil}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Situación"
              type="text"
              name="situacion"
              value={formData.situacion}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Régimen"
              type="text"
              name="regimen"
              value={formData.regimen}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Ocupación"
              type="text"
              name="ocupacion"
              value={formData.ocupacion}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Domicilio"
              type="text"
              name="domicilio"
              value={formData.domicilio}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Colonia"
              type="text"
              name="colonia"
              value={formData.colonia}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Código Postal"
              type="text"
              name="cp"
              value={formData.cp}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Ciudad"
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Estado"
              type="text"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Teléfono Casa"
              type="text"
              name="telefonocasa"
              value={formData.telefonocasa}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Teléfono Trabajo"
              type="text"
              name="telefonotrabajo"
              value={formData.telefonotrabajo}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nombre del Cónyuge"
              type="text"
              name="conyugenombre"
              value={formData.conyugenombre}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Nacionalidad del Cónyuge"
              type="text"
              name="conyugenacionalidad"
              value={formData.conyugenacionalidad}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Lugar de Nacimiento del Cónyuge"
              type="text"
              name="conyugelugardenacimiento"
              value={formData.conyugelugardenacimiento}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Fecha de Nacimiento del Cónyuge"
              type="date"
              name="conyugefechadenacimiento"
              value={formData.conyugefechadenacimiento}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="RFC del Cónyuge"
              type="text"
              name="conyugerfc"
              value={formData.conyugerfc}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Ocupación del Cónyuge"
              type="text"
              name="conyugeocupacion"
              value={formData.conyugeocupacion}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Contpaq"
              type="text"
              name="contpaq"
              value={formData.contpaq}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="CURP"
              type="text"
              name="curp"
              value={formData.curp}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="CURP del Cónyuge"
              type="text"
              name="conyugecurp"
              value={formData.conyugecurp}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Número de Identificación"
              type="text"
              name="numeroidentificacion"
              value={formData.numeroidentificacion}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Identificación"
              type="text"
              name="identificacion"
              value={formData.identificacion}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Edad"
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ClienteForm;
