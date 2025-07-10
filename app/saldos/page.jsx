"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from 'react';

import { Button, TextField, Grid, Container, Box} from '@mui/material';
import {get_resumen2, get_resumen_inmuebles_fecha} from "../api/resument"
import {get_saldos} from "../api/saldos"
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


const data = {
  cliente: 'Juan Pérez',
  contrato: 'ABC123',
  monto: '$10,000',
  fecha: '2025-07-09'
};

const ClienteForm = () => {

  const [goodData, setGoodData] = useState([])

  useEffect(()=>{
    const get_data = async()=>{
      console.log("entrando")
      let val = await get_saldos()
      let jval = await val.json()
      setGoodData(jval)
    }
    get_data()
  },[])


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Saldos
      </Typography>
      <Box style={{height:"700px"}}>
      <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {Object.entries(goodData).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell variant="head">{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
      
      

    </Container>
  );
};

export default ClienteForm;
