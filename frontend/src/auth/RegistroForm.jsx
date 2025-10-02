import {Link } from "react-router-dom";
export default function RegistroForm(){
    return (
        <div>
            <form action="/login/" method="POST">
                <button>Crear una cuenta</button>
                <label for="id_user">Nombre De Usuario</label>
                <input type="text" name="username" maxLength="150" required id="id_user"/>
                <label for="id_email">Email</label>
                <input type="email" name="email"required id="id_email"/>
                <label for="id_password">Contraseña</label>
                <input type="password" name="password"required id="id_password"/>
                <button>Siguiente</button>
                <p>¿Ya tenes cuenta? <Link to="/login">Inicia Sesion</Link></p>
            </form>
        </div>
    )
}