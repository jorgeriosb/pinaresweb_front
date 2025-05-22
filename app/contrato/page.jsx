"use client";
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'
import {get_cuenta_id} from "..//api/cuenta"
import {get_inmueble_id, get_inmuebles_disponibles} from "..//api/inmueble"
import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Grid, FormControl, FormControlLabel, InputLabel, Select, MenuItem } from '@mui/material';
import SearchDropdown from "../../components/SearchDropDown"
import {get_clientes} from "../api/cliente"
import {get_vendedores} from "../api/vendedor"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { object } from 'hume/core/schemas';
import 'dayjs/locale/es';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

dayjs.locale('es');





var lista = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36']
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
    const [vendedores, setVendedores] = useState([])
    const [selectedVendedor, setSelectedVendedor] = useState(null)
    const [var_fecha, setFecha] = React.useState(dayjs(new Date()));
    const [var_fechaenganche, setFechaEnganche] = React.useState(dayjs(new Date()));
    const [flagBotonAmortizacion, setFlagBotonAmortizacion] = useState(false)

    

    const [formFormaDePago, setFormFormaDePago] = useState({
      formadepago: '',
      plazomeses: '',
      tasainteresanual:'',
      fechaprimerpago: '',
      preciocontado:'',
      enganche:'',
      descuento:'',
      fechaenganche:'',
      saldoafinanciar:'',
      pagomensualfijo:'',
    })

    useEffect(()=>{
      let valid=true;
      const keysToRemove = ['plazomeses', 'tasainteresanual'];
      const filteredKeys = Object.keys(formFormaDePago).filter(
        key => !keysToRemove.includes(key)
      );
      filteredKeys.forEach((key)=>{
        valid= formFormaDePago[key].trim() !== ''
      })
      console.log("valid ",valid)
      if (!valid){
        setFlagBotonAmortizacion(false)
        return
      }
      if(formFormaDePago.formadepago === "R"){
        keysToRemove.forEach((key)=>{
          valid= formFormaDePago[key].trim() !== ''
        })
      }
      console.log("valid ",valid)
      if (!valid){
        setFlagBotonAmortizacion(false)
        return
      }
      console.log("is valid ", valid)
      setFlagBotonAmortizacion(true)

    },[formFormaDePago])

    const handleChangeFormFormadePago = (e) => {
      const { name, value } = e.target;
      setFormFormaDePago({
        ...formFormaDePago,
        [name]: value,
      });
    };
    

    useEffect(()=>{
        const get_data = async()=>{
            const val = await get_inmuebles_disponibles()
            const jval = await val.json()
            setInmueblesDisponibles(jval)
            const clientes = await get_clientes()
            const jclientes = await clientes.json()
            setClientes(jclientes)
            const val2 = await get_vendedores()
            const jval2 = await val2.json()
            setVendedores(jval2)
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

      const handleFecha=(val, field)=>{
        if(field=="fechaprimerpago"){
          setFecha(val)
          setFormFormaDePago({
            ...formFormaDePago,
            ["fechaprimerpago"]: val,
          });

        }
        if(field=="fechaenganche"){
          setFechaEnganche(val)
          setFormFormaDePago({
            ...formFormaDePago,
            ["fechaenganche"]: val,
          });

        }

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
            Cliente - Vendedor
          </Typography>

          {/* Grid container */}
          <Grid container xs={12} spacing={2} style={{ width: '100%' }}>
            {/* Full width item for dropdown */}
            <Grid item xs={12}>
              <SearchDropdown
                placeHolder="Selecciona Cliente"
                records={clientes}
                value={selectedCliente}
                handleSelect={setSelectedCliente}
                label1="nombre"
              />
            </Grid>
            <Grid container xs={12} spacing={2}  style={{marginTop:"20px", marginLeft:"18px"}}>
              <Button style={{backgroundColor:'#28a745'}} variant="contained" href={`/cliente/nuevo`}>agregar cliente</Button>
              
            </Grid>

            {/* 1/4 width item */}
            <Grid item xs={12}>
              <SearchDropdown
                placeHolder="Selecciona Vendedor"
                records={vendedores}
                value={selectedVendedor}
                handleSelect={setSelectedVendedor}
                label1="nombre"
              />
            </Grid>
            <Grid container xs={12} spacing={2}  style={{marginTop:"20px", marginLeft:"18px"}}>
              <Button style={{backgroundColor:'#28a745'}} variant="contained" href={`/cliente/nuevo`}>agregar vendedor</Button>
              
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
              />
            </Grid>
          </Grid>
    
          {/* Submit Button */}
          {/* <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
            Submit
          </Button> */}
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
                      <Select name="formadepago" value={formFormaDePago.formadepago || ''} onChange={handleChangeFormFormadePago} label="Estado Civil">
                      <MenuItem value="C">Contado</MenuItem>
                      <MenuItem value="R">Credito</MenuItem>
                      </Select>
                      </FormControl>

          </Grid>

            {formFormaDePago.formadepago == "R" &&  (
              <Grid item xs={3} style={{marginTop:"17px"}}>
              <FormControl fullWidth>
              <InputLabel>Mensualidades</InputLabel>
              <Select name="plazomeses" value={formFormaDePago.plazomeses || ''} onChange={handleChangeFormFormadePago} label="Estado Civil">
                {
                lista.map((item)=>{
                  return <MenuItem value={item}>{item} Mes{item>1 ? "es": ""}</MenuItem>
                })}
              </Select>
              </FormControl>
              </Grid>
              
            )}
            {formFormaDePago.formadepago == "R" && (
              <Grid item xs={3}>
              <TextField
                label="Tasa de interes anual"
                name="tasainteresanual"
                value={formFormaDePago.tasainteresanual || ''}
                onChange={handleChangeFormFormadePago}
                fullWidth
                margin="normal"
              />
            </Grid>
            )}
    
            <Grid item xs={3} style={{marginTop:"10px"}}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="Fecha Primer Pago"
                        value={var_fecha}
                        onChange={(newValue) => handleFecha(newValue, "fechaprimerpago")}
                      />
                    </DemoContainer>
                    </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Precio de Contado"
                name="preciocontado"
                value={formFormaDePago.preciocontado || ''}
                onChange={handleChangeFormFormadePago}
                fullWidth
                margin="normal"
                //disabled
              />
            </Grid>
    
            <Grid item xs={4}>
              <TextField
                label="Enganche"
                name="enganche"
                value={formFormaDePago.enganche || ''}
                onChange={handleChangeFormFormadePago}
                fullWidth
                margin="normal"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Descuento"
                name="descuento"
                value={formFormaDePago.descuento || ''}
                onChange={handleChangeFormFormadePago}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={3} style={{marginTop:"10px"}}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="Fecha de enganche"
                        value={var_fechaenganche}
                        onChange={(newValue) => handleFecha(newValue, "fechaenganche")}
                      />
                    </DemoContainer>
                    </LocalizationProvider>
            </Grid>
            
            <Grid item xs={4}>
              <TextField
                label="Saldo a financiar"
                name="saldoafinanciar"
                value={formFormaDePago.saldoafinanciar || ''}
                onChange={handleChangeFormFormadePago}
                fullWidth
                margin="normal"
              />
            </Grid>
          
            
            <Grid item xs={4}>
              <TextField
                label="Pago mensual fijo"
                name="pagomensualfijo"
                value={formFormaDePago.pagomensualfijo || ''}
                onChange={handleChangeFormFormadePago}
                fullWidth
                margin="normal"
              />
            </Grid>

            
          </Grid>
    
          {/* Submit Button */}
          {flagBotonAmortizacion && (
            <Button style={{backgroundColor:"#1976d2", color:"white"}} >
            Calcular tabla amortizacion
          </Button>
          )}
        </Box>
        
        </Box>
      );
}

export default CuentaId