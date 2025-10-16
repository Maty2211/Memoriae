import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import multiMonthPlugin from '@fullcalendar/multimonth'
import interactionPlugin from '@fullcalendar/interaction';
import "./estilos/Calendar.css"; 
import esLocale from '@fullcalendar/core/locales/es';


const MyCalendar1 = ({myEvents, dayClick, eventClick, mini = false, mini2 = false}) => {

    return (
      
    <FullCalendar
      plugins={[ dayGridPlugin , listPlugin, timeGridPlugin, multiMonthPlugin, interactionPlugin]}
      initialView={mini2 ? "listMonth" : "dayGridMonth"}
      events={myEvents}
      eventBackgroundColor={'#474973'}
      eventBorderColor={'#474973'}
      dateClick={dayClick}
      eventClick={eventClick}
      timeZone='UTC'
      /*headerToolbar = {{
        right: 'prev next  timeGridWeek dayGridMonth multiMonthYear',
        left: 'title',
        center: ''
      }}*/
      /*headerToolbar={
         mini
           ? { left: "title", center: "", right: " listMonth dayGridMonth" } // 👈 sin prev/next en mini
           : { right: 'prev next  listMonth dayGridMonth multiMonthYear', left: 'title', center: ''}
      }*/
      headerToolbar={
        mini
          ? { left: "title", center: "", right: "prev next dayGridMonth" } // mini
          : mini2
            ? { left: "title", center: "", right: "prev next listMonth" } // mini2
            : { right: "prev next listMonth dayGridMonth multiMonthYear", left: "title", center: "" } // normal
      }
      locale={esLocale}

      titleFormat={{
      month: 'short',
      year: 'numeric',
      }}

      listDayFormat={{ weekday: 'long', day: 'numeric' }} 
      listDaySideFormat={false} // quita la columna lateral
      
      dayMaxEvents={mini ? 1 : 3} 
     
      moreLinkClick="popover" 
      height="auto" 
    
         
    />
    );
};

export default MyCalendar1