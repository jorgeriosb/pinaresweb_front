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
  


const headers = ['year', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Total'];

const columns = headers.map((header) => ({
  field: header,
  headerName: header,
  width: header === 'year' ? 100 : 90,
}));


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Resumen
      </Typography>
      <Box style={{height:"700px"}}>
      <DataGrid
        rows={[]}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      </Box>
      
      

    </Container>
  );
};

export default ClienteForm;
