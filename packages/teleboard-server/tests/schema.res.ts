import { Schema } from '../src/schema/Schema';

// Simple person schema
const Person = Schema.of("Person", {
	required: ['firstName', 'lastName'],
	properties: {
		firstName: {
			type: 'string'
		},
		lastName: {
			type: 'string'
		},
		age: {
			type: 'integer'
		}
	}
});

// Residence schema which references Person
const Residence = Schema.of("Residence", bp => ({
	required: ['address', 'name', 'rating'],
	properties: {
		address: {
			type: 'string'
		},
		name: {
			type: 'string'
		},
		rating: {
			type: 'number',
			minimum: 0,
			maximum: 5
		},
		resident: bp.reference(Person)
	}
}));

// Test structures to validate

const observatory = {
	address: '322  Scheuvront Drive, Somewhere',
	name: 'The Observatory',
	rating: 4.3
}

const hotel = {
	address: '305  Plainfield Avenue, Somewhere',
	name: 'The Perfect Hotel',
	rating: 5
}

const lighthouse = {
	address: '2941  Hewes Pier, Somewhere',
	name: 'Jacks Lighthouse',
	rating: 1.2,
	resident: {
		firstName: 'Jack',
		lastName: 'Willow',
		age: 62
	}
}

export {
	Person,
	Residence,
	observatory,
	hotel,
	lighthouse
}