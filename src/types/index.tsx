export interface IPaginationInfo {
	pageSize: number;
	pageNumber: number;
	numberOfElements: number;
	totalPage: number;
	totalElements: number;
	previous: boolean;
	next: boolean;
}
export interface IUserResponse {
	id: number;
	userId: number;
	title: string;
	body: string;
}

export interface ISearchData {
	name: string;
	username: string;
	email: string;
}
// export interface IAdminResponse {
//     adminId: IAdmin['adminId'];
//     firstName: IAdmin['firstName'];
//     lastName: IAdmin['lastName'];
//     contact: IAdmin['contact'];
//     email: IAdmin['email'];
//     avatar: IAdmin['avatar'];
//     isSuperAdmin: IAdmin['isSuperAdmin'];
//     isArchived: IAdmin['isArchived'];
//     archivedAt: IAdmin['archivedAt'];
//     archivedBy: IAdmin['archivedBy'];
//     createdAt: IAdmin['createdAt'];
//     updatedAt: IAdmin['updatedAt'];
//     createdBy: IAdmin['createdBy'];
//     updatedBy: IAdmin['updatedBy'];
//     officeContact: IAdmin['officeContact'];
//     speciality: IAdmin['speciality'];
//     location: IAdmin['location'];
//   }
