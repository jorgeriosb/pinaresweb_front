"use client";
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'
import {get_cuenta_id} from "..//api/cuenta"
import {get_inmueble_id, get_inmuebles_disponibles} from "..//api/inmueble"
import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Grid, FormControl, FormControlLabel, InputLabel, Select, MenuItem } from '@mui/material';
import SearchDropdown from "../../components/SearchDropDown"
import {get_clientes} from "../api/cliente"






const CuentaId = ()=>{
    const [cuenta, setCuenta] = useState({})
    const [inmueble, setInmueble] = useState({})
    const [selectedInmueble, setSelectedInmueble] = useState(null)
    const [inmueblesDisponibles, setInmueblesDisponibles] = useState([])
    const [clientes, setClientes] = useState([])
    const [selectedCliente, setSelectedCliente] = useState(null)
    const params = useParams()
    const [inmuebleData, setInmuebleData] = useState({})
    const [formaDePago, setFormaDePago] = useState('');
    const [mesesPago, setMesesPago] = useState('');

    useEffect(()=>{
        const get_data = async()=>{
            const val = await get_inmuebles_disponibles()
            const jval = await val.json()
            setInmueblesDisponibles(jval)
            const clientes = await get_clientes()
            const jclientes = await clientes.json()
            setClientes(jclientes)
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

      const handleSelectedInmueble = (e)=>{
        console.log("aquio ", e)
        setSelectedInmueble(e)
        setInmuebleData((prev)=>{
          return {...e}
        })
      }
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
            Cliente
          </Typography>
          <SearchDropdown placeHolder={"Selecciona Cliente"} records={clientes} value={selectedCliente} handleSelect={setSelectedCliente} label1={"nombre"} />
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
          <Grid item xs={3} style={{marginTop:"17px"}}>
          <SearchDropdown placeHolder={"Selecciona Inmueble"} records={inmueblesDisponibles} value={selectedInmueble} handleSelect={(e)=>{handleSelectedInmueble(e)}} label1={"iden1"} label2={"iden2"} label3={"condominio"}/>

          </Grid>

            <Grid item xs={3}>
              <TextField
                label="codigo"
                name="codigoInmueble"
                value={inmuebleData.codigo || ''}
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
                value={inmuebleData.condominio || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={3}>
              <TextField
                label="Cuentacatastral"
                name="cuentacatastral"
                value={inmuebleData.cuentacatastral || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Domicilio Oficial"
                name="domiciliooficial"
                value={inmuebleData.domiciliooficial || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={4}>
              <TextField
                label="Escriturado"
                name="escriturado"
                value={inmuebleData.escriturado || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Fecha de Venta"
                name="fechadeventa"
                value={inmuebleData.fechadeventa || ''}
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
                value={inmuebleData.fechaescriturado || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Identificación 1"
                name="iden1"
                value={inmuebleData.iden1 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={3}>
              <TextField
                label="Identificación 2"
                name="iden2"
                value={inmuebleData.iden2 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Indiviso"
                name="indiviso"
                value={inmuebleData.indiviso || ''}
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
                value={inmuebleData.inmueble || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Titulo 1"
                name="titulo1"
                value={inmuebleData.titulo1 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="Titulo 2"
                name="titulo2"
                value={inmuebleData.titulo2 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="Lindero 1"
                name="lindero1"
                value={inmuebleData.lindero1 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="Lindero 2"
                name="lindero2"
                value={inmuebleData.lindero2 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Titulo 3"
                name="titulo3"
                value={inmuebleData.titulo3 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="Titulo 4"
                name="titulo4"
                value={inmuebleData.titulo4 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="Lindero 3"
                name="lindero3"
                value={inmuebleData.lindero3 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={6}>
              <TextField
                label="Lindero 4"
                name="lindero4"
                value={inmuebleData.lindero4 || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Precio"
                name="precio"
                value={inmuebleData.precio || ''}
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
                value={inmuebleData.preciopormetro || ''}
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
                value={inmuebleData.referenciapago || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={3}>
              <TextField
                label="Superficie"
                name="superficie"
                value={inmuebleData.superficie || ''}
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
                value={inmuebleData.superficiecasa || ''}
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
                value={inmuebleData.tipo || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
    
          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
            Submit
          </Button>
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
            Detalle De Pago
          </Typography>
    
          {/* Material UI Grid for organizing the form fields */}
          <Grid container spacing={2}>
          <Grid item xs={3} style={{marginTop:"17px"}}>
                      <FormControl fullWidth>
                      <InputLabel>Forma de Pago</InputLabel>
                      <Select name="formadepago" value={formaDePago || ''} onChange={(e) => setFormaDePago(e.target.value)} label="Estado Civil">
                      <MenuItem value="0">Contado</MenuItem>
                      <MenuItem value="1">Credito</MenuItem>
                      </Select>
                      </FormControl>

          </Grid>

            {formaDePago == "1" &&  (
              <Grid item xs={3} style={{marginTop:"17px"}}>
              <FormControl fullWidth>
              <InputLabel>Mensualidades</InputLabel>
              <Select name="meses" value={mesesPago || ''} onChange={(e) => setMesesPago(e.target.value)} label="Estado Civil">
              <MenuItem value="1">1 Mes</MenuItem>
              <MenuItem value="2">2 Meses</MenuItem>
              <MenuItem value="3">3 Meses</MenuItem>
              <MenuItem value="4">4 Meses</MenuItem>
              <MenuItem value="5">5 Meses</MenuItem>
              </Select>
              </FormControl>
              </Grid>
            )}
            <Grid item xs={3}>
              <TextField
                label="Condominio"
                name="condominio"
                value={inmuebleData.condominio || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={3}>
              <TextField
                label="Cuentacatastral"
                name="cuentacatastral"
                value={inmuebleData.cuentacatastral || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Domicilio Oficial"
                name="domiciliooficial"
                value={inmuebleData.domiciliooficial || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
    
            <Grid item xs={4}>
              <TextField
                label="Escriturado"
                name="escriturado"
                value={inmuebleData.escriturado || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            </Grid>
            
          </Grid>
    
          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
            Submit
          </Button>
        </Box>
        
        </Box>
      );
}

export default CuentaId