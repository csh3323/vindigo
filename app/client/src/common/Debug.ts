import { IBoard, IBoardList, IBoardTask } from "./Board";
import { name, random } from 'faker';
import _ from "lodash";

// Random compositing functions

function randomId() : string {
	return ''+Math.random();
}

function randomBackground() : string {
	let values = [];

	if(Math.random() > 0.5) {
		values = [
			'https://images.unsplash.com/photo-1585357214259-f977cc7d73a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
			'https://images.unsplash.com/photo-1502318217862-aa4e294ba657?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80',
			'https://images.unsplash.com/photo-1584551882802-ca081b505b49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1925&q=80',
			'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
			'https://images.unsplash.com/photo-1577701122197-c9607038bd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
			'https://images.unsplash.com/photo-1489573280374-2e193c63726c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
			'https://images.unsplash.com/photo-1515445702422-3a80ccfdb236?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1868&q=80',
			'https://images.unsplash.com/photo-1498889444388-e67ea62c464b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1901&q=80',
			'https://images.unsplash.com/photo-1455816293708-e4223079f940?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
		];
	} else {
		values = [
			'#1289A7',
			'#eb4d4b',
			'#6ab04c',
			'#4834d4',
			'#ff9f43',
			'#2e86de',
			'#10ac84',
			'#222f3e'
		]
	}

	return _.sample(values)!
}

// Board creation functions

export function newBoard() : IBoard {
	return {
		id: randomId(),
		author: randomId(),
		background: randomBackground(),
		creationTime: _.now(),
		updateTime: _.now(),
		isClosed: false,
		isPublic: false,
		lists: [],
		members: {},
		title: name.jobTitle()
	}
}

export function newBoardWithLists() : IBoard {
	const board = newBoard();
	const count = _.random(1, 5);

	for(let i = 0; i < count; i++) {
		board.lists.push({
			id: randomId(),
			author: randomId(),
			creationTime: _.now(),
			updateTime: _.now(),
			title: random.word(),
			tasks: []
		});
	}

	return board;
}

export function newBoardWithTasks() : IBoard {
	const board = newBoardWithLists();
	
	_.forEach(board.lists, (list) => {
		const count = _.random(1, 5);

		for(let i = 0; i < count; i++) {
			list.tasks.push({
				id: randomId(),
				author: randomId(),
				creationTime: _.now(),
				updateTime: _.now(),
				title: random.word(),
				tags: [],
				description: random.alphaNumeric()
			});
		}
	});

	return board;
}

export function newList() : IBoardList {
	return {
		id: randomId(),
		author: randomId(),
		creationTime: _.now(),
		updateTime: _.now(),
		title: random.word(),
		tasks: []
	}
}

export function newListWithTasks() : IBoardList {
	const list = newList();
	const count = _.random(1, 5);

	for(let i = 0; i < count; i++) {
		list.tasks.push({
			id: randomId(),
			author: randomId(),
			creationTime: _.now(),
			updateTime: _.now(),
			title: random.word(),
			tags: [],
			description: random.alphaNumeric()
		});
	}

	return list;
}

export function newTask() : IBoardTask {
	return {
		id: randomId(),
		author: randomId(),
		creationTime: _.now(),
		updateTime: _.now(),
		title: random.word(),
		tags: [],
		description: random.alphaNumeric()
	}
}