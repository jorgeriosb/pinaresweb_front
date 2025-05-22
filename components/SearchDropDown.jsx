import React, { useState } from "react";
import { Autocomplete, TextField, Button, Stack } from "@mui/material";


export default function SearchDropdown({records, placeHolder, value, handleSelect, label1='', label2='', label3=''}) {

  const formatLabel = (option)=>{
    return `${option[label1] ?? ""} ${option[label2] ?? ""} ${option[label3] ?? ""}`
  }

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Autocomplete
        options={records}
        getOptionLabel={(option) => {return formatLabel(option)}}
        isOptionEqualToValue={(option, value) => option.codigo === value?.codigo}
        value={value}
        onChange={(event, newValue) => handleSelect(newValue)}
        sx={{ width: '100%'}}
        renderInput={(params) => <TextField {...params} label={placeHolder} />}
      />
    </Stack>
  );
}