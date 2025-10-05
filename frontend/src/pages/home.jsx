import { Link } from 'react-router-dom'

export function MostrarHome(){
    return(
        <div>
            <div>Memoriae Home</div>
            <Link to="/flashcards">
                Botón de agrandar de widget flashcard
            </Link>
        </div>
    )
}