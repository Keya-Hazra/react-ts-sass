import axios from "axios";
// export const config = {
//   cognito: {
//     REGION: 'us-east-1',
//     USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID!,
//     APP_CLIENT_ID: process.env.REACT_APP_APP_CLIENT_ID!,
//     IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID!,
//     IDENTITY_POOL_REGION: 'us-east-1',
//   },
// };

export const API_ENDPOINT_LAMBDA = "https://jsonplaceholder.typicode.com";
export const CustomApi = axios.create({
	baseURL: API_ENDPOINT_LAMBDA,
	headers: {
		"Content-type": "application/json",
	},
});

export const AppTitle = "Assessment";
