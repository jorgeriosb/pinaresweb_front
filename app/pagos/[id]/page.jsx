"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'



import {get_cuenta_documentos} from "../../api/cuenta"

import { DataGrid, GridToolbar} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { TextField,Container, Typography } from '@mui/material';
import Link from 'next/link'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentsIcon from '@mui/icons-material/Payments';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid2';

//import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

const renderCols =(router)=>{
  return [
    { field: 'id', headerName: 'Codigo', width: 80 },
    { field: 'cargo', headerName: 'Cargo',type: 'number', width: 600 },
    { field: 'abono', headerName: 'Abono',type: 'number', width: 130 },
    {
      field: 'saldo',
      headerName: 'Saldo',
      type: 'number',
      width: 200,
    },
    {
      field: 'fechadevencimiento',
      headerName: 'Fecha de vencimiento',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 120,
      //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    // {
    //   field: 'acciones',
    //   headerName: 'acciones',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 240,
    //   renderCell: (params) => {
    //     return <div><Button href={`/cliente/${params.row.cliente}`} style={{margin:"10px"}}><Tooltip title="Ver Cliente" ><EditIcon /></Tooltip></Button>
    //     <span style={{margin:"10px"}}><Button onClick={()=>{router.push(`/cuenta/${params.row.cuenta}`);}}><Tooltip title="Ver Cuenta Cliente"><AccountBalanceIcon /></Tooltip></Button>
    //     </span><span style={{margin:"10px"}}><Button onClick={()=>{router.push(`/pagos/${params.row.cuenta}`);}}><Tooltip title="Ver Pagos"><PaymentsIcon /></Tooltip></Button></span></div>
    //     //return  <Button style={{backgroundColor:'#28a745'}} variant="contained" href={`/cliente/${params.row.cliente}`}>agregar cliente</Button>
  
    //   }
    //   //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // },
  ]
} 


const paginationModel = { page: 0, pageSize: 50 };

const PagosId = ()=>{
    const router = useRouter()
    const [records, setRecords] = useState([])
    const [movimientos, setMovimientos] = useState([])
    const [selectedDocumento, setSelectedDocumento] = useState(null)
    const params = useParams()
    useEffect(()=>{
        const get_pagos = async ()=>{
            const val = await get_cuenta_documentos(params["id"])
            const rval = await val.json()
            setRecords(rval)
        }
        get_pagos()
    },[])
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
        {/* <Button style={{backgroundColor:'#28a745'}} variant="contained" href={`/cliente/nuevo`}>agregar cliente</Button> */}
      </Box>
      <Grid container spacing={2}>
        <Grid size={12}>
          <div style={{textAlign:"center", fontWeight:"bold"}}>Documentos</div>
        </Grid>
        </Grid>
      <DataGrid
        checkboxSelection
        style={{height:"400px"}}
        rows={records}
        columns={renderCols(router)}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        slots={{ toolbar: GridToolbar }}
      />
      <div style={{marginTop:"20px"}}></div>
      <Grid container spacing={2}>
        <Grid size={12}>
          <div style={{textAlign:"center", fontWeight:"bold"}}>Movimientos</div>
        </Grid>
        </Grid>
        <div style={{marginBottom:"20px"}}></div>
      <DataGrid
        checkboxSelection
        style={{height:"400px"}}
        rows={records}
        columns={renderCols(router)}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        slots={{ toolbar: GridToolbar }}
      />
    </Paper>
    )
}


export default PagosId