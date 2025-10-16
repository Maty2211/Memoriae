import {React, useEffect, useState} from 'react'
import MyCalendar1 from './MyCalendar1'
import { getAllEvents, getEvent } from '../../api/evento.api'
import DateModal from '../utils/Modal'
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Link } from "react-router-dom";

dayjs.extend(utc); 

const Calendar1 = ({ mini = false, mini2 = false, onNavigate }) => {

    const handleEventClick = (info) => {

        if (mini || mini2) return;

        getEvent(info.event.id).then((res) => {
            const eventData = res.data;
        

        setFormData({
            id: eventData.id,
            title: eventData.title,
            start: dayjs(eventData.start).utc(),
            end: dayjs(eventData.end).utc(),
            allDay: eventData.allDay
        });

        setOpen(true);
    });
            
        /* deleteEvent(info.event.id).then(() => {
        window.location.reload() */
    };


    const [formData, setFormData] = useState({
        id: null,
        title:'',
        start: dayjs(),
        end: dayjs(),
        allDay: false
    })

    const handleChange = (e) => {
        const {name,value} = e.target
        setFormData({
            ...formData, [name] : value
        })
    }
    
    const [selectedDate, setSelectedDate] = useState(null)
    const [open, setOpen] = useState(false);

    const handleOpen = (info) => {
        if (mini || mini2) return;

        const clickedDay = dayjs(info.dateStr)
        setSelectedDate(info.dateStr)
        setOpen(true)
        setFormData({
            title:'',
            start: clickedDay.hour(0).minute(0), 
            end: clickedDay.hour(0).minute(0), 
            allDay: false
        })
    };

    
    const handleClose = (info) => {
        setOpen(false);   
        setFormData({
            id: null,
            title:'',
            start:'',
            end:'',
            allDay: false
        })
    }

    const [events, setEvents] = useState([]);

    const normalizeEvents = (events) => {
    return events.map((e) => {
        if (e.allDay && e.end) {
        const endDate = new Date(e.end);
        endDate.setDate(endDate.getDate() + 1); // sumamos un día solo para que FullCalendar lo pinte bien
        return { ...e, end: endDate.toISOString() };
        }
        return e;
    });
    };

    const GetData = () => {
        getAllEvents().then((res) => {
            const fixedEvents = normalizeEvents(res.data);
            setEvents(fixedEvents)
        })
    }

    useEffect(() => {
        GetData();
    },[])

    return (
       <div>
            <DateModal
                open= {open}
                handleClose={handleClose}
                myDate={selectedDate}
                formData={formData}
                handleChange={handleChange}
            />

            <div className={`my-calendar-container ${mini ? 'mini-mode' : mini2 ? 'mini-mode' : ''}`}>
                

            <MyCalendar1
                myEvents={events}
                dayClick={handleOpen}
                eventClick={handleEventClick}
                mini={mini}
                mini2={mini2}
            />
            {mini && (
                <div>
                    <div
                    onClick={onNavigate} 
                    style={{
                        backgroundColor: 'transparent',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '15px',
                        textAlign: 'right',
                        marginRight: '10px',
                        marginTop: "1px",
                    }}
                    >
                   <i className="bi bi-textarea-resize"></i>
                    </div>
                </div>
                    )}
            {mini2 && (
                <div>
                    <div
                    onClick={onNavigate} 
                    style={{
                        backgroundColor: 'transparent',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '15px',
                        textAlign: 'right',
                        marginRight: '10px',
                        marginTop: "1px",
                    }}
                    >
                   <i className="bi bi-textarea-resize"></i>
                    </div>
                </div>
                    )}

            </div>
        </div>
    )
}

export default Calendar1