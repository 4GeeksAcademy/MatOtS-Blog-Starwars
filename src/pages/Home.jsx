import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Cards from "../components/Cards.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [data, setData] = useState([])

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
		getData().then(setData)
	}, [])


	return (
		<div className="p-3">
			{data &&
				data?.map((category,index) => {
					return (
						<div className="my-4" key={index}>
							<h3>{capitalize(category[0])}</h3>
							<div className="d-flex flex-row flex-nowrap overflow-auto gap-4 p-3" style={{ scrollBehavior: "smooth" }}>
								{category &&
									category[1]?.map((item, index) => {
										return (
											<Cards key={index} name={item.name} id={item.uid} url={item.url} category={category[0]}/>
										)
									})}
							</div>
						</div>
					)
				})}
		</div>
	);
}; 