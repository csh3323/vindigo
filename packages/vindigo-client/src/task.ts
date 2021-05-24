import { IComment } from "./comment";
import { IUser } from "./user";

export interface ITask {

	/**
     * 
     */
	id: number;

	/**
     * respresent what type of task it is. 
     */
	type: string;

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
	icon: string;

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
	comments: IComment[];

	/**
     * 
     */
	progress: number;
}