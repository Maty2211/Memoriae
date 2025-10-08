import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import "dayjs/locale/es"; 

dayjs.locale("es");

export default function MyDatePickerForm({value, name, onChange }) {

  const handleChange = (newDate) => {
    onChange({ target: { name: name, value: dayjs(newDate) } });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DatePicker

       /* format="LL" */
       format="ddd D MMM"
        value={value}
        onChange={handleChange}
        name={name}
        slotProps={{
          textField: {
            fullWidth: true,
            InputProps: {
              sx: {
                width: 170,
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
