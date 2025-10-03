import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';

export default function MyTimePicker({name, value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
      format="HH:mm"
      ampm={false}
        value={value}
        onChange={(newValue) =>
          onChange({ target: { name, value: newValue } })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
          />
        )}
        slotProps={{
          textField: {
            fullWidth: true,
            InputProps: {
              sx: {
                color: 'white', // texto al escribir
                backgroundColor: '#161b33', // fondo del input
                '& fieldset': { borderColor: 'white' }, // borde del input
                '&:hover fieldset': { borderColor: 'white' }, // borde al pasar el mouse
                '&.Mui-focused fieldset': { borderColor: 'white' }, // borde al enfocar
              }
            },
            InputLabelProps: {
              sx: { color: 'white' } // label
            },
            sx: {
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'white' }, // borde normal
              }
            }
          }
        }}
      />
    </LocalizationProvider>
  );
}
