import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * Represents a project within vindigo
 */
@Entity('projects')
export class Project extends BaseEntity {

	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public createdAt: Date;

	@Column()
	public lastModifiedAt: Date;

	@Column()
	public name: string;

	@Column()
	public description: string;

	@Column()
	public coverImage: string;

	@Column()
	public backgroundImage: string;

	@Column()
	public creatorId: number;

	@Column()
	public isVisible: boolean;

	@Column()
	public isClosed: boolean;

}