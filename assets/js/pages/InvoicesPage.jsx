import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import invoicesAPI from '../services/invoicesAPI';


const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger"
}

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"
}

const InvoicesPage = props => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 8;

    // recuperation des invoices
    const fetchInvoices = async () => {
            
    try {
        const data = await invoicesAPI.findAll();
        setInvoices(data);
    } catch {
        console.log(error.response);
    }
};


useEffect(()=> {
    fetchInvoices();
    }, []);

    // gestion de la pagination / switch page
    const handlePageChange = page => setCurrentPage(page);

    // gestion de la recherche
    const handleSearch = ({ currentTarget }) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const handleDelete = async id => {

        const originalInvoices = [...invoices];

        // 1 approche optimiste ( probleme si serveur down )
        setInvoices(invoices.filter(invoice => invoice.id !== id));

        // 1 approche pessimiste ( alors solution avec copie de tableau )
        try {
            await invoicesAPI.delete(id)
        } catch (error) {
            setInvoices(originalInvoices);
        }

        // meme chose qu au dessus
        /* customersAPI.delete(id)
            .then(response => console.log("ok"))
            .catch(error => {
                setCustomers(originalCustomers);
                console.log(error.response);
            }); */
    };


    // Gestion de la recherche :
  const filteredInvoices = invoices.filter(
    i =>
      i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
      i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
      i.amount.toString().startsWith(search.toLowerCase()) ||
      STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
  );

  // Pagination des données
  const paginatedInvoices = Pagination.getData(
    filteredInvoices,
    currentPage,
    itemsPerPage
  );

    

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    return (
        <>
            <h1>Liste des Factures</h1>
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..." />
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Client</th>
                        <th className='text-center'>Date d'envoi</th>
                        <th className='text-center'>Statut</th>
                        <th className='text-center'>Montant</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedInvoices.map(invoice => <tr key={invoice.id}> 
                        <td>{invoice.chrono}</td>
                        <td><a href="#">{invoice.customer.firstName} {invoice.customer.lastName}</a></td>
                        <td className='text-center'>{formatDate(invoice.sentAt)}</td>
                        <td className='text-center'>
                            <span className={"badge badge-success bg-" + STATUS_CLASSES[invoice.status]}>{STATUS_LABELS[invoice.status]}</span>
                        </td>
                        <td className='text-center'>{invoice.amount.toLocaleString()} €</td>
                        <td>
                            <button className="btn btn-sm btn-primary mr-2">Editer</button>
                            <button onClick={() => handleDelete(invoice.id)} className="btn btn-sm btn-danger" >Supprimer</button>
                        </td>
                    </tr> )}
                    
                </tbody>
            </table>
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage}
            onPageChanged={handlePageChange} length={filteredInvoices.length} />
        </>
    );
};

export default InvoicesPage;