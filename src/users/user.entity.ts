/* eslint-disable prettier/prettier */
//This is user entity that stands as users table not what is in this user entity must tally with whats in user dto
import { Post } from "src/post/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        type: 'varchar',
        length: 98,
        nullable: false
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 98,
        nullable: false
    })
    lastName: string

    @Column({
        type: 'varchar',
        length: 98,
        nullable: false,
        unique: true
    })
    email: string

    @Column({
        type: 'varchar',
        length: 98,
        nullable: false
    })
    password: string

    @OneToMany(()=>Post, (post)=>post.author)
   posts:Post[] 
}