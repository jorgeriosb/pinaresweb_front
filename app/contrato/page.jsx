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
import {genera_amortizacion, genera_tabla_amortizacion} from "../api/amortizacion"
import {genera_pagare} from "../api/pagare"
import {genera_contrato} from "../api/contrato"
import {genera_cuenta} from "../api/cuenta"
import BasicModal from "../../components/ModalCuentaCreada"
import Paper from '@mui/material/Paper';


dayjs.locale('es');





var lista = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36']
const CuentaId = ()=>{
    const [cuenta, setCuenta] = useState(null)
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
    const [modalCuentaNuevaFlag, setModalCuentaNuevaFlag] = useState(false)
    const router = useRouter()

    

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
      //pagomensualfijo:'',
    })

    const handle_genera_amortizacion = async ()=>{
      let payload = {};
      payload["formadepago"]=formFormaDePago.formadepago;
      payload["fechaprimerpago"]= formFormaDePago.fechaprimerpago
      payload["precio"] = formFormaDePago.preciocontado
      payload["enganche"] = formFormaDePago.enganche
      payload["descuento"] = formFormaDePago.descuento
      payload["fechaenganche"] = formFormaDePago.fechaenganche
      payload["saldoafinanciar"] = formFormaDePago.saldoafinanciar
      payload["inmueble_iden1"] = inmuebleData.iden1
      payload["inmueble_iden2"] = inmuebleData.iden2
      payload["inmueble_preciopormetro"]=inmuebleData.preciopormetro
      payload["inmueble_superficie"]=inmuebleData.superficie
      payload["mensualidades"]=0
      payload["interes_anual"] =0
      if(formFormaDePago.formadepago == "R"){
        payload["mensualidades"]=formFormaDePago.plazomeses
        payload["interes_anual"] =formFormaDePago.tasainteresanual
      }
      let recibo = await genera_tabla_amortizacion(payload)
        const blob = await recibo.blob();

        // Create a temporary URL and download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        // Set the filename for download
        link.download = 'amortizacion.pdf';
        document.body.appendChild(link);
        link.click();

        // Clean up
        link.remove();
        window.URL.revokeObjectURL(url);
    }

    const handle_genera_pagare = async()=>{
      let payload ={
        "acreedor": "Arcadia Promotora S. de R.L. de C.V.",
        "domicilio_acreedor": "Av Hidalgo 1443 PB",
        "total_pagare": parseFloat(formFormaDePago.saldoafinanciar),
        "plazo_meses":  parseFloat(formFormaDePago.plazomeses),
        "fecha_inicio": formFormaDePago.fechaprimerpago,
        "interes_moratorio": 25,
        "nombre_suscriptor": selectedCliente.nombre,
        "domicilio_suscriptor": selectedCliente.domicilio,
        "telefono_suscriptor": selectedCliente.telefonocasa
      }

      console.log("viendo payload ", payload)


      let recibo = await genera_pagare(payload)
      const blob = await recibo.blob();

      // Create a temporary URL and download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Set the filename for download
      link.download = 'pagare.pdf';
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    }


    const handle_genera_contrato = async()=>{
      console.log("selectedInmueble ", selectedInmueble)
      let payload = {
        "comprador_nombre": selectedCliente.nombre,
        "comprador_nacionalidad": selectedCliente.nacionalidad,
        "superficie_m2": selectedInmueble.superficie,
        "precio_total": selectedInmueble.precio,
        "anticipo": formFormaDePago.enganche,
        "nombre_vendedora": "ARCADIA PROMOTORA S. DE R.L. DE C.V.",
        "descuento":formFormaDePago.descuento,
        "titulo1": selectedInmueble.titulo1,
        "titulo2": selectedInmueble.titulo2,
        "titulo3": selectedInmueble.titulo3,
        "titulo4": selectedInmueble.titulo4,
        "lindero1": selectedInmueble.lindero1,
        "lindero2": selectedInmueble.lindero2,
        "lindero3": selectedInmueble.lindero3,
        "lindero4": selectedInmueble.lindero4,
        "iden1": selectedInmueble.iden1,
        "iden2": selectedInmueble.iden2,
        "identificacion": selectedCliente.identificacion,
        "numeroidentificacion":selectedCliente.numeroidentificacion,
        "comprador_edad": selectedCliente.edad,
        "estado_civil":selectedCliente.estadocivil,
        "comprador_domicilio" :selectedCliente.domicilio,
        "comprador_ciudad": selectedCliente.ciudad,
        "comprador_estado":selectedCliente.estado,
        "comprador_cp": selectedCliente.cp,
        "comprador_colonia": selectedCliente.colonia,
        "fk_etapa": selectedInmueble.fk_etapa,
        "forma_de_pago": formFormaDePago.formadepago,
        "fecha_primer_pago":formFormaDePago.fechaprimerpago
      }
      if(formFormaDePago.formadepago == "R"){
        payload["plazo_meses"] = parseFloat(formFormaDePago.plazomeses),
        payload["interes_anual"] = parseFloat(formFormaDePago.tasainteresanual)
      }

      console.log("viendo payload ", payload)
       


      let recibo = await genera_contrato(payload)
      const blob = await recibo.blob();

      // Create a temporary URL and download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Set the filename for download
      link.download = 'contrato.pdf';
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    }

    const handle_guardar_amortizacion_detalle = async()=>{
      console.log("selectedInmueble ", selectedInmueble)
      let payload = {
        "comprador_nombre": selectedCliente.nombre,
        "comprador_nacionalidad": selectedCliente.nacionalidad,
        "superficie_m2": selectedInmueble.superficie,
        "precio_total": selectedInmueble.precio,
        "enganche": formFormaDePago.enganche,
        "nombre_vendedora": "ARCADIA PROMOTORA S. DE R.L. DE C.V.",
        "descuento": formFormaDePago.descuento === '' ? 0 : formFormaDePago.descuento,
        "titulo1": selectedInmueble.titulo1,
        "titulo2": selectedInmueble.titulo2,
        "titulo3": selectedInmueble.titulo3,
        "titulo4": selectedInmueble.titulo4,
        "lindero1": selectedInmueble.lindero1,
        "lindero2": selectedInmueble.lindero2,
        "lindero3": selectedInmueble.lindero3,
        "lindero4": selectedInmueble.lindero4,
        "iden1": selectedInmueble.iden1,
        "iden2": selectedInmueble.iden2,
        "identificacion": selectedCliente.identificacion,
        "numeroidentificacion":selectedCliente.numeroidentificacion,
        "comprador_edad": selectedCliente.edad,
        "estado_civil":selectedCliente.estadocivil,
        "comprador_domicilio" :selectedCliente.domicilio,
        "comprador_ciudad": selectedCliente.ciudad,
        "comprador_estado":selectedCliente.estado,
        "comprador_cp": selectedCliente.cp,
        "comprador_colonia": selectedCliente.colonia,
        "fk_etapa": selectedInmueble.fk_etapa,
        "forma_de_pago": formFormaDePago.formadepago,
        "fecha_primer_pago":formFormaDePago.fechaprimerpago,
        "fk_cliente": selectedCliente.codigo,
        "fkvendedor":selectedVendedor.codigo,
        "fkinmueble":selectedInmueble.codigo,
        "fechaenganche":formFormaDePago.fechaenganche,
        "inmueble_preciopormetro":inmuebleData.preciopormetro
      }
      if(formFormaDePago.formadepago == "R"){
        payload["plazo_meses"] = parseFloat(formFormaDePago.plazomeses),
        payload["interes_anual"] = parseFloat(formFormaDePago.tasainteresanual)
      }

      let amortizacion_detalle = await genera_amortizacion(payload)
      let jval = await amortizacion_detalle.json()
      console.log("jeje")
      console.log(jval)
      //response = jsonify({"status":"good", "data":{"amortizacion":pk}})
      if (jval["status"]=== "good"){
        console.log("entro en este")
        payload["amortizacion"] = parseInt(jval["data"]["amortizacion"])
        //let payload ={}
        let val2 =  await genera_cuenta(payload)
        let jval2 = await val2.json()
        if (jval2["status"]=== "good"){
          setCuenta(jval2["data"]["cuenta"])
          setModalCuentaNuevaFlag(true)
        }
      }


    }

    useEffect(()=>{
      console.log("aqui mero")
      let valid=true;
      const keysToRemove = ['plazomeses', 'tasainteresanual'];
      const filteredKeys = Object.keys(formFormaDePago).filter(
        key => !keysToRemove.includes(key)
      );
      filteredKeys.forEach((key)=>{
        console.log("viendo key  ",key, " ", formFormaDePago[key])
        if(formFormaDePago[key].trim() === '' && key !=="descuento"){
          valid=false
        }
      })
      setFlagBotonAmortizacion(valid)
    },[formFormaDePago])

    const handleChangeFormFormadePago = (e) => {
      const { name, value } = e.target;
      setFormFormaDePago({
        ...formFormaDePago,
        [name]: value,
      });
    };

    useEffect(()=>{
      if(formFormaDePago.plazomeses<=24){
        setFormFormaDePago({
          ...formFormaDePago,
          ["tasainteresanual"]:0 ,
        });
      } else{
        setFormFormaDePago({
          ...formFormaDePago,
          ["tasainteresanual"]:20 ,
        });
      }
    }, [formFormaDePago.plazomeses])

    useEffect(()=>{
      if(formFormaDePago.formadepago !== "R"){
        setFormFormaDePago({
          ...formFormaDePago,
          ["tasainteresanual"]:'' ,
        });
        setFormFormaDePago({
          ...formFormaDePago,
          ["plazomeses"]:'' ,
        });
      }
    }, [formFormaDePago.formadepago])

    

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
        let today = dayjs().format("YYYY-MM-DD")
        setFormFormaDePago({
          ...formFormaDePago,
          ["fechaprimerpago"]: today,
          ["fechaenganche"]: today,
        });


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
        let fecha = val.format("YYYY-MM-DD")
        if(field=="fechaprimerpago"){
          setFecha(val)
          setFormFormaDePago({
            ...formFormaDePago,
            ["fechaprimerpago"]: fecha,
          });

        }
        if(field=="fechaenganche"){
          setFechaEnganche(val)
          setFormFormaDePago({
            ...formFormaDePago,
            ["fechaenganche"]: fecha,
          });

        }

      }

      const closeModalCuentaNueva = ()=>{
        setModalCuentaNuevaFlag(false)
      }
      return (
        <Paper sx={{ height: 600, width: '100%' }}>
        <BasicModal open={modalCuentaNuevaFlag} handleClose={closeModalCuentaNueva} router={router} cuenta={cuenta}/>

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
    
            <Grid item xs={4}>
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
    
            <Grid item xs={4}>
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
            <Grid item xs={4}>
            <Button onClick={()=>{router.push(`inmuebles_disponibles`);}} variant="contained" color="primary" sx={{ marginTop: '20px' }}>
            Actualizar Precio
          </Button>
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
              disabled
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
                label="Precio"
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
          
            
            {/* <Grid item xs={4}>
              <TextField
                label="Pago mensual fijo"
                name="pagomensualfijo"
                value={formFormaDePago.pagomensualfijo || ''}
                onChange={handleChangeFormFormadePago}
                fullWidth
                margin="normal"
              />
            </Grid> */}

            
          </Grid>
    
          {/* Submit Button */}
          {flagBotonAmortizacion && (
             <Grid container spacing={2}>
            <Grid item xs={3}>
              <Button style={{backgroundColor:"#1976d2", color:"white"}} onClick={handle_genera_amortizacion} >
            Calcular tabla amortizacion
          </Button>
          </Grid>
          <Grid item xs={3}>
              <Button style={{backgroundColor:"#6c757d", color:"white"}} onClick={handle_genera_pagare} >
            Generar Pagare
          </Button>
          </Grid>
          <Grid item xs={3}>
              <Button style={{backgroundColor:"#6c757d", color:"white"}} onClick={handle_genera_contrato} >
            Generar Contrato
          </Button>
          </Grid> 
          <Grid item xs={3}>
              <Button style={{backgroundColor:"#198754", color:"white"}} onClick={handle_guardar_amortizacion_detalle} >
            Guardar y Crear Cuenta
          </Button>
          </Grid> 
          </Grid>
              
          )}
        </Box>

        </Box>
        </Paper>
      );
}

export default CuentaId