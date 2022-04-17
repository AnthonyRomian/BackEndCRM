import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import { Link } from "react-router-dom";
import customersAPI from "../services/customersAPI";
import invoicesAPI from "../services/invoicesAPI";
import { toast } from "react-toastify";
import FormContentLoader from "../components/loaders/FormContentLoader";

const InvoicePage = ({ history, match }) => {

    const { id = "new"} = match.params;

    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT"
    });

    const [customers, setCustomers] = useState([]);
    const [editing, setEditing] = useState(false);
    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    });
    const [loading, setLoading] = useState(true);

    // recup clients
    const fetchCustomers = async () => {
        try {
            const data = await customersAPI.findAll();
            setCustomers(data);
            setLoading(false);
            if (!invoice.customer) setInvoice({...invoice, customer: data[0].id });
        } catch (error) {
            console.log(error.response);
            history.replace("/invoices");
            toast.error("Impossible de charger les clients");
        }
    }; 

    // recup factures
    const fetchInvoice = async id => {
        try {
            const { amount, status, customer } = await invoicesAPI.find(id);
            setInvoice({ amount, status, customer: customer.id });
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger la facture demandée");
            history.replace("/invoices");
        }
    };

    // rcup de la liste des clients a chaque chargement
    useEffect(() => {
        fetchCustomers();
    }, []);

    // get la bonne facture quand modif de l url
    useEffect(() => {
        if (id !== "new") {
            fetchInvoice(id);
            setEditing(true);
        }
    }, [id]);


    // gestion des changemrnts du form input
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setInvoice({ ...invoice, [name]: value });
    };

    // gestion soumission form invoice
    const handleSubmit = async event => {
        event.preventDefault();

        try {

            if (editing) {
                await invoicesAPI.update(id, invoice);
                toast.success("La facture à bien été modifiée");
            } else {
                await invoicesAPI.create(invoice);
                toast.succes("La facture à bien été crée");
                history.replace("/invoices");
            }      
        } catch ({response}) {
            const {violations} = response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);

                toast.error("Des erreurs dans votre formulaire");
            };
        }
    }

    return (
        <>
        
            { (editing && <h1>Modification d'une facture</h1>) || (<h1>Création de facture</h1>)}
            {loading && <FormContentLoader/>}
            {!loading && <form onSubmit={handleSubmit}>
                <Field
                    name="amount"
                    type="number"
                    label="Montant"
                    placeholder="Montant de la facture"
                    value={invoice.amount}
                    error={errors.amount}
                    onChange={handleChange}
                />
                <Select
                    name="customer"
                    label="Client"
                    value={invoice.customer}
                    error={errors.customer}
                    onChange={handleChange} >
                    {customers.map(customer =>
                        <option key={customer.id} value={customer.id} >
                            {customer.firstName} {customer.lastName}
                        </option>)}
                </Select>
                <Select
                    name="status"
                    label="Statut"
                    value={invoice.status}
                    error={errors.status}
                    onChange={handleChange} >
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>
                <div className="form-group">
                    <button type="submit" className="btn btn-success"  >Enregistrer</button>
                    <Link to="/invoices" className="btn btn-link">Retour à la liste des factures</Link>
                </div>
            </form> }
        </>
    );
}

export default InvoicePage;