import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import Calendar1 from "./calendar/Calendar1";
import { useNavigate } from "react-router-dom"; 

const HomePage = () => {

  const gridRef = useRef(null);
  const navigate = useNavigate();
  const [visibleWidgets, setVisibleWidgets] = useState({});

  useEffect(() => {
    gridRef.current = GridStack.init({
      float: true,
      disableResize: true,
      cellHeight: 10, // pasos pequeños → movimiento más suave
      margin: 0, 
      margin: 0,
      maxRow: 60,
    
    });
  }, []);

  const widgetConfig = {
    calendar: { w: 3.2, h: 32.7, x: 12, y: 15 },
    pomodoro: { w: 1, h: 1, x: 12, y: 0 },
    evento: { w: 2.6, h: 20.1, x: 1, y: 28 },
    todolist: { w: 2.6, h: 1.1, x: 0, y: 0 },
    flashcard: { w: 2.6, h: 1.1, x: 5, y: 0 },
  };

  const addWidget = (type) => {
    const grid = gridRef.current;

    if (visibleWidgets[type]) {
      grid.removeWidget(visibleWidgets[type]);
      setVisibleWidgets((prev) => {
        const copy = { ...prev };
        delete copy[type];
        return copy;
      });
      return;
    }

     // Si no existe, lo creamos
    const config = widgetConfig[type] || { w: 3, h: 2, x: 0, y: 0 };

    const item = document.createElement("div");
    item.classList.add("grid-stack-item");

    item.setAttribute("gs-w", config.w);
    item.setAttribute("gs-h", config.h);
    item.setAttribute("gs-x", config.x);
    item.setAttribute("gs-y", config.y);


    const content = document.createElement("div");
    content.classList.add("grid-stack-item-content");
    item.appendChild(content);

    grid.makeWidget(item);

    const root = ReactDOM.createRoot(content);

    if (type === "calendar") {

      root.render(<Calendar1 mini onNavigate={() => navigate("/calendar1")} />);

    } else if (type === "pomodoro") {

      root.render(<div>Widget genérico</div>);

    }else if (type === "evento") {

      root.render(<Calendar1 mini2 onNavigate={() => navigate("/calendar1")} />);

    }

    setVisibleWidgets((prev) => ({ ...prev, [type]: item }));

  };

  return (
    

    <div >
      {/* Sidebar fijo */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          width: "95px",
          backgroundColor: "transparent",
          backdropFilter: "blur(3px)",
          display: "flex",
          flexDirection: "column",
          gap: "45px",
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.23)",
          fontSize: "13px",
          fontFamily: "Pixelify Sans, sans-serif",
          color: "white",
        }}
      >

        <div 
        style={{
          marginTop: "140px",
          cursor: "pointer"
        }}
        onClick={() => addWidget("pomodoro")}>
          <i class="bi bi-clock"></i> <br />
          Pomodoro
        </div>

        <div 
        style={{
          cursor: "pointer"
        }}
        onClick={() => addWidget("pomodoro")}>
          <i class="bi bi-wallet2"></i> <br />
          Flashcards
        </div>

        <div 
        style={{
          cursor: "pointer"
        }}
        onClick={() => addWidget("pomodoro")}>
          <i class="bi bi-check2-all"></i> <br />
          To do list
        </div>

        <div
        style={{
          cursor: "pointer"
        }}
        onClick={() => addWidget("calendar")}>
            <i className="bi bi-calendar-date" ></i>
          <br/> <span>Calendario</span>
        </div>

        <div 
        style={{
          cursor: "pointer"
        }}
        onClick={() => addWidget("evento")}>
          <i class="bi bi-bell"></i> <br />
          Eventos
        </div>

      </div>
      <div>


        <div className="grid-stack"
        style={{
        overflow: "hidden",
        
      }}
        ></div>
      </div>
    </div>
  );
};

export default HomePage;
