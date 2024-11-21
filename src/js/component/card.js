import React from "react";
import "../../styles/home.css"
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";


export const ContactCard = (props) =>{
    const {actions} = useContext(Context);
    const navigate = useNavigate();
    return(
    <div className="card mb-12" >
        <div className="row g-0">
            <div className="col-md-3">
                <img src={"https://i.pravatar.cc/300" + "?u="+props.name} className="img-fluid rounded-circle" alt="..." />
            </div>
            <div className="col-md-7">
                <div className="card-body text-start">
                    <h5 className="card-title mb-3">{props.name}</h5>
                    <p className="card-text text-secondary"><i className="fa-solid fa-location-dot"></i> {props.address}</p>
                    <p className="card-text text-secondary"><i className="fa-solid fa-phone"></i> {props.phone}</p>
                    <p className="card-text text-secondary"><i className="fa-solid fa-envelope"></i> {props.email}</p>
                </div>
            </div>
            
            <div className="col-md-2 d-flex justify-content-center align-items-center gap-5" >
            <button className="btn"  onClick={() => navigate(`/edit/${props.id}`)}>
            <i className="fa-solid fa-pencil"></i>
            </button>
            <button className="btn" onClick={ async() => {
                await actions.deleteContact(props.id)
                navigate("/") 
            }}>
                <i className="fa-solid fa-trash"></i>
            </button>
            </div>
        </div>
    </div>
    )
}