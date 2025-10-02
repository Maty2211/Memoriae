import {Link } from "react-router-dom";
export default function LoginForm(){
    return <div>
        <form>
            <button>Iniciar Sesion</button>
                <label for="id_email">Email</label>
                <input type="email" name="email"required id="id_email"/>
                <label for="id_password">Contraseña</label>
                <input type="password" name="password"required id="id_password"/>
            <button type="submit">Siguiente</button>
            <p>¿No tenes una cuenta?<Link to="/register">Registrarme</Link></p>
        </form>
    </div>
}