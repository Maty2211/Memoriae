import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function MyTextForm({ label, value, name, onChange, error, helperText }) {
  return (
    <TextField
      id="outlined-basic"
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      name={name}
      error={error}
      helperText={helperText}
      fullWidth
      sx={{
        // Color del texto que se escribe
        input: { color: 'white' },
        // Color del label
        label: { color: 'white' },
        // Color de fondo del input
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#161b33',
          '& fieldset': { borderColor: 'white' }, // borde del input
          '&:hover fieldset': { borderColor: 'black' }, // borde al pasar el mouse
          '&.Mui-focused fieldset': { borderColor: 'ligthblue' }, // borde al enfocar
        },
      }}
    />
  );
}

