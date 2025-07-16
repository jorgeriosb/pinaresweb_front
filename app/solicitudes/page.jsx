"use client"; // This is a client component 👈🏽
import * as React from 'react';
import { DataGrid} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { TextField, Grid, Container, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Link from 'next/link'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import RouterButton from "../../components/RouterButton"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentsIcon from '@mui/icons-material/Payments';
import Tooltip from '@mui/material/Tooltip';
import {getClientes_cuenta} from "../api/cuenta"
import {get_solicitud_all} from "../api/solicitud"

import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // idioma español

dayjs.locale('es'); // establecer español como global




const renderCols =(router)=>{
  return [
    { field: 'id', headerName: 'Cuenta', width: 80 },
    { field: 'proveedor', headerName: 'Proveedor', width: 600 },
    { field: 'departamento', headerName: 'Departamento', width: 130 },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      type: 'number',
      width: 150,
    },
    
    {
          field: 'fechapago',
          headerName: 'Fecha De Pago',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 250,
          valueFormatter: (params) => {
            let date = new Date(params)
            return dayjs(date).format('DD [de] MMMM [de] YYYY')},
        },
    {
      field: 'acciones',
      headerName: 'acciones',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 240,
      renderCell: (params) => {
        return <div><Button href={`/solicitud/${params.row.id}`} style={{margin:"10px"}}><Tooltip title="Ver Solicitud" ><EditIcon /></Tooltip></Button>
        </div>  
      }
      //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ]
} 








const paginationModel = { page: 0, pageSize: 50 };

export default function DataTable() {
  const router = useRouter()
  useAuth();
  const [records, setRecords] = useState([])

  useEffect(() => {
    const get_data = async()=>{
      let response = await get_solicitud_all()
      response = await response.json()
      setRecords(response)
    }
    get_data()
  }, [])
  return (
    <Paper sx={{ height: 600, width: '100%' }}>
        <Typography variant="h4" gutterBottom>
                Solicitudes De Pago
              </Typography>
       <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DataGrid
        disableRowSelectionOnClick
        checkboxSelection
        style={{height:"400px"}}
        rows={records}
        columns={renderCols(router)}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        //slots={{ toolbar: GridToolbar }}
        onRowSelectionModelChange={(newSelection) => {
          console.log("viendo esto ", newSelection)
          //setSelectedIds(newSelection);
        }}
      />
      </LocalizationProvider>
    </Paper>
  );
}
