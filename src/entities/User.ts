import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER",
  }
  
  @Entity({ name: "users" })
  export class User {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ unique: true })
    username!: string;
  
    @Column()
    password!: string;
  
    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role!: UserRole;
  
    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
  }
  