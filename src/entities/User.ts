import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number = 0;
    
    @Column()
    name: string = '';

    @Column()
    email: string = '';
}