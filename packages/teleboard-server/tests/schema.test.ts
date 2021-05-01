import { Person, Residence, observatory, hotel, lighthouse } from './schema.res';

test('schema identifier has slash', () => {
	expect(Person.schema['id']).toBe('/Person');
});

test('schema keeps dependencies', () => {
	expect(Residence.getDependencies()).toContain(Person);
});

test('schema valides correctly', () => {
	expect(Residence.validate(observatory).isValid).toBeTruthy();
	expect(Residence.validate(lighthouse).isValid).toBeTruthy();
	expect(Residence.validate(hotel).isValid).toBeTruthy();
});