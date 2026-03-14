import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useParams } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

const Details = () => {

    const { store, dispatch } = useGlobalReducer()
    const { theId } = useParams()
    const { category } = useParams()
    const [details, setdDetails] = useState("");
    console.log("Esto es details ", details);
    const localObj = getItemFromArray(store.data[category], theId)

    function getItemFromArray(arr, id) {
        for (let i = 0; i < arr.length; i++) {
            if (id === arr[i].uid) {
                return arr[i]
            }
        }
    }

    async function fetchDetails(url) {
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("Request failed with: ", response.status)
            }
            const data = await response.json();
            console.log(data);
            setdDetails(Object.entries(data.result.properties))


        }
        catch (error) {
            console.log("Error on fetch: ", error.message)
        }
    }

    useEffect(() => {
        fetchDetails(localObj.url)
    }, [])


    return (
        <div className="container p-4">
            {details &&
                <div>
                    <div className="d-flex flex-row">
                        <div>
                            <h1>{details.name}</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum aspernatur enim asperiores, voluptatum explicabo sequi odit, sapiente debitis beatae perspiciatis illum perferendis! Natus maiores ea eaque temporibus fugiat! Saepe, ipsam.</p>
                        </div>
                        <img src={rigoImageUrl} alt="" />
                    </div>
                    <hr className="rounded" style={{ color: "red" }}></hr>
                    <div className="gap-5 text-danger d-flex flex-row flex-nowrap overflow-auto"> 
                        {details &&
                            details.map((item) => {
                                return (
                                    <div className="">
                                        <p>{item[0]}</p>
                                        <p>{item[1]}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
            <Link to="/">Back to main page</Link>
        </div>
    )
}


export default Details;