"use client"; // This is a client component 👈🏽
import React, { useEffect, useState } from 'react';
import { FormControlLabel, FormGroup, Button, TextField, Grid, Container, Typography, MenuItem, Select, FormControl, InputLabel, Divider, Checkbox } from '@mui/material';

import {get_cliente_id} from "../api/cliente"
import useAuth from '../hooks/useAuth';
import {create_cliente, update_cliente} from "../api/cliente"
import {genera_solicitud} from "../api/solicitud"
import {get_provedores} from "../api/proveedor"
import {get_departamentos} from "../api/departamento"

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'
import SearchDropdown from "../../components/SearchDropDown"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // idioma español

dayjs.locale('es'); // establecer español como global


const ClienteForm = () => {
  const params = useParams()
  useAuth();
  const router = useRouter()
  const [formData, setFormData] = useState({
    descripcion:'',
    cantidad:'',
    fechapago:'',
    fechaelaboracion:'',
    fk_proveedor:'',
    fk_departamento:''

  });
  const [selectedProveedor, setSelectedProveedor] = useState(null)
  const [provedores, setProvedores] = useState([])
  const [departamentos, setDepartamentos] = useState([])
  const [selectedDepartamento, setSelectedDepartamento] = useState(null)
  const [var_fecha, setFecha] = useState(dayjs(new Date()));




  useEffect(()=>{
    const get_data = async()=>{
      console.log("aqwui");
      let val = await get_provedores()
      let jval = await val.json()
      setProvedores(jval)
      let val2 = await get_departamentos()
      let jval2= await val2.json()
      setDepartamentos(jval2)
    }
    get_data()
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
    formData["fk_proveedor"] = selectedProveedor.id;
    formData["fk_departamento"] = selectedDepartamento.id;
    formData["estatus"]="Creada";
    let solicitud = await genera_solicitud(formData);
    const solicitud_id = solicitud.headers.get('X-Custom-Value');
    console.log("viendo solicitud ID ", solicitud_id)
    const blob = await solicitud.blob();

      // Create a temporary URL and download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Set the filename for download
      link.download = 'solicitud.pdf';
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
      router.push(`/solicitud/${solicitud_id}`)
  };

  const handleFecha=(val, field)=>{
    let fecha = val.format("YYYY-MM-DD")
      setFecha(val)
      setFormData({
        ...formData,
        ["fechapago"]: fecha,
        ["fechaelaboracion"]: fecha,
      });


  }

 

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Solicitud De Pago
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={9} md={9} className={'prueba'} style={{marginTop:"10px"}}>
            <SearchDropdown
                            placeHolder="Selecciona Proveedor"
                            records={provedores}
                            value={selectedProveedor}  
                            handleSelect={setSelectedProveedor}
                            label1="nombre"
                          />

          </Grid>
          <Grid item xs={3} md={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="Fecha De Pago"
                        value={var_fecha}
                        onChange={(newValue) => handleFecha(newValue, "fechaprimerpago")}
                      />
                </DemoContainer>
                </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={12}>
            <SearchDropdown
                            placeHolder="Selecciona Departamento"
                            records={departamentos}
                            value={selectedDepartamento}  
                            handleSelect={setSelectedDepartamento}
                            label1="nombre"
                          />

          </Grid>
          <Grid item xs={12} md={12}>
          <TextField
              multiline
              rows={4}
              label="Descripcion"
              type="text"
              name="descripcion"
              value={formData.descripcion || ''}
              onChange={handleChange}
              fullWidth
            />
            </Grid>
            <Grid item xs={3} md={3}>
            <TextField
              label="Cantidad"
              type="text"
              name="cantidad"
              value={formData.cantidad || ''}
              onChange={handleChange}
              fullWidth
            />
            </Grid>
          </Grid>

        <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
          Crear Solicitud
        </Button>
      </form>
    </Container>
  );
};

export default ClienteForm;
