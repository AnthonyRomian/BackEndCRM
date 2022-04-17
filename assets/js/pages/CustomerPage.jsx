import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { async } from 'regenerator-runtime';
import Field from '../components/forms/Field';
import customersAPI from '../services/customersAPI';

const CustomerPage = ({ match, history }) => {

    const { id = "new" } = match.params;

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const [editing, setEditing] = useState(false);

    // get customer selon id
    const fetchCustomer = async id => {
        try {
            const { firstName, lastName, email, company } = await customersAPI.find(id);
            setCustomer({ firstName, lastName, email, company });
        } catch (error) {
            // TODO : notification flash error
            history.replace("/customers");
        }
    };

    // load du customer ou changement de l id
    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchCustomer(id);
        }

    }, [id]);

    // gstion des changemrnts du form input
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setCustomer({ ...customer, [name]: value });
    };

    // gestion soumission form
    const handleSubmit = async event => {
        event.preventDefault();
        try {

            if (editing) {
                await customersAPI.update(id, customer);
                // TODO : NOTIF FLASH DE SUCCES
            } else {
                await customersAPI.create(customer);
                // TODO : NOTIF FLASH DE SUCCES
                history.replace("/customers");
            }

            setErrors({});
        } catch ({ response }) {
            const { violations } = response.data;

            if (response.data.violations) {
                const apiErrors = {};
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });

                setErrors(apiErrors);
                // TODO : NOTIF FLASH DE SUCCES

            };
        }

        console.log(customer);
    }

    return (
        <>
            {!editing && <h1>Creation d'un client</h1> || <h1>Modification d'un client</h1>}

            <form onSubmit={handleSubmit} >
                <Field
                    name="lastName"
                    label="Nom de famille"
                    placeholder="Nom de famille du client"
                    value={customer.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Field
                    name="firstName"
                    label="Prénom"
                    placeholder="Prénom du client"
                    value={customer.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />
                <Field
                    name="email"
                    label="Email"
                    placeholder="Adresse email du client"
                    type="email"
                    value={customer.email}
                    onChange={handleChange}
                    error={errors.email}

                />
                <Field
                    name="company"
                    label="Entreprise"
                    placeholder="Entreprise du client"
                    value={customer.company}
                    onChange={handleChange}
                    error={errors.company}

                />
                <div className="form-group">
                    <button type="submit" className="btn btn-success"  >Enregistrer</button>
                    <Link to="/customers" className="btn btn-link">Retour à la liste</Link>
                </div>

            </form>
        </>
    );
}

export default CustomerPage;