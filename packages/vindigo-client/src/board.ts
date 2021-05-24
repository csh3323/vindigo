import { ITask } from "./task";
import { IUser } from "./user";

export interface IBoard {

	/**
     * 
     */
	id: number;

	/**
     * 
     */
	title: string;

	/**
     * 
     */
	location: string;

	/**
     * 
     */
	tasks: ITask[];

	/**
     * 
     */
	visible: boolean;

	/**
     * 
     */
	isPublic: boolean;

	/**
     * 
     */
	users: IUser[]
}