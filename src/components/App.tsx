import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	MenuItem,
	Button,
	Menu,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CustomIcon from "./icons";
import { IUserResponse } from "../types";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";

interface IUserList {
	data: IUserResponse[];
	// paginationInfo: IPaginationInfo;
}

const App = () => {
	const history = useHistory();
	const [data, setData] = React.useState([]);
	const [value, setValue] = React.useState("");
	const [sortValue, setSortValue] = React.useState("");

	const sortOptions = ["username", "name", "email"];
	useEffect(() => {
		loadUserData();
	}, []);

	const loadUserData = async () => {
		return await axios
			.get("https://jsonplaceholder.typicode.com/users")
			.then((response) => setData(response.data))
			.catch((error) => console.log(error));
	};
	console.log("data", data);

	const handleReset = () => {
		loadUserData();
	};
	const handleSearch = async (e) => {
		e.preventDefault();
		return await axios
			.get(`https://jsonplaceholder.typicode.com/users?q=${value}`)
			.then((response) => {
				setData(response.data);
				setValue("");
			})
			.catch((error) => console.log(error));
	};
	const handleSort = async (e) => {
		let value = e.target.value;
		setSortValue(value);
		return await axios
			.get(
				`https://jsonplaceholder.typicode.com/users?_sort=${value}&_order=asc`
			)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => console.log(error));
	};
	const handleFilter = async (value) => {
		return await axios
			.get(`https://jsonplaceholder.typicode.com/users?_status=${value}`)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
			<div className="container">
				<div className="alignment">
					<div>
						<h1>Search</h1>
						<form onSubmit={handleSearch} className="flex">
							<input
								type="text"
								placeholder="search.."
								value={value}
								onChange={(e) => setValue(e.target.value)}
								className="btn-grad-search"
							/>
							<button type="submit" className="btn-grad">
								Search
							</button>
							<button onClick={() => handleReset()} className="btn-grad-reset">
								Reset
							</button>
						</form>
					</div>
					<div>
						<h1>Sort by</h1>
						<select
							onChange={handleSort}
							value={sortValue}
							className="btn-grad-search"
						>
							<option value="">Please Selec value</option>
							{sortOptions.map((item, index) => (
								<option key={index} value={item}>
									{item}
								</option>
							))}
						</select>
					</div>
					<div>
						<h1>Filter by Status</h1>
						<button className="activeButton" onClick={() => handleFilter("")}>
							Active
						</button>
						<button className="inactiveButton" onClick={() => handleFilter("")}>
							Inactive
						</button>
					</div>
				</div>
			</div>
			<div>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className="">
									<span className="table-container-1">User Name</span>
								</TableCell>
								<TableCell>
									<span className="table-container-1">Name</span>
								</TableCell>
								<TableCell>
									<span className="table-container-1">Email</span>
								</TableCell>
								<TableCell>
									<span className="table-container-1">Phone</span>
								</TableCell>
								<TableCell>
									<span className="table-container-1">city</span>
								</TableCell>
								<TableCell>
									<span className="table-container-1">Street</span>
								</TableCell>
								<TableCell>
									<span className="table-container-1">Company Name</span>
								</TableCell>

								{/* <TableCell>
									<span className="table-container-1">Status</span>
								</TableCell> */}

								<TableCell>
									<span className="table-container-1">Action</span>
								</TableCell>
							</TableRow>
						</TableHead>
						{data.length === 0 ? (
							<TableBody>
								<TableRow>
									<TableCell>data not found</TableCell>
								</TableRow>
							</TableBody>
						) : (
							data.map((item, id) => (
								<TableBody key={id}>
									<TableRow>
										<TableCell>
											<span className="table-container">{item.username}</span>
										</TableCell>
										<TableCell>
											<span className="table-container">{item.name}</span>
										</TableCell>
										<TableCell>
											<span className="table-container">{item.email}</span>
										</TableCell>
										<TableCell>
											<span className="table-container">{item.phone}</span>
										</TableCell>
										<TableCell>
											<span className="table-container">
												{item.address.city}
											</span>
										</TableCell>
										<TableCell>
											<span className="table-container">
												{item.address.street}
											</span>
										</TableCell>
										<TableCell>
											<span className="table-container">
												{item.company.name}
											</span>
										</TableCell>
										<TableCell>
											<CustomIcon name="list" className="icon" />
										</TableCell>
									</TableRow>
								</TableBody>
							))
						)}
					</Table>
				</TableContainer>
			</div>
		</div>
	);
};

export default App;
