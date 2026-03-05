"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from 'react';

import { Button, TextField, Grid, Container, Box} from '@mui/material';
import {get_resumen2, get_resumen_inmuebles_fecha} from "../api/resument"
import {get_saldos, get_saldos_vencidos} from "../api/saldos"
import {get_cuentas_vencidas} from "../api/cuenta"
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, CircularProgress, IconButton, Collapse
} from "@mui/material";
import { DataGrid, GridToolbar} from '@mui/x-data-grid';
import Link from '@mui/material/Link';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // idioma español
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";


dayjs.locale('es'); // establecer español como global

function Row({ label, value, cuentas }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          {cuentas && cuentas.length > 0 && (
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          )}
          {label}
        </TableCell>
        <TableCell>{value}</TableCell>
      </TableRow>

      {cuentas && cuentas.length > 0 && (
        <TableRow>
          <TableCell colSpan={2} sx={{ p: 0 }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Cuentas
                </Typography>

                <Table size="small">
                  <TableBody>
                    {cuentas.map((c) => (
                      <TableRow key={c.cuenta}>
                        <TableCell>{c.cuenta}</TableCell>
                        <TableCell>{c.nombre}</TableCell>
                        <TableCell>{c.saldo}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

const ClienteForm = () => {

  const [goodData, setGoodData] = useState([])

  const [saldosVencidos, setSaldosVencidos] = useState([])
  const [cuentasVencidas, setCuentasVencidas] = useState([])

  useEffect(()=>{
    const get_data = async()=>{
      console.log("entrando")
      let val = await get_saldos()
      let jval = await val.json()
      let vencidos = await get_saldos_vencidos()
      let jvencidos = await vencidos.json()
      setGoodData(jval)
      setSaldosVencidos(jvencidos)
      let cuentas_vencidas = await get_cuentas_vencidas()
      let jcuentas_vencidas = await cuentas_vencidas.json()
      setCuentasVencidas(jcuentas_vencidas)
    }
    get_data()
  },[])


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Saldos
      </Typography>
      <Box style={{height:"400px"}}>
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

      <Typography variant="h4" >
        Saldos Vencidos
      </Typography>
      <Box style={{height:"700px"}}>
      <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {Object.entries(saldosVencidos).map(([key, value]) => (
        <Row
          key={key}
          label={key}
          value={value}
          cuentas={cuentasVencidas[key] || []}
        />
      ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Box>
      
      

    </Container>
  );
};

export default ClienteForm;
