import { useAuth } from './AuthContext'; 

// ...
const { login } = useAuth();
// ...
const handleSubmit = async (e) => {
    // ...
    const result = await login(username, password);
    if (result.success) {
        // Redirigir al dashboard (App.jsx se recargará automáticamente)
    }
}