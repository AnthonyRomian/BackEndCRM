import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
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
            history.replace("/customers");
        } catch (error) {
            setError("Aucun compte ou les informations sont erronées");
        }
    };

    return (
        <>
            <h1>Connexion</h1>

            <form onSubmit={handleSubmit} >

                <div className="form-group">
                    <label htmlFor="username">Adresse Email</label>
                    <input
                        value={credentials.username}
                        onChange={handleChange}
                        className={"form-control" + (error && " is-invalid")}
                        type="email"
                        placeholder="Adresse email de connexion"
                        name="username"
                        id="username" />
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Adresse Email</label>
                    <input
                        value={credentials.password}
                        onChange={handleChange}
                        className="form-control"
                        type="password"
                        placeholder="Mot de passe"
                        name="password"
                        id="password" />
                </div>
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