import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()


	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="d-flex gap-2 ml-auto">
					<div className="dropdown">
						<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favorites {store.favorites ? store.favorites.length : ""}
						</button>
						<ul className="dropdown-menu p-2">
							{store.favorites == null || store.favorites.length === 0 ?
								<span>empty</span>
								:
								store.favorites.map((fav) => {
									return (
										<li key={fav.name} className="d-flex justify-content-between">
											<Link to={fav.cat + "/" + fav.id} >{fav.name}</Link>
											<button className="btn" onClick={() => { dispatch({ type: 'DELETE_FAV', payload: fav.name }) }}>
												<i className="fa-solid fa-trash-can"></i>
											</button>
										</li>
									)
								})
							}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};