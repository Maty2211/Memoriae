import React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function MySwitch({name, checked, onChange }) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={(e) =>
            onChange({ target: { name, value: e.target.checked } })
          }
            sx={{
              '& .Mui-checked': {
                color: '#a311ebff', // color del thumb activo
              },
              '& .Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#5407f8ff', // color del track activo
              },
            }}

        />
      }

      sx={{ color: 'black', mb: 2 }}
    />
  );
}
