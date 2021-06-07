import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'created_at'})
    createdAt: string;

    @Column({name: 'updated_at'})
    updatedAt: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    email: string;

    @Column({name: 'first_name'})
    firstName: string;

    @Column({name: 'last_name'})
    lastName: string;

}