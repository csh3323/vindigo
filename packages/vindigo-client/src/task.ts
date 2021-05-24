import { IUser } from "./user";

export interface ITask {

	/**
     * 
     */
	id: number;

	/**
     * displays the title of the task
     */
	title: string;

	/**
     * the assignees of the task
     */
	assignees: IUser[];

	/**
     * 
     */
	categories: [];

	/**
     * a small description of what the task is
     */
	description: string;

	/**
     * what comments the task has.
     */
	comments: Comment[];
}