"use client";
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import {submitLogin} from "../api/auth"
import { useRouter } from 'next/navigation';


const LoginPage = ()=>{
    const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!usuario || !password) {
      setError('Both fields are required');
    } else {
      setError('');
      // You can proceed with the form submission logic, e.g., send data to an API
      console.log('Form submitted:', { usuario, password });
      const response = await submitLogin(usuario, password)
      console.log("viendo response", response)
      localStorage.setItem('token', response["access_token"]);
      router.push("/cliente");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '300px',
        margin: 'auto',
        padding: '20px',
        boxShadow: 3,
        borderRadius: 1,
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" gutterBottom>
        Inicia Sesion
      </Typography>

      {error && (
        <Typography color="error" variant="body2" sx={{ marginBottom: '10px' }}>
          {error}
        </Typography>
      )}

      <TextField
        label="Usuario"
        variant="outlined"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        fullWidth
        required
        sx={{ marginBottom: '10px' }}
      />

      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        sx={{ marginBottom: '20px' }}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ width: '100%' }}
      >
        Login
      </Button>
    </Box>
  );
}

export default LoginPage