import { Link } from 'react-router-dom'
import { FlashcardWidget } from './flashcard/flashcardWidget'
import {React, useEffect} from 'react'
import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.min.css";

export function MostrarHome(){

    useEffect(() => {
        const grid = GridStack.init({
        cellHeight: 200,
        float: true,
        disableOneColumnMode: true
        });
        return () => grid.destroy(false); 
    }, []);

    return(
        <div className='contenedorGeneral'>
            <div className="grid-stack">
                <div className="grid-stack-item" gs-w="3.7" gs-h="1.59" gs-x="0" gs-y="0">
                    <div className="grid-stack-item-content">
                                <FlashcardWidget />
                    </div>
                </div>
            </div>
        </div>
    )
}