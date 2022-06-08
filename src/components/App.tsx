import React, { useCallback, useState } from "react";
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
import { CustomApi } from "../config";
import { CustomModal } from "./shared/Modal";

interface IUserList {
	data: IUserResponse[];
	// paginationInfo: IPaginationInfo;
}

const App = () => {
	const history = useHistory();
	const [data, setData] = React.useState([]);
	const [value, setValue] = React.useState("");
	const [sortValue, setSortValue] = React.useState("");
	const [removeUser, setRemoveUser] = useState<IUserResponse>();
	const [showRemoveModal, setShowRemoveModal] = useState(false);

	const handleRemoveModalOnClose = useCallback(() => {
		setRemoveUser(undefined);
		setShowRemoveModal(false);
	}, []);
	const sortOptions = ["username", "name", "email"];

	useEffect(() => {
		loadUserData();
	}, []);

	const loadUserData = async () => {
		return await axios
			.get("https://jsonplaceholder.typicode.com/posts")
			.then((response) => setData(response.data))
			.catch((error) => console.log(error));
	};

	const handleReset = () => {
		loadUserData();
	};
	const handleSearch = async (e: any) => {
		e.preventDefault();
		return await axios
			.get(`https://jsonplaceholder.typicode.com/posts?q=${value}`)
			.then((response) => {
				setData(response.data);
				setValue("");
			})
			.catch((error) => console.log(error));
	};
	const handleSort = async (e: any) => {
		let value = e.target.value;
		setSortValue(value);
		return await axios
			.get(
				`https://jsonplaceholder.typicode.com/posts?_sort=${value}&_order=asc`
			)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => console.log(error));
	};
	const handleFilter = async (value: any) => {
		return await axios
			.get(`https://jsonplaceholder.typicode.com/posts?_status=${value}`)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => console.log(error));
	};
	// delete user
	const handleRemoveUser = async (id: number) => {
		try {
			console.log("id", id);
			await CustomApi.delete(`/posts/${removeUser.id}`);
		} catch (error) {}
	};

	return (
		<div>
			<div className="gap-top">
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
			<div className="gap-top">
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className="">
									<span className="table-container-1">Id</span>
								</TableCell>
								<TableCell>
									<span className="table-container-1">User Id</span>
								</TableCell>
								<TableCell>
									<span className="table-container-1">Title</span>
								</TableCell>
								<TableCell>
									<span className="table-container-1">Body</span>
								</TableCell>

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
											<span className="table-container">{item.id}</span>
										</TableCell>
										<TableCell>
											<span className="table-container">{item.userId}</span>
										</TableCell>
										<TableCell>
											<span className="table-container">{item.title}</span>
										</TableCell>
										<TableCell>
											<span className="table-container">{item.body}</span>
										</TableCell>

										<TableCell>
											<PopupState variant="popover" popupId={"popup-menu"}>
												{(popupState) => (
													<React.Fragment>
														<Button {...bindTrigger(popupState)}>
															<CustomIcon name="list" className="icon" />
														</Button>
														<Menu {...bindMenu(popupState)}>
															<MenuItem>Edit user</MenuItem>

															<MenuItem
																onClick={async () => {
																	setRemoveUser(item);
																	setShowRemoveModal(true);
																	popupState.close();
																}}
															>
																Remove user
															</MenuItem>
														</Menu>
													</React.Fragment>
												)}
											</PopupState>
										</TableCell>
									</TableRow>
								</TableBody>
							))
						)}
					</Table>
				</TableContainer>
			</div>
			{removeUser && (
				<CustomModal
					open={showRemoveModal}
					onClose={handleRemoveModalOnClose}
					title="Remove User"
				>
					<div className="w-96">
						<h1>
							Are you sure you want to remove{" "}
							<span className="text-primary font-semibold">
								{removeUser.id}
							</span>{" "}
						</h1>
						<div className="flex justify-end pt-8">
							<button
								onClick={handleRemoveModalOnClose}
								className="border px-10 py-2 text-black  mr-4 rounded-md"
							>
								No
							</button>
							<button
								onClick={async () => {
									handleRemoveUser(removeUser.id);
									handleRemoveModalOnClose();
								}}
								className="border px-10 py-2 text-white bg-janttBlue rounded-md"
							>
								Yes
							</button>
						</div>
					</div>
				</CustomModal>
			)}
		</div>
	);
};

export default App;
