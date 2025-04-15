"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'



import {get_cuenta_documentos} from "../../api/cuenta"
import {get_documento_movimientos, crear_documento_pago_anterior, pagar_documentos_varios} from "../../api/documento"
import {get_gixamortizacion} from "../../api/gixamortizacion"
import {get_recibo} from "../../api/recibo"

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
import Checkbox from '@mui/material/Checkbox';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



//import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import MyModal from "../../../components/MyModal"
import ModalPagarVarios from "../../../components/ModalPagarVarios"
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // idioma español

dayjs.locale('es'); // establecer español como global


const renderCols =(router, getMovimientos, modalPagoAterior, handleCheckMultiplePayment)=>{
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
      valueFormatter: (params) => dayjs(params.value).format('DD [de] MMMM [de] YYYY'),
    },
    {
      field: 'acciones',
      headerName: 'acciones',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 340,
      renderCell: (params) => {
        if(params.row.id == 36712){
            console.log(params.row.id)
            console.log(params.row.cargo > params.row.abono && params.row.saldo >0)
            console.log(params.row.cargo, " ", params.row.abono)
        }
        return <div><Button style={{margin:"10px"}} onClick={()=>{getMovimientos(params.row.id)}}><Tooltip title="Ver Movimientos" >Movimientos</Tooltip></Button>
        {/* {params.row.cargo > parseFloat(params.row.abono).toFixed(2) && params.row.saldo >0 ? (<span style={{margin:"10px"}}><Button style={{color:"green"}} onClick={()=>{router.push(``);}}><Tooltip title="Pagar al Documento">Pagar</Tooltip></Button></span>): ""} */}
        {params.row.cargo > parseFloat(params.row.abono).toFixed(2) && params.row.saldo >0 ? (<span style={{margin:"10px"}}><Checkbox onChange={(e)=>{handleCheckMultiplePayment(e, params.row)}} label={"Pagar"}  />Pagar</span>): ""}

        {params.row.cargo > parseFloat(params.row.abono).toFixed(2) && params.row.saldo >0 ?  (<span style={{margin:"10px"}}><Button style={{color:"orange"}} onClick={()=>{modalPagoAterior(params.row.id);}}><Tooltip title="Hacer pago Anterior">Pago <br/>Anterior</Tooltip></Button>
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
            valueFormatter: (params) => dayjs(params.value).format('DD [de] MMMM [de] YYYY'),
          },
        {
          field: 'fechavencimientodoc',
          headerName: 'Fecha de Vencimiento',
          type: 'number',
          width: 200,
          valueFormatter: (params) => params ? dayjs(params.value).format('DD [de] MMMM [de] YYYY') : null,
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
    const [selectedPagoDocumentos, setSelectedPagoDocumentos] = useState([])
    const [botonPagar, setBotonPagar] = useState(false)
    const [records, setRecords] = useState([])
    const [movimientos, setMovimientos] = useState([])
    const [selectedDocumento, setSelectedDocumento] = useState(null)
    const [modelOpenPagoAnteriorFlag, setModelOpenPagoAnteriorFlag] = useState(false)
    const [modalPagarVariosFlag, setModalPagarVariosFlag] = useState(false)
    const params = useParams()
    const [pagoAnteriorId, setPagoAnteriorId] = useState(null)
    const [saldos, setSaldos] = useState({})
    const [gixamortizacion, setGixAmortizacion] = useState({})

    const carga_info = async ()=>{
      const val = await get_cuenta_documentos(params["id"])
      const rval = await val.json()
      setRecords(rval)
      const cargo = rval.reduce(
          (accumulator, currentValue) => accumulator + currentValue.cargo ,
          0,
      );
      const abono = rval.reduce(
          (accumulator, currentValue) => accumulator + currentValue.abono ,
          0,
      );
      const saldo = rval.reduce(
          (accumulator, currentValue) => accumulator + currentValue.saldo ,
          0,
      );
      
      const  fcargo= new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          cargo,
      )
      const fabono = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          abono,
      )
      const fsaldo = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(
          saldo,
      )
      setSaldos({cargo:fcargo, abono:fabono, saldo:fsaldo})

      const valamortizacion = await get_gixamortizacion(params["id"])
      const ramortizacion = await valamortizacion.json()
      setGixAmortizacion(ramortizacion)
  }
    useEffect(()=>{
        
      carga_info()
    },[])

    const getMovimientos = async (documento_id)=>{
        console.log("esto ", documento_id)
        const val = await get_documento_movimientos(documento_id)
        const rval = await val.json()
        setSelectedDocumento(documento_id)
        setMovimientos(rval)

    }

    const modalPagoAterior = (id)=>{
        setPagoAnteriorId(id)
        setModelOpenPagoAnteriorFlag(true)
    }
    const closeModalPagoAnterior = ()=>{
        setModelOpenPagoAnteriorFlag(false)
    }

    const closeModalPagosVarios = ()=>{
      setModalPagarVariosFlag(false)
    }

    const openPagarVarios = ()=>{
      setModalPagarVariosFlag(true)
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

    const handleCheckMultiplePayment = (e, record)=>{
      if(e.target.checked){
        if(!selectedPagoDocumentos.includes(record)){
          setSelectedPagoDocumentos(prev => [...prev, record]);
        }
      }
      if(!e.target.checked){
        if(selectedPagoDocumentos.includes(record)){
          setSelectedPagoDocumentos(prev => prev.filter(item => item !== record));
        }
      }
      
    }

    const handlePagardocsVarios = async(payload)=>{
      let val = await pagar_documentos_varios(payload)
      let jval = await val.json()
      if (jval["status"]=== "good"){
        closeModalPagosVarios()
        carga_info()
        let numrecibo = jval["recibo"]
        let recibo = await get_recibo(numrecibo)
        const blob = await recibo.blob();

        // Create a temporary URL and download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        // Set the filename for download
        link.download = 'document.pdf';
        document.body.appendChild(link);
        link.click();

        // Clean up
        link.remove();
        window.URL.revokeObjectURL(url);
            //falta descargar el recibo pdf
      }
    }
    return (
        <Paper sx={{ height: 600, width: '100%' }}>
            <MyModal is_open={modelOpenPagoAnteriorFlag} handleClose={closeModalPagoAnterior} documento={pagoAnteriorId} handlePost={handleCrearPagoAnterior}/>
            <ModalPagarVarios is_open={modalPagarVariosFlag} handleClose={closeModalPagosVarios} documentos={selectedPagoDocumentos} handlePost={handlePagardocsVarios} tasainteresanual={gixamortizacion["tasainteresanual"]}/>
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
      <Grid container spacing={2}>
        <Grid size={12}>
          <div style={{textAlign:"center", fontWeight:"bold"}}>Documentos   {selectedPagoDocumentos.length>0 && <span style={{marginLeft:"200px"}}><Button variant="contained" onClick={()=>{openPagarVarios()}}>Pagar</Button></span> }
          </div>
        </Grid>
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DataGrid
        disableRowSelectionOnClick
        checkboxSelection
        style={{height:"400px"}}
        rows={records}
        columns={renderCols(router, getMovimientos, modalPagoAterior, handleCheckMultiplePayment)}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        slots={{ toolbar: GridToolbar }}
        onRowSelectionModelChange={(newSelection) => {
          console.log("viendo esto ", newSelection)
          //setSelectedIds(newSelection);
        }}
      />
      </LocalizationProvider>
      <div style={{marginTop:"20px"}}></div>
      <Grid container spacing={2}>
        <Grid size={12}>
          <div style={{textAlign:"left", fontWeight:"bold"}}>Cargo: <span style={{color:"green"}}>{saldos.cargo}</span> Abono:<span style={{color:"#267f9c"}}>{saldos.abono}</span> Saldo:{saldos.saldo} {selectedDocumento}</div>
        </Grid>
        </Grid>
      <Grid container spacing={2}>
        <Grid size={12}>
          <div style={{textAlign:"center", fontWeight:"bold"}}>Movimientos, Documento {selectedDocumento}</div>
        </Grid>
        </Grid>
        <div style={{marginBottom:"20px"}}></div>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
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
      </LocalizationProvider>
    </Paper>
    )
}


export default PagosId