import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Cards from "../components/Cards.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) ? Object.entries(JSON.parse(localStorage.getItem('data'))) : [])
	console.log("esto es data ",data);
	


	const urls = {
		people: "https://www.swapi.tech/api/people/",
		planets: "https://www.swapi.tech/api/planets/",
		starships: "https://www.swapi.tech/api/starships/",
		vehicles: "https://www.swapi.tech/api/vehicles/",
		species: "https://www.swapi.tech/api/species/"
	}

	console.log(store);


	async function getData() {
		try {
			const responses = await Promise.all(Object.entries(urls).map(async ([key, url]) => {    ///SI, lo saque de internet https://stackoverflow.com/questions/70431368/react-js-fetch-multiple-endpoints-of-api
				const resp = await fetch(url)														/// Te dejo la url para que veas que no lo copie de la ia jajaja pero esto no se me hubiera ocurrido jamás
				return [key, (await resp.json()).results]
			}))
			dispatch({ type: "ADD_INFO", payload: Object.fromEntries(responses) })

			return responses
		}
		catch (error) {
			console.log("Error on fetch: ", error.message)
		}
	}

	function capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	useEffect(() => {
		if (data == null || data.length === 0 || Object.keys(data).length === 0) {
			console.log("esto es el fetch");
			getData().then(setData)
		}
		else {
			setData(Object.entries(JSON.parse(localStorage.getItem('data'))))
			dispatch({ type: "ADD_DATA_FROM_LS", payload: JSON.parse(localStorage.getItem('data')) })
			dispatch({ type: "ADD_FAVS_FROM_LS", payload: JSON.parse(localStorage.getItem('favorites')) })
			console.log("Carga la data del LS");
			console.log("se ejecuta, esto store ", store, " esto es data ", data);
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('data', JSON.stringify(data))
	}, [data])

	useEffect(() => {
		if (store.favorites || store.data.length != 0) {
			localStorage.setItem('favorites', JSON.stringify(store.favorites))
			localStorage.setItem('data', JSON.stringify(store.data))
		}
	}, [store])


	return (
		<div className="p-3">
			{data &&
				data?.map((category, index) => {
					return (
						<div className="my-4" key={index}>
							<h3>{capitalize(category[0])}</h3>
							<div className="d-flex flex-row flex-nowrap overflow-auto gap-4 p-3" style={{ scrollBehavior: "smooth" }}>
								{category &&
									category[1]?.map((item, index) => {
										return (
											<Cards key={index} name={item.name} id={item.uid} url={item.url} category={category[0]} />
										)
									})}
							</div>
						</div>
					)
				})}
		</div>
	);
}; 