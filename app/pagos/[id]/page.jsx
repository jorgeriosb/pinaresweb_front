"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'



import {get_cuenta_documentos} from "../../api/cuenta"
import {get_documento_movimientos, crear_documento_pago_anterior} from "../../api/documento"

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
import MyModal from "../../../components/MyModal"

const renderCols =(router, getMovimientos, modalPagoAterior)=>{
  return [
    { field: 'id', headerName: 'Documento', width: 100 },
    { field: 'cargo', headerName: 'Cargo',type: 'number', width: 150 },
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
      width: 250,
      //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    {
      field: 'acciones',
      headerName: 'acciones',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 340,
      renderCell: (params) => {
        return <div><Button style={{margin:"10px"}} onClick={()=>{getMovimientos(params.row.id)}}><Tooltip title="Ver Movimientos" >Movimientos</Tooltip></Button>
        <span style={{margin:"10px"}}><Button style={{color:"green"}} onClick={()=>{router.push(``);}}><Tooltip title="Pagar al Documento">Pagar</Tooltip></Button></span>
        {params.row.saldo > 0 ?  (<span style={{margin:"10px"}}><Button style={{color:"orange"}} onClick={()=>{modalPagoAterior(params.row.id);}}><Tooltip title="Hacer pago Anterior">Pago <br/>Anterior</Tooltip></Button>
        </span>): ""}
       </div>
  
      }
    }
    
  ]
}

const columsMovimientos =()=>{
    return [
        { field: 'id', headerName: 'Movimiento', width: 100 },
        { field: 'cargoabono', headerName: 'C/A',type: 'number', width: 50 },
        { field: 'cantidad', headerName: 'Cantidad',type: 'number', width: 130 },
        {
            field: 'fecha',
            headerName: 'Fecha',
            type: 'number',
            width: 200,
          },
        {
          field: 'fechavencimientodoc',
          headerName: 'Fecha de Vencimiento',
          type: 'number',
          width: 200,
        },
        {
          field: 'numrecibo',
          headerName: 'Recibo',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 250,
          //valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
        // {
        //   field: 'acciones',
        //   headerName: 'acciones',
        //   description: 'This column has a value getter and is not sortable.',
        //   sortable: false,
        //   width: 240,
        //   renderCell: (params) => {
        //     return <div><Button style={{margin:"10px"}} onClick={()=>{getMovimientos(params.row.id)}}><Tooltip title="Ver Movimientos" >Movimientos</Tooltip></Button>
        //     <span style={{margin:"10px"}}><Button style={{color:"green"}} onClick={()=>{router.push(``);}}><Tooltip title="Pagar al movimiento">Pagar</Tooltip></Button>
        //     </span></div>
        //     //return  <Button style={{backgroundColor:'#28a745'}} variant="contained" href={`/cliente/${params.row.cliente}`}>agregar cliente</Button>
      
        //   }
        // }
        
      ]

}


const paginationModel = { page: 0, pageSize: 50 };

const PagosId = ()=>{
    const router = useRouter()
    const [records, setRecords] = useState([])
    const [movimientos, setMovimientos] = useState([])
    const [selectedDocumento, setSelectedDocumento] = useState(null)
    const [modelOpenPagoAnteriorFlag, setModelOpenPagoAnteriorFlag] = useState(false)
    const params = useParams()
    const [pagoAnteriorId, setPagoAnteriorId] = useState(null)
    useEffect(()=>{
        const get_pagos = async ()=>{
            const val = await get_cuenta_documentos(params["id"])
            const rval = await val.json()
            setRecords(rval)
        }
        get_pagos()
    },[])

    const getMovimientos = async (documento_id)=>{
        console.log("esto ", documento_id)
        const val = await get_documento_movimientos(documento_id)
        const rval = await val.json()
        setMovimientos(rval)

    }

    const modalPagoAterior = (id)=>{
        console.log("pago anterior")
        setPagoAnteriorId(id)
        setModelOpenPagoAnteriorFlag(true)
    }
    const closeModalPagoAnterior = ()=>{
        setModelOpenPagoAnteriorFlag(false)
    }

    const handleCrearPagoAnterior =async (id, payload)=>{
        const val = await crear_documento_pago_anterior(id, payload)
        const rval = await val.json()
        console.log("viendo el rval")
        console.log(rval)
        closeModalPagoAnterior()
        const docs = await get_cuenta_documentos(params["id"])
        const rdocs = await docs.json()
        setRecords(rdocs)
        setMovimientos([])
    }
    return (
        <Paper sx={{ height: 600, width: '100%' }}>
            <MyModal is_open={modelOpenPagoAnteriorFlag} handleClose={closeModalPagoAnterior} documento={pagoAnteriorId} handlePost={handleCrearPagoAnterior}/>
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
        disableRowSelectionOnClick
        checkboxSelection
        style={{height:"400px"}}
        rows={records}
        columns={renderCols(router, getMovimientos, modalPagoAterior)}
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
        disableRowSelectionOnClick
        checkboxSelection
        style={{height:"400px"}}
        rows={movimientos}
        columns={columsMovimientos(router)}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        slots={{ toolbar: GridToolbar }}
      />
    </Paper>
    )
}


export default PagosId