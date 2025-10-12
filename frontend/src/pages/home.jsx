import { Link } from 'react-router-dom'
import { FlashcardWidget } from './flashcardWidget'
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
            Menú de flashcards
            <div className="grid-stack">
                <div className="grid-stack-item" gs-w="100" gs-h="2" gs-x="0" gs-y="0">
                    <div className="grid-stack-item-content">
                                <FlashcardWidget />
                    </div>
                </div>
            </div>
        </div>
    )
}