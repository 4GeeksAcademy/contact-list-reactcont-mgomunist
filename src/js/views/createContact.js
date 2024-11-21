import React, {  useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";

export const CreateContact = () => {
    const {actions, store} = useContext(Context);
    const navigate = useNavigate();
    const emptyContact = {name: "", email: "", phone: "", address: "" };
    const [contact, setContact] = useState(emptyContact);
    const {id} = useParams();
    const isEditing = Boolean(id);

    useEffect(() => {
        if (isEditing) {
            const existingContact = store.contacts.find((contact) => contact.id === parseInt(id));
            if (existingContact) {
                setContact(existingContact);
            }             
        } else {
            setContact(emptyContact);
        }
    }, [id, store.contacts, isEditing]);

    
    const handler = async () => {
        // Validación: Si el nombre está vacío, muestra una alerta y no envía el formulario
        if (!contact.name.trim()) {
            alert("Full name cannot be empty");
            return;
        }

        if (isEditing) {
            await actions.editContact(id, contact);
        } else {
            await actions.createContact(contact);
        }
        navigate("/");
    };

    return(
        <>
        <div className="container">
            <div className="mb-3">
                <label htmlFor="Full Name" className="form-label fw-bold">Full name</label>
                <input onChange={(evento) => setContact({...contact, name:evento.target.value})} value={contact.name || ''} type="text" className="form-control" placeholder="Full name" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">Email</label>
                <input onChange={(evento) => setContact({...contact, email:evento.target.value })} value={contact.email || ''} type="email" className="form-control" placeholder="Email" />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label fw-bold">Enter phone</label>
                <input onChange={(evento) => setContact({...contact, phone:evento.target.value})} value={contact.phone || ''} type="phone" className="form-control" placeholder="Enter phone" />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label fw-bold">Enter address</label>
                <input onChange={(evento) => setContact({...contact, address:evento.target.value})} value={contact.address || ''} type="text" className="form-control" placeholder="Enter address" />
            </div>
            <div className="d-flex justify-content-center gap-5">
                <button onClick={handler} type="submit" className={`btn mr-5 ${isEditing ? "btn-warning" : "btn-primary"}`}>
                    {isEditing ? "Edit" : "Save"}
                </button>

                <Link to="/">
                    <button className="btn btn-primary">Back home</button>
                </Link>
            </div>
        </div>
            </>
    )
}