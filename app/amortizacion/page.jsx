"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Container, Box} from '@mui/material';
import {get_resumen, get_resumen_inmuebles_fecha} from "../api/resument"
import {get_amortizaciones_sincuenta} from "../api/amortizacion"
import {get_clientes, get_cliente_id} from "../api/cliente"
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, CircularProgress
} from "@mui/material";
import { DataGrid, GridToolbar} from '@mui/x-data-grid';
import Link from '@mui/material/Link';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // idioma español

dayjs.locale('es'); // establecer español como global




const ClienteForm = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inmuebles, setInmuebles] = useState([]);
  const [sectedDate, setSelectedDate] = useState("");
  const [clientes, setClientes] = useState([])


  useEffect(()=>{
    let get_data = async ()=>{
      console.log("aqui")
      let val = await get_amortizaciones_sincuenta()
      let jval = await val.json()
      setData(jval)
     
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to backend)
    console.log('Form data submitted:', formData);
  };

  const handle_get_items_fecha = async (fecha)=>{
    console.log("fecha", fecha)
    setSelectedDate(fecha)
    let val = await get_resumen_inmuebles_fecha(fecha)
    let jval = await val.json()
    setInmuebles(jval["data"])
  }

  const columsMovimientos =()=>{
      return [
          //{ field: 'id', headerName: 'codigo', width: 100 },
          { field: 'pkamortizacion', headerName: 'Contrato',type: 'String', width: 400,
            renderCell: (params) => {
              return <div><Link href={`contrato/${params.row.pkamortizacion}`}>{params.row.pkamortizacion}</Link></div>
            }
           },
          { field: 'cliente.nombre', headerName: 'Nombre',type: 'String', width: 400,
            renderCell: (params) => {
              return <div>{params.row.cliente.nombre}</div>
            }
           },
           { field: 'cliente.lote', headerName: 'Lote',type: 'String', width: 400,
            renderCell: (params) => {
              return <div>Manzana: {params.row.inmueble.iden1} Lote: {params.row.inmueble.iden2}</div>
            }
           },
        ]
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Contratos Sin Cuenta
      </Typography>
      <Box style={{height:"400px"}}>
      <DataGrid
              disableRowSelectionOnClick
              //checkboxSelection
              style={{height:"400px"}}
              rows={data}
              columns={columsMovimientos()}
              //initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0 }}
              slots={{ toolbar: GridToolbar }}
            />
      </Box>
      
      
      

    </Container>
  );
};

export default ClienteForm;
