"use client"; // This is a client component 👈🏽
import React, { useEffect, useState } from 'react';
import { FormControlLabel, FormGroup, Button, TextField, Grid, Container, Typography, MenuItem, Select, FormControl, InputLabel, Divider, Checkbox } from '@mui/material';

import {get_cliente_id} from "../../api/cliente"
import useAuth from '../../hooks/useAuth';
import {create_cliente} from "../../api/cliente"
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'





const ClienteForm = () => {
  const params = useParams()
  useAuth();
  const router = useRouter()
  const [isNuevo, setIsNuevo] = useState(false)
  const [formData, setFormData] = useState({
    codigo: null,
    nombre: null,
    rfc: null,
    nacionalidad: null,
    lugardenacimiento: null,
    fechadenacimiento: null,
    estadocivil: null,
    situacion: null,
    regimen: null,
    ocupacion: null,
    domicilio: null,
    colonia: null,
    cp: null,
    ciudad: null,
    estado: null,
    telefonocasa: null,
    telefonotrabajo: null,
    conyugenombre: null,
    conyugenacionalidad: null,
    conyugelugardenacimiento: null,
    conyugefechadenacimiento: null,
    conyugerfc: null,
    conyugeocupacion: null,
    contpaq: null,
    curp: null,
    conyugecurp: null,
    email: null,
    numeroidentificacion: null,
    identificacion: null,
    edad: null
  });
  const [clienteNuevo, setClienteNuevo] = useState(false)

  useEffect(()=>{
    let url = window.location.href;
    let id_user = url.split("/")[4];
    const get_cliente =async ()=>{
      get_cliente_id
      let response = await get_cliente_id(id_user)
      response = await response.json()
      setFormData((prev)=>{
        return {...response}
      })
    }
    get_cliente()
    console.log("viendo params", params)
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to backend)
    console.log('Form data submitted:', formData);
    formData["clienteNuevo"]=clienteNuevo;
    const val = await create_cliente(formData)
    const jval = await val.json()
    if(jval["status"]==="good"){
      setFormData(jval["data"])
      router.push(`/cliente/${jval["data"]["codigo"]}`)
    }else{

    }
  };

  const llenaforma = ()=>{
    setFormData({...formData, ciudad
      : 
      "GUADALAJARA",
      "codigo"
      : 
      "2729",
      colonia
      : 
      "BLANCO Y CUELLA",
      contpaq
      : 
      "",
      conyugecurp
      : 
      "",
      conyugefechadenacimiento
      : 
      "",
      conyugelugardenacimiento
      : 
      "",
      conyugenacionalidad
      : 
      "",
      conyugenombre
      : 
      "",
      conyugeocupacion
      : 
      "",
      conyugerfc
      : 
      "",
      cp
      : 
      "44730",
      curp
      : 
      "MOGK780615MJCNNR08",
      domicilio
      : 
      "C VENTURA ANAYA 767",
      edad
      : 
      "",
      email
      : 
      "KARYSMG@GMAIL.COM",
      estado
      : 
      "JALISCO",
      estadocivil
      : 
      "SOLTERA",
      fechadenacimiento
      : 
      "1978-06-15",
      identificacion
      : 
      "",
      lugardenacimiento
      : 
      "JALISCO",
      nacionalidad
      : 
      "MEXICANA",
      nombre
      : 
      "KARINA MONTAÑO GONZALEZ",
      numeroidentificacion
      : 
      "",
      ocupacion
      : 
      "PROFESIONISTA",
      regimen
      : 
      "ASALARIADO",
      rfc
      : 
      "MOGK780615MJCNNR08",
      situacion
      : 
      "PROFESIONISTA",
      telefonocasa
      : 
      "3314855096",
      telefonotrabajo
      : 
      ""})
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cliente Form
      </Typography>
      {/* <Button onClick={llenaforma}>llena forma</Button> */}
      <FormGroup>
        {params["id"] === "nuevo" &&       <FormControlLabel control={<Checkbox checked={clienteNuevo}  onChange={()=>{setClienteNuevo(!clienteNuevo)}}/>} label="Cliente Nuevo" />
      }
    </FormGroup>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="Código"
              type="number"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              fullWidth
              disabled={clienteNuevo}
              required={clienteNuevo}
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
          <FormControl fullWidth>
          <InputLabel>Estado Civil</InputLabel>
          <Select name="estadocivil" value={formData.estadocivil} onChange={handleChange} label="Estado Civil">
            <MenuItem value="0">Soltero</MenuItem>
            <MenuItem value="1">Casado</MenuItem>
            <MenuItem value="2">Divorciado</MenuItem>
          </Select>
          </FormControl>
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
          <FormControl fullWidth>
          <InputLabel>Regimen</InputLabel>
          <Select name="regimen" value={formData.regimen} onChange={handleChange} label="Estado Civil">
            <MenuItem value="0">Bienes separados</MenuItem>
            <MenuItem value="1">Bienes Mancomunados</MenuItem>
            <MenuItem value="2">Mixtos</MenuItem>
          </Select>
          </FormControl>
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
              label="CURP"
              type="text"
              name="curp"
              value={formData.curp}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
          <InputLabel>Identificacion</InputLabel>
          <Select name="identificacion" value={formData.identificacion} onChange={handleChange} label="Identificacion">
            <MenuItem value="INE">INE</MenuItem>
            <MenuItem value="Pasaporte">Pasaporte</MenuItem>
          </Select>
          </FormControl>
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
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}></Grid>
          
        </Grid>
        {formData.estadocivil === "1" && (<Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <p style={{fontWeight:"bold", marginTop:"10px"}}>Conyugue</p>
          </Grid>
          <Divider />
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
            {/* <TextField
              label="Contpaq"
              type="text"
              name="contpaq"
              value={formData.contpaq}
              onChange={handleChange}
              fullWidth
            /> */}
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
              label="Edad"
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>)}


        <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
          Grabar
        </Button>
      </form>
    </Container>
  );
};

export default ClienteForm;
