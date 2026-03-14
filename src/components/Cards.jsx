import React from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

const Cards = (props) => {

    const { store, dispatch } = useGlobalReducer()

    
    function addToFavs() {
        dispatch({ type: 'ADD_FAV', payload: {name: props.name, cat: props.category, id: props.id}})
    }

    return (
        <div className="card" style={{ flexShrink: "0", maxWidth: "25%" }}>
            <img src={rigoImageUrl} className="card-img-top w-50" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <div className="d-flex gap-3 justify-content-between">
                    <Link to={props.category + "/" + props.id} className="btn btn-outline-primary">Learn More!</Link>
                    <button className="btn btn-warning w-25" onClick={addToFavs}><i className="fa-regular fa-heart"></i></button>
                </div>
            </div>
        </div>
    )
}

export default Cards;
