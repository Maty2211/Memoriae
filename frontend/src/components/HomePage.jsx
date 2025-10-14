import React, { useState, useEffect } from "react"
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";
import Calendar1 from "./calendar/Calendar1";
import PomodoroWidget from "./pomodoro/PomodoroWidget";
import BackgroundCarousel from "./background/BackgroundCarousel";
import Navbar from './Navbar';

import bg1 from './img/background1.jpeg';
import bg2 from './img/background2.jpg';
import bg3 from './img/background3.jpg';
import bg4 from './img/background4.jpg';
import bg5 from './img/background5.jpg';

const images = [bg1, bg2, bg3, bg4, bg5];


const HomePage = () => {
  
  const [currentImage, setCurrentImage] = useState(
    images[Math.floor(Math.random() * images.length)]
  );

  useEffect(() => {
    const grid = GridStack.init({
      cellHeight: 200,
      float: true,
    });
  }, []);

  const changeBackground = () => {
    const currentIndex = images.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentImage(images[nextIndex]);
  };

  return (
    <>
      <Navbar onChangeBackground={changeBackground} />

      <BackgroundCarousel imageUrl={currentImage} />

      <main className="main-content">
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
      </main>
    </>
  );
};
 

export default HomePage