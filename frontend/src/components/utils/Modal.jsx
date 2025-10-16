import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MyDatePickerForm from '../calendar/MyDatePicker';
import MyTextForm from '../calendar/MyTextForm';
import MyButton from '../calendar/MyButton';
import MySwitch from '../calendar/MySwitch';
import MyTimePicker from '../calendar/MyTimePicker';
import { createEvent , deleteEvent, updateEvent } from '../../api/evento.api';
import dayjs from 'dayjs';
import { all } from 'axios';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #161b33',
  boxShadow: 24,
  p: 4,
  backgroundColor: '#161b33',
  
};

export default function DateModal({open, handleClose, myDate, formData, handleChange}) {
  

  const [submitted, setSubmitted] = React.useState(false);

  const subir = (event) => {

    event.preventDefault()
    setSubmitted(true);
    

    if (formData.id) {

      updateEvent(formData.id, {
        title: formData.title,
        start: formData.start.format('YYYY-MM-DDTHH:mm:ss'),
        end: formData.end.format('YYYY-MM-DDTHH:mm:ss'),
        allDay: formData.allDay,
      }).then(() => window.location.reload());
    } else {
      createEvent({
        title: formData.title,
        start: formData.start.format('YYYY-MM-DDTHH:mm:ss'),
        end: formData.end.format('YYYY-MM-DDTHH:mm:ss'),
        allDay: formData.allDay,
      }).then(() => window.location.reload());
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
  <Box sx={style}>
 
    <Typography
      id="modal-modal-description" 
      component="div"   
      sx={{ mt: 2 }}
      >


    <form onSubmit={subir}>
      
      <Box sx={{marginBottom:'15px'}}>
        <MyTextForm
        label={'Título'}
        name={'title'}
        value={formData.title}
        onChange={handleChange}
        error={submitted && !formData.title}
        helperText={submitted && !formData.title ? "El título es obligatorio" : ""}
        />
      </Box>


      <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="body1" sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
        <AccessTimeOutlinedIcon  /> Todo el día
      </Typography>

       <MySwitch
        name={'allDay'}
        value={formData.allDay}
        checked={formData.allDay || false}
        onChange={handleChange}
       />
      </Box>

      <Box display="flex"gap={0.5} marginBottom={2} marginTop={2}>
       <MyDatePickerForm
        name={'start'}
        value={formData.start}
        onChange={handleChange}
       />

      {!formData.allDay && (
        <Typography marginTop={9} gap={2} color='white' fontSize={20} textAlign={'center'}>
        →
        </Typography>
      )}

      {formData.allDay && (
        <Typography  p={1} marginBottom={5} display="flex" color='white' fontSize={20} textAlign={'center'}>
        
        </Typography>
      )}

       <MyDatePickerForm
        name={'end'}
        value={formData.end}
        onChange={handleChange}
       />

      </Box>
      {!formData.allDay && (
        <Box 
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={9}
          marginBottom={3}
          marginTop={1} 
        >
        <MyTimePicker 
          name={'start'}
          value={formData.start}
          onChange={handleChange}
         />
        <MyTimePicker
          name={'end'}
          value={formData.end}
          onChange={handleChange}
          />
          </Box>
      )}

      <Box >
       <MyButton
        label={'Guardar'}
        name={'cargar'}
        type={'submit'}
       />
     </Box>

      {formData.id && (
        <Box marginTop={2}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              deleteEvent(formData.id).then(() => window.location.reload());
            }}
          >
            Eliminar
          </Button>
        </Box>
      )}


     </form>
    </Typography>
  </Box>
  </Modal>
  </div>
  );
} 
