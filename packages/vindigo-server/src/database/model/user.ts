import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User extends BaseEntity {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column({name: 'created_at'})
	public createdAt: string;

	@Column({name: 'updated_at'})
	public updatedAt: string;

	@Column()
	public username: string;

	@Column()
	public password: string;

	@Column()
	public email: string;

	@Column({name: 'first_name'})
	public firstName: string;

	@Column({name: 'last_name'})
	public lastName: string;

}