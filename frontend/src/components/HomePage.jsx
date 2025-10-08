import {React, useEffect} from 'react'
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import Calendar1 from "./calendar/Calendar1";


const HomePage = () => {

  
  useEffect(() => {
    const grid = GridStack.init({
      cellHeight: 200,
      float: true,
    });
  }, []);


    return (
        <div className="grid-stack">
        <div className="grid-stack-item" gs-w="3.7" gs-h="1.59">
            <div className="grid-stack-item-content">
            <Calendar1 mini/>
         </div>
        </div>
        </div>
      );
    };
 

export default HomePage