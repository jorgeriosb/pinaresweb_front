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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import {get_inmueble_id, get_inmuebles_disponibles} from "..//api/inmueble"
import ModalCambiarPrecio from "../../components/ModalCambiarPrecio"
import {update_inmueble_precio} from "../api/inmueble"





const renderCols =(router, handleOpenModal)=>{
  return [
    { field: 'id', headerName: 'codigo', width: 80 },
    { field: 'iden1', headerName: 'Manzana', width: 600 },
    { field: 'iden2', headerName: 'Lote', width: 130 },
    { field: 'fk_etapa', headerName: 'Etapa', width: 130 },
    {
      field: 'preciopormetro',
      headerName: 'Precio x M2',
      type: 'number',
      width: 200,
    },
    { field: 'superficie', headerName: 'Superficie', width: 130, type: 'number', },
    { field: 'precio', headerName: 'Precio', width: 130, type: 'number' },
    
    {
      
      field: 'acciones',
      headerName: 'acciones',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 240,
      renderCell: (params) => {
        return <div><Button onClick={()=>{handleOpenModal(params.id)}} style={{margin:"10px"}}><Tooltip title="Cambiar Precio" ><AttachMoneyIcon /></Tooltip></Button>
        </div>
        //return  <Button style={{backgroundColor:'#28a745'}} variant="contained" href={`/cliente/${params.row.cliente}`}>agregar cliente</Button>
  
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
  const [modelOpenPagoAnteriorFlag, setModelOpenPagoAnteriorFlag] = useState(false)
  const [inmueble, setInmueble] = useState(null)


  useEffect(() => {
    const get_data = async()=>{
      const val = await get_inmuebles_disponibles()
      const jval = await val.json()
      setRecords(jval)
    }
    get_data()
  }, [])

  const handleCambiarPrecio = async (payload)=>{
    console.log("aqui viendo el payload ", payload)
    let je = await update_inmueble_precio(payload)
    const val = await get_inmuebles_disponibles()
    const jval = await val.json()
    setRecords(jval)
    closeModalPagoAnterior()
    
  }

  const closeModalPagoAnterior = ()=>{
    setModelOpenPagoAnteriorFlag(false)
  }

  const handleOpenModal = (inmuebleID)=>{
    setInmueble(inmuebleID)
    setModelOpenPagoAnteriorFlag(true)

  }
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
      </Box>
      <ModalCambiarPrecio is_open={modelOpenPagoAnteriorFlag} handleClose={closeModalPagoAnterior} inmueble={inmueble} handlePost={handleCambiarPrecio}/>

      <DataGrid
        rows={records}
        columns={renderCols(router, handleOpenModal)}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
