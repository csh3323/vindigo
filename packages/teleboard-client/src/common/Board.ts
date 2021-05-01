type IBoardAccess = {[key: string]:string};

/**
 * The top level container of all tasks and lists
 * grouped into a logical collection. Boards contain
 * an ordered list of task lists.
 */
export interface IBoard {

	/** The unique id of this board */
	id: string;

	/** The time at which this board was created */
	creationTime: number;

	/** The time at which this board was last updated */
	updateTime: number;

	/** Whether the board is closed */
	isClosed: boolean;

	/** Whether the board is accessible by all users */
	isPublic: boolean;

	/** The creator of this board */
	author: string;

	/** The title of this board */
	title: string;

	/** The background of the board, either a hex code or a URL */
	background: string;

	/** Access rules for this board */
	members: IBoardAccess;

	/** The lists contained within this board */
	lists: IBoardList[];

}

/**
 * A list contains an orderes list of individual tasks
 */
export interface IBoardList {

	/** The unique id of this list */
	id: string;

	/** The time at which this list was created */
	creationTime: number;

	/** The time at which this list was last updated */
	updateTime: number;

	/** The creator of this list */
	author: string;

	/** The title of this list */
	title: string;

	/** The tasks contained within this list */
	tasks: IBoardTask[];

}

/**
 * A single task containining information such as its title,
 * content, creation time, etc.
 */
export interface IBoardTask {

	/** The unique id of this task */
	id: string;
	
	/** The time at which this task was created */
	creationTime: number;

	/** The time at which this task was last updated */
	updateTime: number;

	/** The creator of this task */
	author: string;

	/** The title of this task */
	title: string;

	/** List of assigned tags (Currently colors) */
	tags: string[];

	/** The list description */
	description: string;

}