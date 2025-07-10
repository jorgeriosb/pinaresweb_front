"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Container, Box} from '@mui/material';
import {get_resumen2, get_resumen_inmuebles_fecha} from "../api/resument"
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


  useEffect(()=>{
    let get_data = async ()=>{
      console.log("aqui")
      let val = await get_resumen2()
      let jval = await val.json()
      setData(jval["data"])
      setLoading(false);
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
          { field: 'month', headerName: 'Fecha',type: 'String', width: 200 },
          { field: 'count', headerName: 'Cantidad',type: 'number', width: 200,
            renderCell: (params) => {
              return <div><Link href="#" onClick={()=>{handle_get_items_fecha(params.row.month)}}>{params.row.count}</Link></div>
            }
           },
        ]
  
  }

  const columsInmueble =()=>{
    return [
        { field: 'id', headerName: 'codigo', width: 100 },
        { field: 'iden1', headerName: 'Manzana',type: 'String', width: 50 },
        { field: 'iden2', headerName: 'Lote',type: 'String', width: 50,},
        { field: 'condominio', headerName: 'Etapa',type: 'String', width: 200,},
        {
          field: 'fechadeventa',
          headerName: 'Fecha De Venta',
          type: 'number',
          width: 200,
          valueFormatter: (params) => {
            let date = new Date(params)
            return dayjs(date).format('DD [de] MMMM [de] YYYY')},
        },
        { field: 'superficie', headerName: 'Superficie',type: 'Number', width: 200,},
        { field: 'preciopormetro', headerName: 'Precio x M2',type: 'Number', width: 200,},
        { field: 'precio', headerName: 'Precio',type: 'Number', width: 200,},

      ]

}
const headers = ['year', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Total'];

const columns = headers.map((header) => ({
  field: header,
  headerName: header === "year" ? "Año" : header,
  width: header === 'year' ? 100 : 90,
}));


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Resumen
      </Typography>
      <Box style={{height:"700px"}}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      </Box>
      
      

    </Container>
  );
};

export default ClienteForm;
