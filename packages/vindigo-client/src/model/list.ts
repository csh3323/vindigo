import { ITask } from "./task";

export interface IList {

	/**
     * 
     */
	id: number;

	/**
     * this displays the name / title of the list
     */
	title: string;

	/**
     * 
     */
	color: string;

	/**
     * this holds specific tasks in a list
     */
	tasks: ITask[];
}