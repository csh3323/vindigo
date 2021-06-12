import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * Represents a single registered Vindigo user
 */
@Entity('users')
export class User extends BaseEntity {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public createdAt: Date;

	@Column()
	public lastSeenAt: Date;

	@Column()
	public username: string;

	@Column()
	public password: string;

	@Column()
	public email: string;

	@Column()
	public firstName: string;

	@Column()
	public lastName: string;

	@Column()
	public isEnabled: boolean;

	@Column()
	public role: string;

	@Column()
	public language: string;

}