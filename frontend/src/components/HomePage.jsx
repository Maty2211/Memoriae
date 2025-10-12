import {React, useEffect} from 'react'
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import Calendar1 from "./calendar/Calendar1";
import PomodoroWidget from "./pomodoro/PomodoroWidget";


const HomePage = () => {

  
  useEffect(() => {
    const grid = GridStack.init({
      cellHeight: 200,
      float: true,
    });
  }, []);


    return (
        <div className="grid-stack">
        <div className="grid-stack-item" gs-x="0.5" gs-y="0.5" gs-w="3.7" gs-h="1.65">
            <div className="grid-stack-item-content">
            <Calendar1 mini/>
         </div>
        </div>

        <div className="grid-stack-item" gs-x="5" gs-y="0.5" gs-w="3.5" gs-h="1.9">
            <div className="grid-stack-item-content">
            <PomodoroWidget />
         </div>
        </div>

        </div>
      );
    };
 

export default HomePage