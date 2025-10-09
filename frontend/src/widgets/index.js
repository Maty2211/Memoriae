// --- REGISTRO CENTRAL DE WIDGETS ---
// Este archivo es el único lugar que necesitas modificar para añadir,
// quitar o reordenar los widgets del dashboard.

// 1. Importa los componentes de cada widget
import PomodoroWidget from './pomodoro/PomodoroWidget.jsx';
import CalendarWidget from './calendar/CalendarWidget.jsx';

// 2. Define la lista de widgets con su configuración para Gridstack
const WIDGET_LIST = [
    { 
        id: 'pomodoro', 
        component: PomodoroWidget, 
        props: {}, // Props específicas para este widget
        x: 0, y: 0, w: 4, h: 6 
    },
    { 
        id: 'calendar', 
        component: CalendarWidget, 
        props: { title: "Calendario" },
        x: 4, y: 0, w: 8, h: 6 
    },
    // Para añadir un nuevo widget (ej. Tareas), solo lo agregarías aquí:
    // {
    //   id: 'todo-list',
    //   component: TodoListWidget,
    //   props: {},
    //   x: 0, y: 6, w: 12, h: 5
    // }
];

export default WIDGET_LIST;