import { IUser } from "./user";

export interface IComment {

	/**
     * 
     */
	id: number;

	/**
     * 
     */
	user: IUser;

	/**
     * 
     */
	comment: string;

	/**
     * date
     */
	date: string;

}