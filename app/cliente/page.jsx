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




//`/cliente/${params.id}`

const   cols = [
  { field: 'nombre', headerName: 'Nombre', width: 600 },
  { field: 'cuenta', headerName: 'Cuenta', width: 130 },
  {
    field: 'saldo',
    headerName: 'Saldo',
    type: 'number',
    width: 200,
  },
  {
    field: 'manzana',
    headerName: 'Manzana',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'lote',
    headerName: 'Lote',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'acciones',
    headerName: 'acciones',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    renderCell: (params) => {
      return <div><Button href={`/cliente/${params.row.cliente}`} style={{margin:"10px"}}><Tooltip title="Ver Cliente" ><EditIcon /></Tooltip></Button><span style={{margin:"10px"}}><Tooltip title="Ver Cuenta Cliente"><AccountBalanceIcon /></Tooltip></span><span style={{margin:"10px"}}><Tooltip title="Ver Pagos"><PaymentsIcon /></Tooltip></span></div>
      //return  <Button style={{backgroundColor:'#28a745'}} variant="contained" href={`/cliente/${params.row.cliente}`}>agregar cliente</Button>

    }
    //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
]








const paginationModel = { page: 0, pageSize: 50 };

export default function DataTable() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    const get_data = async()=>{
      let response = await fetch('http://127.0.0.1:5000/clientes')
      response = await response.json()
      setRecords(response)
    }
    get_data()
  }, [])
  return (
    <Paper sx={{ height: 600, width: '100%' }}>
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
        <Button style={{backgroundColor:'#28a745'}} variant="contained" href={`/cliente/nuevo`}>agregar cliente</Button>
      </Box>
      <DataGrid
        rows={records}
        columns={cols}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
