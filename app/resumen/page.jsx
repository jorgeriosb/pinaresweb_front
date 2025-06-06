"use client"; // This is a client component 👈🏽
import React, { useState } from 'react';
import { Button, TextField, Grid, Container, Typography } from '@mui/material';

const ClienteForm = () => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to backend)
    console.log('Form data submitted:', formData);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Resumen
      </Typography>

    </Container>
  );
};

export default ClienteForm;
