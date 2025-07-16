"use client"; // This is a client component 👈🏽
import React, { useEffect, useState } from 'react';
import { FormControlLabel, FormGroup, Button, TextField, Grid, Container, Typography, MenuItem, Select, FormControl, InputLabel, Divider, Checkbox } from '@mui/material';

import {get_cliente_id} from "../../api/cliente"
import useAuth from '../../hooks/useAuth';
import {create_cliente, update_cliente} from "../../api/cliente"
import {genera_solicitud} from "../../api/solicitud"
import {get_provedores} from "../../api/proveedor"
import {get_departamentos} from "../../api/departamento"
import {get_solicitud, update_solicitud} from "../../api/solicitud"

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'
import SearchDropdown from "../../../components/SearchDropDown"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BasicModal from "../../../components/ModalUpdate"



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
  const [modalCuentaNuevaFlag, setModalCuentaNuevaFlag] = useState(false)
  const [selectedProveedor, setSelectedProveedor] = useState(null)
  const [provedores, setProvedores] = useState([])
  const [departamentos, setDepartamentos] = useState([])
  const [selectedDepartamento, setSelectedDepartamento] = useState(null)
  const [var_fecha, setFecha] = useState(dayjs(new Date()));
  const [estatuses, setStatuses] = useState([{"id":1, "nombre":"Creada"}, {"id":2, "nombre":"Autorizada"}, {"id":3, "nombre":"Programada"}, {"id":4, "nombre":"Pagada"}, {"id":5, "nombre":"Cancelada"}])
  const [selectedEstatus, setSelectedEstatus] = useState(null)



  useEffect(() => {
    const get_data = async () => {
      let val = await get_provedores();
      let jval = await val.json();
      setProvedores(jval);
  
      let val2 = await get_departamentos();
      let jval2 = await val2.json();
      setDepartamentos(jval2);
  
      let sol = await get_solicitud(params["id"]);
      let jsol = await sol.json();
  
      const estatus = estatuses.find((item) => item.nombre === jsol.estatus);
      setSelectedEstatus(estatus || null);
  
      const prov = jval.find((item) => item.id === jsol.fk_proveedor);
      setSelectedProveedor(prov || null);
  
      const depto = jval2.find((item) => item.id === jsol.fk_departamento);
      setSelectedDepartamento(depto || null);
  
      
      setFormData({
        descripcion: jsol.descripcion || '',
        cantidad: jsol.cantidad || '',
        fechapago: jsol.fechapago || '',
        fechaelaboracion: jsol.fechaelaboracion || '',
        fk_proveedor: jsol.fk_proveedor || '',
        fk_departamento: jsol.fk_departamento || ''
      });
  
      if (jsol.fechapago) {
        setFecha(dayjs(jsol.fechapago));
      }
    };
  
    get_data();
  }, []);

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
    formData["estatus"] = selectedEstatus.nombre
    let solicitud = await update_solicitud(params["id"], formData);
    let jsolicitud = await solicitud.json()
    if (jsolicitud["data"]){
      let sol = await get_solicitud(params["id"]);
      let jsol = await sol.json();
  
      const estatus = estatuses.find((item) => item.nombre === jsol.estatus);
      setSelectedEstatus(estatus || null);
  
      const prov = provedores.find((item) => item.id === jsol.fk_proveedor);
      setSelectedProveedor(prov || null);
  
      const depto = departamentos.find((item) => item.id === jsol.fk_departamento);
      setSelectedDepartamento(depto || null);
  
      
      setFormData({
        descripcion: jsol.descripcion || '',
        cantidad: jsol.cantidad || '',
        fechapago: jsol.fechapago || '',
        fechaelaboracion: jsol.fechaelaboracion || '',
        fk_proveedor: jsol.fk_proveedor || '',
        fk_departamento: jsol.fk_departamento || ''
      });
  
      if (jsol.fechapago) {
        setFecha(dayjs(jsol.fechapago));
      }
      setModalCuentaNuevaFlag(true)
    }
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

  const closeModalCuentaNueva = ()=>{
    setModalCuentaNuevaFlag(false)
  }
 

  return (
    <Container>
      <BasicModal open={modalCuentaNuevaFlag} handleClose={closeModalCuentaNueva} text={"Solicitud Actualizada"}/>

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
          <Grid item xs={9} md={9}>
            <SearchDropdown
                            placeHolder="Selecciona Departamento"
                            records={departamentos}
                            value={selectedDepartamento}  
                            handleSelect={setSelectedDepartamento}
                            label1="nombre"
                          />

          </Grid>
          <Grid item xs={3} md={3}>
            <SearchDropdown
                            placeHolder="Selecciona Departamento"
                            records={estatuses}
                            value={selectedEstatus}  
                            handleSelect={setSelectedEstatus}
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
          Actualizar Solicitud
        </Button>
      </form>
    </Container>
  );
};

export default ClienteForm;
