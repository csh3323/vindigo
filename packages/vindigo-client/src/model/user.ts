import { IActivity } from "./actvivity";

export interface IUser {

	/**
     * 
     */
	email: string;

	/**
      * represent the username of the user
      */
	username: string;

	/**
     * firstname of the user
     */
	firstname: string;

	/**
     * lastname of the user
     */
	lastname: string;

	/**
     * small description of the bio
     */
	bio: string;

	/**
     * prefered language setting
     */
	language: string;
    

	/**
     * holds the activities of the user
     */
	activities: IActivity[];

}