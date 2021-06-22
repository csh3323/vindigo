import { Column, Index, PrimaryColumn } from "typeorm";

import { Entity } from "typeorm";
import { ISession } from "connect-typeorm";

/**
 * Represents the user sessions as they are
 * authenticated to the server.
 */
@Entity('sessions')
export class Session implements ISession {
 
	@PrimaryColumn("varchar", { length: 255 })
	public id = '';

	@Index()
	@Column("bigint")
	public expiredAt = Date.now();
 
	@Column("text")
	public json = '';

}