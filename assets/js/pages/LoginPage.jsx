import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import AuthContext from '../contexts/AuthContext';
import AuthAPI from '../services/AuthAPI';


const LoginPage = ({ history }) => {

    const { setIsAuthenticated } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");

    // gestion des champs
    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget;

        // [name] il remplacera la valeur du credential
        setCredentials({ ...credentials, [name]: value });
    };

    //gestion du submit
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await AuthAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            toast.success("Vous êtes désormais connecté !")
            history.replace("/customers");
        } catch (error) {
            setError("Aucun compte ou les informations sont erronées");
            toast.error("Une erreur est survenue !")
        }
    };

    return (
        <>
            <h1>Connexion</h1>

            <form onSubmit={handleSubmit} >
                <Field 
                label="Adresse email" 
                name="username" 
                value={credentials.username} 
                onChange={handleChange} 
                placeholder="Adresse email de connexion"
                error={error} />

                <Field 
                label="Mot de passe" 
                name="password" 
                value={credentials.password} 
                onChange={handleChange} 
                type="password"
                error="" />
                
                <div className="form-group">
                    <button
                        type="submit"
                        className="btn btn-success" >
                        Je me connecte
                    </button>
                </div>
            </form>
        </>
    )
}

export default LoginPage;