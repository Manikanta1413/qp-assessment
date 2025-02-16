import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity({ name: "groceries" })
  export class Grocery {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    name!: string;
  
    @Column({ type: "decimal", precision: 10, scale: 2 })
    price!: number;
  
    @Column({ type: "int" })
    stock!: number;
  
    @CreateDateColumn()
    createdAt1!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  }
  